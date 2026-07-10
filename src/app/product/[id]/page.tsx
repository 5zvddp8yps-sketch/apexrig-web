import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATALOG, CATALOG_LIST, money, gallery } from "@/lib/catalog";
import { Nav, Toast, AddToCart } from "@/components/chrome";
import { Reveal } from "@/components/motion";
import Gallery from "@/components/Gallery";

export function generateStaticParams() {
  return CATALOG_LIST.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = CATALOG[id];
  return { title: p ? `${p.name} — APEXRIG` : "APEXRIG" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = CATALOG[id];
  if (!p) notFound();

  return (
    <>
      <Nav />
      <section className="grid md:grid-cols-[1.05fr_0.95fr] gap-16 items-center px-[6vw] pt-[70px] pb-[100px] max-w-[1200px] mx-auto">
        <Reveal>
          <Gallery images={gallery(p)} name={p.name} />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mono text-or mb-4">— {p.series}</p>
          <h1 className="text-[clamp(2.6rem,5.5vw,4.4rem)]">{p.name}</h1>
          <p className="text-[1.2rem] font-medium mt-3.5 mb-2.5">{p.tag}</p>
          <p className="text-mut max-w-md">{p.desc}</p>
          <div className="border-t border-line mt-7 mb-2">
            {p.specs.map(([k, v]) => (
              <div key={k} className="flex justify-between items-baseline py-[18px] px-1 border-b border-line">
                <span className="mono text-mut">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
          <p className="text-[2.6rem] font-bold tracking-tight my-4 flex items-center gap-3">
            {p.was && <s className="text-mut font-normal text-[1.3rem]">{money(p.was)}</s>}
            {money(p.price)}
          </p>
          <AddToCart id={p.id} label={`Add to Cart — ${money(p.price)}`} size="lg" full />
          <p className="mono text-mut text-[0.6rem] text-center mt-3">FREE SHIPPING · 30-DAY RETURNS · 12-MONTH WARRANTY</p>
        </Reveal>
      </section>

      <section className="px-[6vw] pb-[100px] max-w-[1100px] mx-auto">
        <p className="mono text-or mb-8 text-center">— THE REST OF THE GRID</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATALOG_LIST.filter((o) => o.id !== p.id).map((o) => (
            <Link key={o.id} href={`/product/${o.id}`} className="bg-white border border-line rounded-2xl p-5 grid gap-1.5 transition-transform hover:-translate-y-1 hover:border-or">
              <span className="mono text-mut text-[0.6rem]">{o.series}</span>
              <strong className="text-[1.05rem]">{o.name}</strong>
              <span className="mono">{money(o.price)}</span>
            </Link>
          ))}
        </div>
      </section>
      <Toast />
    </>
  );
}
