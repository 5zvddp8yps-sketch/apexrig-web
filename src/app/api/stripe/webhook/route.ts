import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { readOrders, writeOrders, notifySupplier } from "@/lib/orders";
import { stripe } from "@/lib/stripe";

// POST /api/stripe/webhook — Stripe calls this when a checkout session completes
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      const orders = await readOrders();
      const order = orders.find((o) => o.id === orderId);
      if (order && order.status === "new") {
        order.status = "paid";
        await writeOrders(orders);
        notifySupplier(order).catch(() => {});
      }
    }
  }

  return NextResponse.json({ received: true });
}
