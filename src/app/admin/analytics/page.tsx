"use client";

import { useEffect, useMemo, useState } from "react";
import { money } from "@/lib/catalog";
import AdminShell, { adminKey } from "@/components/AdminShell";
import { useRouter } from "next/navigation";

type Order = {
  id: string; createdAt: string; status: string;
  items: { id: string; name: string; qty: number; price: number }[];
  contact: { firstName: string; lastName: string; email: string };
  address: { street: string; city: string; postcode: string; country: string };
  totals: { subtotal: number; shipping: number; total: number };
};

const RANGES = [7, 30, 90] as const;

export default function Analytics() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [days, setDays] = useState<(typeof RANGES)[number]>(30);

  useEffect(() => {
    const k = adminKey();
    if (!k) { router.push("/admin"); return; }
    fetch("/api/orders", { headers: { "X-Admin-Key": k } }).then(async (res) => {
      if (!res.ok) { router.push("/admin"); return; }
      setOrders(await res.json());
    });
  }, [router]);

  const stats = useMemo(() => {
    if (!orders) return null;
    const since = Date.now() - days * 86400000;
    const inRange = orders.filter((o) => new Date(o.createdAt).getTime() >= since);
    const active = inRange.filter((o) => o.status !== "cancelled");
    const revenue = active.reduce((n, o) => n + o.totals.total, 0);
    const aov = active.length ? revenue / active.length : 0;
    const itemsSold = active.reduce((n, o) => n + o.items.reduce((m, i) => m + i.qty, 0), 0);
    const cancelled = inRange.filter((o) => o.status === "cancelled").length;

    // revenue by day
    const byDay = new Map<string, number>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      byDay.set(d.toISOString().slice(0, 10), 0);
    }
    active.forEach((o) => {
      const key = o.createdAt.slice(0, 10);
      if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + o.totals.total);
    });
    const series = Array.from(byDay.entries()).map(([date, value]) => ({ date, value }));

    // orders by status (all-time, unaffected by range, mirrors Shopify's fulfillment breakdown)
    const statusCounts: Record<string, number> = {};
    orders.forEach((o) => { statusCounts[o.status] = (statusCounts[o.status] ?? 0) + 1; });

    // top products
    const productMap = new Map<string, { name: string; qty: number; revenue: number }>();
    active.forEach((o) => o.items.forEach((i) => {
      const cur = productMap.get(i.id) ?? { name: i.name, qty: 0, revenue: 0 };
      cur.qty += i.qty;
      cur.revenue += i.qty * i.price;
      productMap.set(i.id, cur);
    }));
    const topProducts = Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue);

    // top customers
    const custMap = new Map<string, { name: string; email: string; orders: number; spend: number }>();
    active.forEach((o) => {
      const cur = custMap.get(o.contact.email) ?? {
        name: `${o.contact.firstName} ${o.contact.lastName}`, email: o.contact.email, orders: 0, spend: 0,
      };
      cur.orders += 1;
      cur.spend += o.totals.total;
      custMap.set(o.contact.email, cur);
    });
    const topCustomers = Array.from(custMap.values()).sort((a, b) => b.spend - a.spend).slice(0, 6);

    // sales by country
    const countryMap = new Map<string, number>();
    active.forEach((o) => {
      const c = o.address.country || "Unknown";
      countryMap.set(c, (countryMap.get(c) ?? 0) + o.totals.total);
    });
    const byCountry = Array.from(countryMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);

    return { revenue, aov, itemsSold, orderCount: active.length, cancelled, series, statusCounts, topProducts, topCustomers, byCountry };
  }, [orders, days]);

  if (!orders || !stats) {
    return (
      <AdminShell>
        <div className="px-6 md:px-10 py-8 max-w-[1400px] mx-auto">
          <p className="text-mut">Loading analytics…</p>
        </div>
      </AdminShell>
    );
  }

  const maxDay = Math.max(1, ...stats.series.map((d) => d.value));
  const totalOrders = orders.length;
  const STATUS_COLOR: Record<string, string> = {
    new: "#f59e0b", paid: "#2563eb", packed: "#a16207",
    shipped: "#7c3aed", delivered: "#16a34a", cancelled: "#9ca3af",
  };

  return (
    <AdminShell>
      <div className="px-6 md:px-10 py-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-7 md:hidden">
          <span className="font-bold">APEXRIG<sup className="text-or text-[0.55em]">®</sup> Admin</span>
        </div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-[1.6rem] font-bold tracking-tight">Analytics</h1>
          <div className="flex gap-1.5">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setDays(r)}
                className={`text-[0.78rem] px-3 py-1.5 rounded-full border ${days === r ? "bg-ink text-bg border-ink" : "border-line hover:border-or"}`}
              >
                {r}d
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            ["Revenue", money(stats.revenue)],
            ["Orders", stats.orderCount],
            ["Avg. order value", money(Math.round(stats.aov))],
            ["Items sold", stats.itemsSold],
          ].map(([l, v]) => (
            <div key={l as string} className="bg-white border border-line rounded-2xl p-5 grid gap-1.5">
              <span className="text-mut text-[0.78rem]">{l}</span>
              <strong className="text-[1.7rem] tracking-tight">{v}</strong>
            </div>
          ))}
        </div>

        <div className="bg-white border border-line rounded-2xl p-5 mb-6">
          <p className="text-mut text-[0.78rem] mb-4">Revenue — last {days} days</p>
          <svg viewBox={`0 0 ${stats.series.length * 14} 140`} className="w-full h-[140px]" preserveAspectRatio="none">
            {stats.series.map((d, i) => {
              const h = (d.value / maxDay) * 120;
              return (
                <rect
                  key={d.date}
                  x={i * 14 + 2}
                  y={140 - h}
                  width={10}
                  height={Math.max(h, d.value > 0 ? 2 : 0)}
                  rx={2}
                  fill={d.value > 0 ? "#e8722c" : "#eee"}
                >
                  <title>{d.date}: {money(d.value)}</title>
                </rect>
              );
            })}
          </svg>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="bg-white border border-line rounded-2xl p-5">
            <p className="text-mut text-[0.78rem] mb-4">Orders by status</p>
            <div className="grid gap-2.5">
              {Object.entries(stats.statusCounts).map(([status, count]) => (
                <div key={status} className="grid grid-cols-[80px_1fr_36px] items-center gap-3">
                  <span className="text-[0.82rem] capitalize">{status}</span>
                  <div className="h-2 rounded-full bg-bg overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(count / totalOrders) * 100}%`, background: STATUS_COLOR[status] ?? "#ccc" }}
                    />
                  </div>
                  <span className="text-[0.82rem] text-mut text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-line rounded-2xl p-5">
            <p className="text-mut text-[0.78rem] mb-4">Sales by country</p>
            <div className="grid gap-2.5">
              {stats.byCountry.length === 0 && <p className="text-mut text-[0.85rem]">No data yet.</p>}
              {stats.byCountry.map(([country, total]) => (
                <div key={country} className="grid grid-cols-[1fr_auto] items-center gap-3">
                  <span className="text-[0.82rem]">{country}</span>
                  <span className="text-[0.82rem] font-medium">{money(total)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-line rounded-2xl overflow-hidden">
            <p className="text-mut text-[0.78rem] px-5 pt-5 pb-3">Top products</p>
            {stats.topProducts.length === 0 && <p className="text-mut text-[0.85rem] px-5 pb-5">No sales yet.</p>}
            {stats.topProducts.map((p) => (
              <div key={p.name} className="flex justify-between items-center px-5 py-3 border-t border-line text-[0.88rem]">
                <span>{p.name} <span className="text-mut">×{p.qty}</span></span>
                <span className="font-medium">{money(p.revenue)}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border border-line rounded-2xl overflow-hidden">
            <p className="text-mut text-[0.78rem] px-5 pt-5 pb-3">Top customers</p>
            {stats.topCustomers.length === 0 && <p className="text-mut text-[0.85rem] px-5 pb-5">No customers yet.</p>}
            {stats.topCustomers.map((c) => (
              <div key={c.email} className="flex justify-between items-center px-5 py-3 border-t border-line text-[0.88rem]">
                <span>{c.name} <span className="text-mut">· {c.orders} order{c.orders === 1 ? "" : "s"}</span></span>
                <span className="font-medium">{money(c.spend)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
