"use client";

import { useState } from "react";
import { Nav, Toast } from "@/components/chrome";
import { btnClass } from "@/components/ui";

const STEPS = [
  ["new", "Order received"],
  ["paid", "Payment confirmed"],
  ["packed", "Packed"],
  ["shipped", "Shipped"],
  ["delivered", "Delivered"],
];
const input = "w-full bg-white border border-line rounded-xl px-4 py-3.5 text-[0.95rem] mb-3 focus:outline-none focus:border-or";

type Result = {
  id: string; status: string; items: { name: string; qty: number }[];
  city: string; country: string; tracking: string;
};

export default function Track() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [err, setErr] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(false);
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: orderId.replace(/^#/, ""), email }),
    });
    if (!res.ok) { setResult(null); setErr(true); return; }
    setResult(await res.json());
  }

  const reached = result ? STEPS.findIndex(([s]) => s === result.status) : -1;

  return (
    <>
      <Nav />
      <section className="px-[6vw] py-[70px] max-w-[1080px] mx-auto min-h-[60vh]">
        <p className="mono text-or mb-5">— TRACK ORDER</p>
        <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Where&apos;s my rig?</h2>

        <form onSubmit={submit} className="max-w-[420px] mt-10">
          <input className={input} placeholder="Order number (e.g. AR-XXXXXXXX)" required value={orderId} onChange={(e) => setOrderId(e.target.value)} />
          <input className={input} type="email" placeholder="Email used at checkout" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className={`${btnClass("solid", "lg")} w-full`}>Track</button>
        </form>

        {err && <p className="mono text-mut mt-6">NO ORDER FOUND FOR THAT NUMBER + EMAIL. CHECK BOTH AND TRY AGAIN.</p>}

        {result && (
          <div className="bg-white border border-line rounded-[20px] p-8 mt-10 max-w-[640px]">
            <div className="flex justify-between items-center mb-7">
              <span className="mono">#{result.id}</span>
              <span className="mono text-[0.6rem] px-3 py-1.5 rounded-full border border-or text-or bg-[#fff3e6]">{result.status.toUpperCase()}</span>
            </div>
            {result.status === "cancelled" ? (
              <p className="mono text-mut">THIS ORDER WAS CANCELLED. CONTACT SUPPORT IF THAT LOOKS WRONG.</p>
            ) : (
              <div className="grid mb-7">
                {STEPS.map(([s, label], i) => (
                  <div key={s} className={`flex items-center gap-3.5 py-2.5 ${i <= reached ? "opacity-100" : "opacity-35"}`}>
                    <span className={`w-3.5 h-3.5 rounded-full border-2 ${i <= reached ? "bg-[linear-gradient(90deg,var(--color-or),var(--color-ye))] border-or" : "border-ink"}`} />
                    <span className="mono">{label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="grid sm:grid-cols-3 gap-5 border-t border-line pt-5 text-[0.9rem]">
              <div><p className="mono text-mut text-[0.6rem] mb-1.5">ITEMS</p>{result.items.map((i, n) => <p key={n}>{i.qty} × {i.name}</p>)}</div>
              <div><p className="mono text-mut text-[0.6rem] mb-1.5">SHIPPING TO</p><p>{result.city}, {result.country}</p></div>
              <div><p className="mono text-mut text-[0.6rem] mb-1.5">TRACKING #</p><p>{result.tracking || "Assigned when your rig ships"}</p></div>
            </div>
          </div>
        )}
      </section>
      <Toast />
    </>
  );
}
