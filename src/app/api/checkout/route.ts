import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders, buildOrderFromInput } from "@/lib/orders";
import { stripe, hasStripe } from "@/lib/stripe";

// POST /api/checkout — create an order + a Stripe Checkout Session, return the session URL (public)
export async function POST(req: NextRequest) {
  if (!hasStripe()) {
    return NextResponse.json({ error: "payments not configured" }, { status: 503 });
  }

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const order = buildOrderFromInput(b);
  if ("error" in order) return NextResponse.json(order, { status: 400 });

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  const line_items = order.items.map((i) => ({
    quantity: i.qty,
    price_data: {
      currency: "usd",
      unit_amount: i.price * 100,
      product_data: { name: i.name },
    },
  }));
  if (order.shipping.cost > 0) {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: order.shipping.cost * 100,
        product_data: { name: `Shipping — ${order.shipping.method}` },
      },
    });
  }

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items,
    customer_email: order.contact.email,
    success_url: `${origin}/checkout?order=${order.id}`,
    cancel_url: `${origin}/checkout`,
    metadata: { orderId: order.id },
  });

  order.stripeSessionId = session.id;
  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);

  return NextResponse.json({ url: session.url });
}
