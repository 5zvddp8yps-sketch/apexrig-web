"use client";

import { useEffect, useState, use as usePromise } from "react";
import { money } from "@/lib/catalog";
import { btnClass } from "@/components/ui";
import AdminShell, { adminKey } from "@/components/AdminShell";

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
const input = "bg-white border border-line rounded-xl px-3.5 py-2.5 text-[0.88rem] font-[inherit] w-full";

export default function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);
  const [key] = useState(adminKey());
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [tracking, setTracking] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!key) { window.location.href = "/admin"; return; }
    fetch(`/api/orders/${id}`, { headers: { "X-Admin-Key": key } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((o: Order) => { setOrder(o); setStatus(o.status); setTracking(o.shipping.tracking); setNotes(o.notes); })
      .catch(() => { window.location.href = "/admin"; });
  }, [id, key]);

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-Admin-Key": key },
      body: JSON.stringify({ status, tracking, notes }),
    });
    if (res.ok) {
      setOrder(await res.json());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  if (!order) {
    return (
      <AdminShell>
        <div className="px-6 md:px-10 py-8 max-w-[1000px] mx-auto text-mut">Loading…</div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="px-6 md:px-10 py-8 max-w-[1000px] mx-auto">
        <a href="/admin" className="text-mut text-[0.85rem] hover:text-or">← All orders</a>
        <div className="flex flex-wrap items-center gap-3 mt-3 mb-8">
          <h1 className="text-[1.6rem] font-bold tracking-tight">Order #{order.id}</h1>
          <span className={`text-[0.7rem] px-2.5 py-1 rounded-full border capitalize ${BADGE[order.status]}`}>{order.status}</span>
          <span className="text-mut text-[0.85rem] ml-auto">{new Date(order.createdAt).toLocaleString()}</span>
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-6">
          <div className="grid gap-6 content-start">
            <div className="bg-white border border-line rounded-2xl p-6">
              <h3 className="text-[0.78rem] uppercase tracking-wide text-mut mb-4">Items</h3>
              {order.items.map((i, n) => (
                <div key={n} className="flex justify-between py-2.5 border-b border-line last:border-0 text-[0.92rem]">
                  <span>{i.qty} × {i.name}</span>
                  <span>{money(i.price * i.qty)}</span>
                </div>
              ))}
              <div className="pt-3 mt-1 grid gap-1.5 text-[0.88rem]">
                <div className="flex justify-between text-mut"><span>Subtotal</span><span>{money(order.totals.subtotal)}</span></div>
                <div className="flex justify-between text-mut"><span>Shipping ({order.shipping.method})</span><span>{order.totals.shipping ? money(order.totals.shipping) : "Free"}</span></div>
                <div className="flex justify-between font-bold text-[1.05rem] pt-1"><span>Total</span><span>{money(order.totals.total)}</span></div>
              </div>
            </div>

            <div className="bg-white border border-line rounded-2xl p-6">
              <h3 className="text-[0.78rem] uppercase tracking-wide text-mut mb-4">Customer</h3>
              <p className="font-medium">{order.contact.firstName} {order.contact.lastName}</p>
              <p className="text-mut text-[0.9rem]">{order.contact.email}</p>
              <h3 className="text-[0.78rem] uppercase tracking-wide text-mut mt-5 mb-2">Shipping address</h3>
              <p className="text-[0.92rem]">{order.address.street}<br />{order.address.city} {order.address.postcode}<br />{order.address.country}</p>
            </div>
          </div>

          <div className="bg-white border border-line rounded-2xl p-6 content-start grid gap-4 h-fit">
            <h3 className="text-[0.78rem] uppercase tracking-wide text-mut">Fulfillment</h3>
            <div>
              <label className="text-[0.78rem] text-mut block mb-1.5">Status</label>
              <select className={input} value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[0.78rem] text-mut block mb-1.5">Tracking number</label>
              <input className={input} value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="e.g. AU123456789" />
            </div>
            <div>
              <label className="text-[0.78rem] text-mut block mb-1.5">Internal notes</label>
              <textarea className={`${input} min-h-[90px] resize-y`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes only you can see" />
            </div>
            <button className={btnClass("solid", "md")} onClick={save} disabled={saving}>
              {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
