"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CATALOG, money } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { Nav, Toast } from "@/components/chrome";
import { btnClass } from "@/components/ui";

const SHIP = [
  { id: "standard", label: "Standard", note: "5–9 BUSINESS DAYS", cost: 0 },
  { id: "express", label: "Express", note: "2–4 BUSINESS DAYS", cost: 29 },
  { id: "priority", label: "Priority + Assembly", note: "2–4 DAYS · WE BUILD IT", cost: 79 },
];

const input =
  "w-full bg-white border border-line rounded-xl px-4 py-3.5 text-[0.95rem] mb-3 focus:outline-none focus:border-or";
const step = "text-[1.15rem] mt-8 mb-4 flex items-center gap-3 first:mt-0";

export default function Checkout() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const { cart, setQty, clear } = useCart();
  const params = useSearchParams();
  const [ship, setShip] = useState("standard");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(params.get("order"));
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", postcode: "", country: "",
  });

  useEffect(() => {
    if (params.get("order")) clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ids = Object.keys(cart).filter((id) => CATALOG[id]);
  const subtotal = useMemo(
    () => ids.reduce((n, id) => n + CATALOG[id].price * cart[id], 0),
    [ids, cart]
  );
  const shipCost = SHIP.find((s) => s.id === ship)!.cost;
  const total = subtotal + shipCost;
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: ids.map((id) => ({ id, qty: cart[id] })),
          shipping: ship,
          contact: { firstName: form.firstName, lastName: form.lastName, email: form.email },
          address: { street: form.street, city: form.city, postcode: form.postcode, country: form.country },
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "checkout failed");
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      setErr((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <>
      <Nav />
      <section className="px-[6vw] py-[70px] max-w-[1080px] mx-auto min-h-[60vh]">
        <p className="mono text-or mb-5">— CHECKOUT</p>
        <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Almost on the grid.</h2>

        {done ? (
          <div className="text-center py-20 grid gap-4 place-items-center">
            <p className="mono text-or">— ORDER CONFIRMED</p>
            <h3 className="text-[2rem]">Lights out and away you go. 🏁</h3>
            <p className="text-mut">
              Order <strong>#{done}</strong> confirmed. Follow it any time on the{" "}
              <Link href="/track" className="text-or border-b border-current">Track Order</Link> page.
            </p>
            <Link href="/" className={btnClass("solid", "md")}>Back to APEXRIG</Link>
          </div>
        ) : ids.length === 0 ? (
          <div className="text-center py-20 grid gap-4 place-items-center">
            <h3 className="text-[2rem]">Your cart is empty.</h3>
            <p className="text-mut">The grid is waiting.</p>
            <Link href="/#lineup" className={btnClass("solid", "md")}>Browse the Lineup</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 mt-12 items-start">
            <form onSubmit={submit}>
              <h3 className={step}><span className="mono text-or">01</span> Contact</h3>
              <div className="grid grid-cols-2 gap-3">
                <input className={input} placeholder="First name" required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                <input className={input} placeholder="Last name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
              </div>
              <input className={input} type="email" placeholder="Email" required autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />

              <h3 className={step}><span className="mono text-or">02</span> Shipping address</h3>
              <input className={input} placeholder="Street address" required autoComplete="street-address" value={form.street} onChange={(e) => set("street", e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <input className={input} placeholder="City" required value={form.city} onChange={(e) => set("city", e.target.value)} />
                <input className={input} placeholder="Postcode" value={form.postcode} onChange={(e) => set("postcode", e.target.value)} />
              </div>
              <select className={input} required value={form.country} onChange={(e) => set("country", e.target.value)}>
                <option value="">Country…</option>
                {["Australia", "United States", "United Kingdom", "Canada", "New Zealand", "Germany"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <h3 className={step}><span className="mono text-or">03</span> Shipping method</h3>
              <div className="grid gap-2.5">
                {SHIP.map((s) => (
                  <label key={s.id} className={`flex items-center gap-3.5 bg-white border rounded-xl px-4 py-3.5 cursor-pointer ${ship === s.id ? "border-or shadow-[0_0_0_1px_var(--color-or)]" : "border-line"}`}>
                    <input type="radio" name="ship" className="accent-[var(--color-or)]" checked={ship === s.id} onChange={() => setShip(s.id)} />
                    <span className="flex-1 flex flex-col">
                      <strong>{s.label}</strong>
                      <em className="not-italic text-mut mono text-[0.6rem]">{s.note}</em>
                    </span>
                    <span className="mono">{s.cost === 0 ? "FREE" : money(s.cost)}</span>
                  </label>
                ))}
              </div>

              {err && <p className="text-[#dc2626] text-sm mb-3">{err}</p>}
              <button type="submit" disabled={busy} className={`${btnClass("solid", "lg")} w-full mt-3 disabled:opacity-60`}>
                {busy ? "Redirecting to payment…" : "Continue to Payment"}
              </button>
              <p className="mono text-mut text-[0.6rem] text-center mt-3">SECURE CHECKOUT VIA STRIPE · VISA · MASTERCARD · APPLE PAY</p>
            </form>

            <aside className="bg-white border border-line rounded-[20px] p-8 md:sticky md:top-[100px]">
              <h3 className="text-[1.15rem] mb-2">Order summary</h3>
              {ids.map((id) => {
                const p = CATALOG[id];
                return (
                  <div key={id} className="flex items-center gap-3.5 py-3.5 border-b border-line text-[0.92rem]">
                    <div className="flex-1">
                      <strong>{p.name}</strong>
                      <br />
                      <span className="mono text-mut text-[0.6rem]">{p.series}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button type="button" aria-label="decrease" onClick={() => setQty(id, cart[id] - 1)} className="w-[26px] h-[26px] rounded-full border border-line hover:border-or hover:text-or">−</button>
                      <span>{cart[id]}</span>
                      <button type="button" aria-label="increase" onClick={() => setQty(id, cart[id] + 1)} className="w-[26px] h-[26px] rounded-full border border-line hover:border-or hover:text-or">+</button>
                    </div>
                    <span>{money(p.price * cart[id])}</span>
                  </div>
                );
              })}
              <div className="flex justify-between py-3 text-[0.95rem]"><span className="mono text-mut">SUBTOTAL</span><span>{money(subtotal)}</span></div>
              <div className="flex justify-between py-3 text-[0.95rem]"><span className="mono text-mut">SHIPPING</span><span>{shipCost === 0 ? "FREE" : money(shipCost)}</span></div>
              <div className="flex justify-between py-3 border-t border-line font-bold text-[1.25rem]"><span className="mono">TOTAL</span><span>{money(total)}</span></div>
              <p className="mono text-mut text-[0.6rem] mt-3.5">30-DAY RETURNS · 12-MONTH WARRANTY</p>
            </aside>
          </div>
        )}
      </section>
      <Toast />
    </>
  );
}
