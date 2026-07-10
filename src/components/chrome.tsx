"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { btnClass } from "@/components/ui";

export function AddToCart({
  id,
  label = "Add to Cart",
  variant = "solid",
  size = "md",
  full = false,
}: {
  id: string;
  label?: string;
  variant?: "solid" | "ghost" | "grad";
  size?: "md" | "lg" | "sm";
  full?: boolean;
}) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add(id)}
      className={`${btnClass(variant, size)} ${full ? "w-full" : ""}`}
    >
      {label}
    </button>
  );
}

export function Nav() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-[6vw] py-4 bg-bg/85 backdrop-blur-md border-b border-line">
      <Link href="/" className="font-bold tracking-tight text-[1.05rem]">
        APEXRIG<sup className="text-or text-[0.55em]">®</sup>
      </Link>
      <nav className="hidden md:flex gap-8 text-[0.85rem]">
        <Link href="/the-rig" className="hover:text-or">The Rig</Link>
        <Link href="/reviews" className="hover:text-or">Reviews</Link>
        <Link href="/lineup" className="hover:text-or">Lineup</Link>
        <Link href="/faq" className="hover:text-or">FAQ</Link>
      </nav>
      <div className="flex items-center gap-5">
        <Link href="/checkout" className="mono text-[0.72rem] hover:text-or">
          CART ({count})
        </Link>
        <AddToCart id="gt-fold-pro" label="Add to Cart" size="sm" />
      </div>
    </header>
  );
}

export function StickyBuy() {
  const { add } = useCart();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-between gap-4 px-[5vw] py-3 bg-bg/95 backdrop-blur-md border-t border-line shadow-[0_-8px_30px_rgba(120,70,10,0.10)]"
        >
          <div className="flex flex-col leading-tight">
            <strong className="text-base">GT Pro</strong>
            <span className="mono text-[0.72rem]">
              <s className="text-mut mr-1.5">$649</s> $499
            </span>
          </div>
          <button onClick={() => add("gt-fold-pro")} className={`${btnClass("solid", "md")} whitespace-nowrap`}>
            Add to Cart
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast() {
  const { toast } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 right-6 z-[99] bg-ink text-ye font-medium px-6 py-3.5 rounded-full shadow-lg"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="px-[6vw] pt-20 pb-10 border-t border-line">
      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 max-w-[1200px] mx-auto">
        <div>
          <p className="font-bold text-[1.3rem] mb-3">APEXRIG<sup className="text-or text-[0.55em]">®</sup></p>
          <p className="text-mut max-w-[20rem] text-[0.9rem]">Sim racing gear for people who chase tenths.</p>
        </div>
        {([["SHOP", [["GT Pro", "/"], ["Full lineup", "/lineup"], ["Specs", "/the-rig"]]],
          ["SUPPORT", [["Track order", "/track"], ["FAQ", "/faq"], ["Contact", "mailto:support@apexrig.example"]]],
          ["COMPANY", [["Reviews", "/reviews"], ["Instagram", "#"], ["YouTube", "#"]]]] as const).map(([h, links]) => (
          <div key={h}>
            <h4 className="mono text-[0.6rem] text-mut mb-3.5">{h}</h4>
            {links.map(([t, href]) => (
              <Link key={t} href={href} className="block text-[0.92rem] py-1.5 hover:text-or">{t}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-line mono text-[0.6rem] text-mut tracking-[0.14em]">
        © 2026 APEXRIG · PRIVACY · TERMS
      </div>
    </footer>
  );
}

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        (e.target as HTMLFormElement).reset();
        setDone(true);
        setTimeout(() => setDone(false), 3000);
      }}
      className="flex gap-3 justify-center flex-wrap"
    >
      <input
        type="email"
        required
        placeholder="you@raceday.com"
        aria-label="Email"
        className="bg-white/10 border border-white/20 rounded-xl px-[18px] py-[15px] text-bg text-[0.95rem] min-w-[290px] placeholder:text-mut focus:outline-none focus:border-ye"
      />
      <button type="submit" className={btnClass("grad", "md")}>
        {done ? "Sent ✓" : "Get my code"}
      </button>
    </form>
  );
}
