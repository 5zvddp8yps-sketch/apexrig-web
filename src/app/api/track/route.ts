import { NextRequest, NextResponse } from "next/server";
import { readOrders, clean } from "@/lib/orders";

// POST /api/track — customer order lookup by id + email (public, safe subset)
export async function POST(req: NextRequest) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const orderId = clean(b.orderId, 40).toLowerCase();
  const email = clean(b.email, 120).toLowerCase();
  const order = (await readOrders()).find(
    (o) => o.id.toLowerCase() === orderId && o.contact.email.toLowerCase() === email
  );
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json({
    id: order.id,
    status: order.status,
    createdAt: order.createdAt,
    items: order.items.map((i) => ({ name: i.name, qty: i.qty })),
    city: order.address.city,
    country: order.address.country,
    tracking: order.shipping.tracking,
  });
}
