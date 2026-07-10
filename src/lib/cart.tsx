"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CATALOG } from "./catalog";

type Cart = Record<string, number>;

type CartCtx = {
  cart: Cart;
  count: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toast: string | null;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "apexrig-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = useCallback((next: Cart) => {
    setCart(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout((showToast as unknown as { _h?: number })._h);
    (showToast as unknown as { _h?: number })._h = window.setTimeout(
      () => setToast(null),
      2500
    );
  }, []);

  const add = useCallback(
    (id: string) => {
      if (!CATALOG[id]) return;
      const next = { ...cart, [id]: (cart[id] || 0) + 1 };
      persist(next);
      showToast(`${CATALOG[id].name} added to cart ✓`);
    },
    [cart, persist, showToast]
  );

  const setQty = useCallback(
    (id: string, qty: number) => {
      const next = { ...cart };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      persist(next);
    },
    [cart, persist]
  );

  const clear = useCallback(() => persist({}), [persist]);

  const count = Object.values(cart).reduce((n, q) => n + q, 0);

  return (
    <Ctx.Provider value={{ cart, count, add, setQty, clear, toast }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
