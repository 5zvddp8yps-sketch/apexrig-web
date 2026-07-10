import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders, clean, adminKey, STATUSES } from "@/lib/orders";

// GET /api/orders/[id] — fetch a single order (admin only)
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (req.headers.get("x-admin-key") !== (await adminKey())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const order = (await readOrders()).find((o) => o.id === id);
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(order);
}

// PATCH /api/orders/[id] — update status/tracking/notes (admin only)
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (req.headers.get("x-admin-key") !== (await adminKey())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const orders = await readOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });

  if (b.status !== undefined) {
    if (!STATUSES.includes(b.status as (typeof STATUSES)[number])) {
      return NextResponse.json({ error: "bad status" }, { status: 400 });
    }
    order.status = b.status as string;
  }
  if (b.tracking !== undefined) order.shipping.tracking = clean(b.tracking, 80);
  if (b.notes !== undefined) order.notes = clean(b.notes, 2000);

  await writeOrders(orders);
  return NextResponse.json(order);
}
