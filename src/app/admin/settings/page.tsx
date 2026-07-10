"use client";

import { useEffect, useState } from "react";
import { btnClass } from "@/components/ui";
import AdminShell, { adminKey } from "@/components/AdminShell";
import { useRouter } from "next/navigation";

const input = "w-full bg-white border border-line rounded-xl px-4 py-3.5 text-[0.95rem] mb-3 focus:outline-none focus:border-or";

export default function Settings() {
  const router = useRouter();
  const [cfg, setCfg] = useState({ supplierEmail: "", fromEmail: "", resendApiKey: "", webhookUrl: "" });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const k = adminKey();
    if (!k) { router.push("/admin"); return; }
    fetch("/api/config", { headers: { "X-Admin-Key": k } }).then(async (res) => {
      if (!res.ok) { router.push("/admin"); return; }
      setCfg(await res.json());
      setLoaded(true);
    });
  }, [router]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey() },
      body: JSON.stringify(cfg),
    });
    setSaving(false);
    setSaved(true);
  }

  const set = (k: string, v: string) => setCfg((c) => ({ ...c, [k]: v }));

  if (!loaded) {
    return (
      <AdminShell>
        <div className="px-6 md:px-10 py-8 max-w-[1400px] mx-auto">
          <p className="text-mut">Loading settings…</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="px-6 md:px-10 py-8 max-w-[720px] mx-auto">
        <div className="flex justify-between items-center mb-7 md:hidden">
          <span className="font-bold">APEXRIG<sup className="text-or text-[0.55em]">®</sup> Admin</span>
        </div>
        <h1 className="text-[1.6rem] font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-mut text-[0.88rem] mb-7">
          When an order comes in and is paid, we&apos;ll notify your manufacturer automatically —
          by email (via Resend) and/or by pinging a webhook URL. Fill in either or both.
        </p>

        <form onSubmit={save} className="bg-white border border-line rounded-2xl p-6">
          <h3 className="font-medium mb-3">Email notification</h3>
          <label className="block text-[0.8rem] text-mut mb-1.5">Manufacturer&apos;s email</label>
          <input className={input} type="email" placeholder="orders@gygameseat.com" value={cfg.supplierEmail} onChange={(e) => set("supplierEmail", e.target.value)} />

          <label className="block text-[0.8rem] text-mut mb-1.5">Sending email (must be on a domain verified in Resend)</label>
          <input className={input} type="email" placeholder="orders@apexrig.com" value={cfg.fromEmail} onChange={(e) => set("fromEmail", e.target.value)} />

          <label className="block text-[0.8rem] text-mut mb-1.5">Resend API key</label>
          <input className={input} type="password" placeholder="re_…" value={cfg.resendApiKey} onChange={(e) => set("resendApiKey", e.target.value)} />
          <p className="text-mut text-[0.78rem] mb-5 -mt-2">
            Get one free at <a href="https://resend.com" target="_blank" rel="noreferrer" className="text-or underline">resend.com</a> — you&apos;ll need to verify a sending domain there first.
          </p>

          <h3 className="font-medium mb-3 mt-2">Webhook (optional)</h3>
          <label className="block text-[0.8rem] text-mut mb-1.5">POST the full order JSON to this URL on every paid order</label>
          <input className={input} placeholder="https://…" value={cfg.webhookUrl} onChange={(e) => set("webhookUrl", e.target.value)} />

          <button type="submit" disabled={saving} className={`${btnClass("solid", "md")} mt-2 disabled:opacity-60`}>
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save settings"}
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
