"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function adminKey(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("apexrig-admin-key") || "";
}

export function setAdminKey(k: string) {
  sessionStorage.setItem("apexrig-admin-key", k);
}

export function logout(router: ReturnType<typeof useRouter>) {
  sessionStorage.removeItem("apexrig-admin-key");
  router.push("/admin");
}

const NAV = [
  { href: "/admin", label: "Orders" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="min-h-screen bg-bg">
      <div className="flex">
        <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-line min-h-screen px-5 py-6 sticky top-0">
          <Link href="/" className="font-bold tracking-tight text-[1.05rem] mb-1">
            APEXRIG<sup className="text-or text-[0.55em]">®</sup>
          </Link>
          <p className="mono text-mut text-[0.58rem] mb-8">ADMIN</p>
          <nav className="grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-lg px-3 py-2.5 text-[0.9rem] font-medium ${
                  pathname === n.href ? "bg-ink text-bg" : "text-ink hover:bg-white"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-1">
            <Link href="/" className="rounded-lg px-3 py-2.5 text-[0.85rem] text-mut hover:bg-white">← Back to store</Link>
            <button onClick={() => logout(router)} className="text-left rounded-lg px-3 py-2.5 text-[0.85rem] text-mut hover:bg-white">
              Log out
            </button>
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
