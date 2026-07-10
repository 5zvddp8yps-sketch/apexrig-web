import Link from "next/link";
import type { Metadata } from "next";
import { CATALOG_LIST, money } from "@/lib/catalog";
import { btnClass } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Nav, Toast, Footer } from "@/components/chrome";

export const metadata: Metadata = { title: "Lineup — APEXRIG" };

const section = "px-[6vw] py-[100px] max-w-[1200px] mx-auto";

export default function Lineup() {
  return (
    <>
      <Nav />
      <section className={section}>
        <Reveal>
          <p className="mono text-or mb-5">— THE LINEUP</p>
          <h1 className="text-[clamp(2.6rem,6vw,5rem)]">Five rigs. One obsession.</h1>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {CATALOG_LIST.map((p) => {
            const hot = p.id === "gt-fold-pro";
            return (
              <StaggerItem key={p.id} className="h-full">
                <div className={`h-full rounded-[20px] border p-[18px_18px_24px] flex flex-col gap-2.5 transition-transform hover:-translate-y-1.5 ${hot ? "bg-ink text-bg border-ink" : "bg-white border-line"}`}>
                  <div className={`rounded-[12px] overflow-hidden aspect-square mb-1 ${hot ? "bg-white/5" : "bg-bg"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className={`mono text-[0.6rem] ${hot ? "text-ye" : "text-mut"}`}>{p.series}{hot ? " · MOST POPULAR" : ""}</p>
                  <h3 className="text-[1.4rem]">{p.name}</h3>
                  <p className={`text-[0.82rem] flex-1 ${hot ? "text-[#b8b2a8]" : "text-mut"}`}>{p.desc}</p>
                  <p className="text-[1.5rem] font-bold tracking-tight">
                    {p.was && <s className="text-mut font-normal text-[0.95rem] mr-1.5">{money(p.was)}</s>}
                    {money(p.price)}
                  </p>
                  <Link href={`/product/${p.id}`} className={`${btnClass(hot ? "grad" : "ghost", "sm")} w-full`}>View Rig</Link>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
      <Footer />
      <Toast />
    </>
  );
}
