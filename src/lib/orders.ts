// Order store. Uses Postgres when DATABASE_URL is set (production/Vercel/Netlify),
// otherwise falls back to a local JSON file (zero-setup local dev).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { hasDb, kvGet, kvSet } from "./db";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const KEY_FILE = path.join(DATA_DIR, "admin-key.txt");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

export const PRICES: Record<string, number> = {
  "gt-fold-one": 249, "gt-fold-sport": 379, "gt-fold-pro": 499,
  "gt-fold-elite": 749, "gt-fold-apex": 1099,
};
export const NAMES: Record<string, string> = {
  "gt-fold-one": "GT-Fold One", "gt-fold-sport": "GT-Fold Sport",
  "gt-fold-pro": "GT Pro", "gt-fold-elite": "GT Elite", "gt-fold-apex": "GT Apex",
};
export const SHIPPING: Record<string, number> = { standard: 0, express: 29, priority: 79 };
export const STATUSES = ["new", "paid", "packed", "shipped", "delivered", "cancelled"] as const;

export type OrderItem = { id: string; name: string; qty: number; price: number };
export type Order = {
  id: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
  contact: { firstName: string; lastName: string; email: string };
  address: { street: string; city: string; postcode: string; country: string };
  shipping: { method: string; cost: number; tracking: string };
  totals: { subtotal: number; shipping: number; total: number };
  notes: string;
};
type Config = { supplierEmail: string; fromEmail: string; resendApiKey: string; webhookUrl: string };

const DEFAULT_CONFIG: Config = { supplierEmail: "", fromEmail: "", resendApiKey: "", webhookUrl: "" };

function ensureFileStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, "[]");
  if (!fs.existsSync(KEY_FILE)) fs.writeFileSync(KEY_FILE, crypto.randomBytes(9).toString("base64url"));
  if (!fs.existsSync(CONFIG_FILE)) fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2));
}

export async function adminKey(): Promise<string> {
  if (hasDb()) {
    let key = await kvGet<string>("admin_key");
    if (!key) {
      key = crypto.randomBytes(9).toString("base64url");
      await kvSet("admin_key", key);
    }
    return key;
  }
  ensureFileStore();
  return fs.readFileSync(KEY_FILE, "utf8").trim();
}

export async function readOrders(): Promise<Order[]> {
  if (hasDb()) return (await kvGet<Order[]>("orders")) ?? [];
  ensureFileStore();
  return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
}

export async function writeOrders(orders: Order[]): Promise<void> {
  if (hasDb()) return kvSet("orders", orders);
  ensureFileStore();
  const tmp = ORDERS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(orders, null, 2));
  fs.renameSync(tmp, ORDERS_FILE);
}

async function readConfig(): Promise<Config> {
  if (hasDb()) return (await kvGet<Config>("config")) ?? DEFAULT_CONFIG;
  ensureFileStore();
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
}

export function clean(v: unknown, max = 200): string {
  return String(v ?? "").slice(0, max).trim();
}

export async function notifySupplier(order: Order): Promise<void> {
  const cfg = await readConfig();
  const lines = order.items.map((i) => `${i.qty} x ${i.name}`).join("\n");
  const addr = `${order.contact.firstName} ${order.contact.lastName}\n${order.address.street}\n${order.address.city} ${order.address.postcode}\n${order.address.country}`;
  if (cfg.webhookUrl) {
    fetch(cfg.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).catch(() => {});
  }
  if (cfg.resendApiKey && cfg.supplierEmail && cfg.fromEmail) {
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.resendApiKey}` },
      body: JSON.stringify({
        from: cfg.fromEmail,
        to: [cfg.supplierEmail],
        subject: `New order ${order.id} — please fulfill`,
        text: `New APEXRIG order.\n\nORDER: ${order.id}\n\nITEMS:\n${lines}\n\nSHIP TO:\n${addr}\n\nShipping method: ${order.shipping.method}\n\nReply to confirm dispatch with a tracking number.`,
      }),
    }).catch(() => {});
  }
}

export function newOrderId(): string {
  return "AR-" + Date.now().toString(36).toUpperCase() + crypto.randomBytes(2).toString("hex").toUpperCase();
}
