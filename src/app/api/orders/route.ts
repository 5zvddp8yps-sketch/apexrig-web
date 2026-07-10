import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders, notifySupplier, adminKey, buildOrderFromInput } from "@/lib/orders";

// POST /api/orders — create an order without payment (public; used only as a fallback
// when Stripe isn't configured — prefer /api/checkout for real stores)
export async function POST(req: NextRequest) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const order = buildOrderFromInput(b);
  if ("error" in order) return NextResponse.json(order, { status: 400 });

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
