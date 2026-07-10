import { NextResponse } from "next/server";
import { adminKey } from "@/lib/orders";

// TEMPORARY — deployed once to retrieve the auto-generated admin key, then deleted.
export async function GET() {
  return NextResponse.json({ key: await adminKey() });
}
