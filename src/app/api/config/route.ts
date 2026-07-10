import { NextRequest, NextResponse } from "next/server";
import { adminKey, readConfig, writeConfig, clean } from "@/lib/orders";

// GET /api/config — fetch supplier-notification settings (admin only)
export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== (await adminKey())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readConfig());
}

// PATCH /api/config — update supplier-notification settings (admin only)
export async function PATCH(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== (await adminKey())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const cfg = {
    supplierEmail: clean(b.supplierEmail, 120),
    fromEmail: clean(b.fromEmail, 120),
    resendApiKey: clean(b.resendApiKey, 200),
    webhookUrl: clean(b.webhookUrl, 300),
  };
  await writeConfig(cfg);
  return NextResponse.json(cfg);
}
