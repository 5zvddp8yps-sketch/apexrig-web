import { NextRequest, NextResponse } from "next/server";
import {
  PRICES, NAMES, SHIPPING, readOrders, writeOrders, clean,
  notifySupplier, newOrderId, adminKey, type Order, type OrderItem,
} from "@/lib/orders";

// POST /api/orders — create an order (public)
export async function POST(req: NextRequest) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const rawItems = Array.isArray(b.items) ? (b.items as { id: string; qty: number }[]) : [];
  const items: OrderItem[] = rawItems
    .filter((i) => PRICES[i.id] && Number.isInteger(i.qty) && i.qty > 0 && i.qty <= 50)
    .map((i) => ({ id: i.id, name: NAMES[i.id], qty: i.qty, price: PRICES[i.id] }));
  if (!items.length) return NextResponse.json({ error: "cart empty or invalid" }, { status: 400 });

  const shipMethod = SHIPPING[b.shipping as string] !== undefined ? (b.shipping as string) : "standard";
  const c = (b.contact ?? {}) as Record<string, unknown>;
  const a = (b.address ?? {}) as Record<string, unknown>;
  const contact = {
    firstName: clean(c.firstName, 60), lastName: clean(c.lastName, 60), email: clean(c.email, 120),
  };
  const address = {
    street: clean(a.street), city: clean(a.city, 80),
    postcode: clean(a.postcode, 20), country: clean(a.country, 60),
  };
  if (!contact.firstName || !contact.email || !address.street || !address.city || !address.country) {
    return NextResponse.json({ error: "missing contact or address fields" }, { status: 400 });
  }

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const shippingCost = SHIPPING[shipMethod];
  const order: Order = {
    id: newOrderId(),
    createdAt: new Date().toISOString(),
    status: "new",
    items, contact, address,
    shipping: { method: shipMethod, cost: shippingCost, tracking: "" },
    totals: { subtotal, shipping: shippingCost, total: subtotal + shippingCost },
    notes: "",
  };

  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);
  notifySupplier(order).catch(() => {});
  return NextResponse.json({ id: order.id, total: order.totals.total }, { status: 201 });
}

// GET /api/orders — list all (admin only)
export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== (await adminKey())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readOrders());
}
