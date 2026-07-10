import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Nav, Toast, Footer } from "@/components/chrome";

export const metadata: Metadata = { title: "Reviews — APEXRIG" };

const reviews = [
  { init: "MT", name: "Marcus T.", set: "iRacing · Logitech G923", q: "Went from a desk clamp to this and instantly found 1.5 seconds at Spa. Nothing moves except the car." },
  { init: "SL", name: "Sofia L.", set: "ACC · Fanatec CSL DD", q: "Built like it costs twice as much. Zero flex under my Fanatec DD, and setup took me twenty minutes flat." },
  { init: "DK", name: "Dan K.", set: "Le Mans Ultimate · Moza R9", q: "The seat is genuinely comfortable for four-hour endurance stints. Shipping was fast and it arrived perfect." },
];

const section = "px-[6vw] py-[100px] max-w-[1200px] mx-auto";

export default function Reviews() {
  return (
    <>
      <Nav />
      <section className={section}>
        <Reveal>
          <div className="flex justify-between items-end gap-8 flex-wrap">
            <div>
              <p className="mono text-or mb-5">— FROM THE GRID</p>
              <h1 className="text-[clamp(2.6rem,6vw,5rem)]">Racers don&apos;t<br />hold back.</h1>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="stars text-[1.5rem]">★★★★★</span>
              <div>
                <strong className="text-[2.4rem] font-bold tracking-tight leading-none block">4.9</strong>
                <span className="mono text-[0.6rem] text-mut">1,200+ VERIFIED REVIEWS</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Stagger className="grid md:grid-cols-3 gap-5 mt-12">
          {reviews.map((r) => (
            <StaggerItem key={r.init} className="bg-white border border-line rounded-[20px] p-[30px_26px] flex flex-col gap-4 shadow-[var(--shadow-warm-sm)] h-full">
              <span className="stars">★★★★★</span>
              <p className="text-[0.98rem] leading-[1.55] flex-1">&ldquo;{r.q}&rdquo;</p>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[linear-gradient(90deg,var(--color-or),var(--color-ye))] text-[#1a1000] grid place-items-center font-bold text-[0.82rem] shrink-0">{r.init}</span>
                <div className="flex-1 min-w-0">
                  <strong className="block text-[0.9rem] mb-0.5">{r.name}</strong>
                  <span className="mono text-[0.56rem] text-mut tracking-[0.06em] normal-case">{r.set}</span>
                </div>
                <span className="text-[#16a34a] text-[0.54rem] tracking-[0.1em] shrink-0 self-start font-mono">✓ VERIFIED</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <Footer />
      <Toast />
    </>
  );
}
