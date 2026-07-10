"use client";

import { useEffect, useMemo, useState } from "react";
import { money } from "@/lib/catalog";
import { btnClass } from "@/components/ui";
import AdminShell, { adminKey, setAdminKey } from "@/components/AdminShell";

type Order = {
  id: string; createdAt: string; status: string;
  items: { name: string; qty: number; price: number }[];
  contact: { firstName: string; lastName: string; email: string };
  address: { street: string; city: string; postcode: string; country: string };
  shipping: { method: string; cost: number; tracking: string };
  totals: { subtotal: number; shipping: number; total: number };
  notes: string;
};

const STATUSES = ["new", "paid", "packed", "shipped", "delivered", "cancelled"];
const BADGE: Record<string, string> = {
  new: "border-or text-or bg-[#fff3e6]",
  paid: "border-[#2563eb] text-[#2563eb] bg-[#eef6ff]",
  packed: "border-[#a16207] text-[#a16207] bg-[#fdf7e2]",
  shipped: "border-[#7c3aed] text-[#7c3aed] bg-[#f0eaff]",
  delivered: "border-[#16a34a] text-[#16a34a] bg-[#e9f9ef]",
  cancelled: "border-[#bbb] text-[#888] bg-[#f4f4f4]",
};
const input = "bg-white border border-line rounded-xl px-3.5 py-2.5 text-[0.88rem] font-[inherit]";

export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    const k = adminKey();
    if (k) { setKey(k); load(k); }
  }, []);

  async function load(k = key) {
    const res = await fetch("/api/orders", { headers: { "X-Admin-Key": k } });
    if (!res.ok) return false;
    setOrders(await res.json());
    setAuthed(true);
    return true;
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (await load(key)) setAdminKey(key);
    else alert("Wrong key");
  }

  function exportCsv() {
    const rows = [["id", "date", "status", "name", "email", "street", "city", "postcode", "country", "method", "tracking", "items", "total"]];
    orders.forEach((o) => rows.push([o.id, o.createdAt, o.status, `${o.contact.firstName} ${o.contact.lastName}`, o.contact.email, o.address.street, o.address.city, o.address.postcode, o.address.country, o.shipping.method, o.shipping.tracking, o.items.map((i) => `${i.qty}x ${i.name}`).join("; "), String(o.totals.total)]));
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "apexrig-orders.csv";
    a.click();
  }

  const list = useMemo(() => {
    let l = statusFilter ? orders.filter((o) => o.status === statusFilter) : orders;
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      l = l.filter((o) =>
        o.id.toLowerCase().includes(s) ||
        `${o.contact.firstName} ${o.contact.lastName}`.toLowerCase().includes(s) ||
        o.contact.email.toLowerCase().includes(s)
      );
    }
    return l;
  }, [orders, statusFilter, q]);

  const active = orders.filter((o) => o.status !== "cancelled");
  const revenue = active.reduce((n, o) => n + o.totals.total, 0);
  const toShip = orders.filter((o) => ["new", "paid", "packed"].includes(o.status)).length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  if (!authed) {
    return (
      <section className="px-[6vw] py-[70px] max-w-[1080px] mx-auto min-h-[70vh]">
        <p className="mono text-or mb-5">— ADMIN</p>
        <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Enter admin key.</h2>
        <form onSubmit={login} className="max-w-[420px] mt-10">
          <input className={`${input} w-full mb-3 py-3.5`} type="password" placeholder="Admin key (see data/admin-key.txt)" required value={key} onChange={(e) => setKey(e.target.value)} />
          <button type="submit" className={`${btnClass("solid", "lg")} w-full`}>Open Dashboard</button>
          <p className="mono text-mut text-[0.6rem] mt-3">THE KEY IS PRINTED IN THE SERVER CONSOLE AND SAVED IN data/admin-key.txt</p>
        </form>
      </section>
    );
  }

  return (
    <AdminShell>
      <div className="px-6 md:px-10 py-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-7 md:hidden">
          <span className="font-bold">APEXRIG<sup className="text-or text-[0.55em]">®</sup> Admin</span>
        </div>
        <h1 className="text-[1.6rem] font-bold tracking-tight mb-6">Orders</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {[["Orders", active.length], ["Revenue", money(revenue)], ["To ship", toShip], ["Delivered", delivered]].map(([l, v]) => (
            <div key={l as string} className="bg-white border border-line rounded-2xl p-5 grid gap-1.5">
              <span className="text-mut text-[0.78rem]">{l}</span>
              <strong className="text-[1.7rem] tracking-tight">{v}</strong>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-5">
          <input className={`${input} flex-1 min-w-[200px]`} placeholder="Search order #, name or email…" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="flex gap-1.5 flex-wrap">
            <button onClick={() => setStatusFilter("")} className={`text-[0.78rem] px-3 py-1.5 rounded-full border ${statusFilter === "" ? "bg-ink text-bg border-ink" : "border-line hover:border-or"}`}>All</button>
            {STATUSES.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`text-[0.78rem] px-3 py-1.5 rounded-full border capitalize ${statusFilter === s ? "bg-ink text-bg border-ink" : "border-line hover:border-or"}`}>{s}</button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <button className={btnClass("ghost", "sm")} onClick={() => load()}>Refresh</button>
            <button className={btnClass("ghost", "sm")} onClick={exportCsv}>Export CSV</button>
          </div>
        </div>

        <div className="bg-white border border-line rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[1.1fr_1.3fr_1fr_0.9fr_0.9fr_0.9fr] gap-4 px-5 py-3 border-b border-line text-[0.72rem] uppercase tracking-wide text-mut">
            <span>Order</span><span>Customer</span><span>Date</span><span>Items</span><span>Total</span><span>Status</span>
          </div>
          {list.length === 0 && (
            <p className="text-mut text-center py-14 text-[0.9rem]">
              {orders.length === 0 ? "No orders yet — share the store link and go racing." : "No orders match your search."}
            </p>
          )}
          {list.map((o) => (
            <a
              key={o.id}
              href={`/admin/orders/${o.id}`}
              className="grid grid-cols-2 md:grid-cols-[1.1fr_1.3fr_1fr_0.9fr_0.9fr_0.9fr] gap-2 md:gap-4 items-center px-5 py-4 border-b border-line last:border-0 hover:bg-bg text-[0.88rem]"
            >
              <span className="font-mono text-[0.82rem]">#{o.id}</span>
              <span>{o.contact.firstName} {o.contact.lastName}</span>
              <span className="text-mut hidden md:inline">{new Date(o.createdAt).toLocaleDateString()}</span>
              <span className="text-mut hidden md:inline">{o.items.reduce((n, i) => n + i.qty, 0)} item{o.items.reduce((n, i) => n + i.qty, 0) === 1 ? "" : "s"}</span>
              <span className="font-medium">{money(o.totals.total)}</span>
              <span className={`justify-self-start text-[0.68rem] px-2.5 py-1 rounded-full border capitalize ${BADGE[o.status]}`}>{o.status}</span>
            </a>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
