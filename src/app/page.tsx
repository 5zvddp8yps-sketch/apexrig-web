import { btnClass } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Nav, StickyBuy, Toast, AddToCart, NewsletterForm, Footer } from "@/components/chrome";
import { Truck, Rotate, Shield, Lock } from "@/components/icons";

const compat = "LOGITECH G29 / G923 — THRUSTMASTER T300 — FANATEC CSL — MOZA R5 — PC — PS5 — XBOX — ";

const promises = [
  { Icon: Truck, h: "Free express shipping", p: "Dispatched in 24–48h from a regional warehouse. Tracked door-to-door, no surprise fees." },
  { Icon: Rotate, h: "30-day test drive", p: "Not your pace? Send it back within 30 days for a full refund. We email you the label." },
  { Icon: Shield, h: "12-month warranty", p: "Every frame and all adjustment hardware covered for a full year. Parts ship free." },
];

const section = "px-[6vw] py-[100px] max-w-[1200px] mx-auto";

export default function Home() {
  return (
    <>
      <div className="bg-ink text-bg text-center py-2.5 px-4">
        <span className="mono text-[0.62rem] tracking-[0.14em]">
          LAUNCH OFFER · $130 OFF THE GT PRO + FREE EXPRESS SHIPPING · ENDS SUNDAY
        </span>
      </div>

      <Nav />

      {/* HERO */}
      <section id="top" className="grid md:grid-cols-[1fr_1.05fr] gap-14 items-center px-[6vw] pt-[60px] pb-20 max-w-[1200px] mx-auto">
        <Reveal>
          <p className="mono mb-5 text-mut">
            GT PRO · SERIES 045{" "}
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-or mx-1.5 align-middle animate-pulse-dot" />{" "}
            IN STOCK — SHIPS IN 24H
          </p>
          <h1 className="text-[clamp(3.4rem,9vw,6.5rem)]">
            Built to hold<br />the <em className="not-italic grad-text">racing line.</em>
          </h1>
          <p className="text-mut text-[1.12rem] my-6 max-w-lg">
            Race-seat ergonomics on a fixed rigid steel chassis. Zero flex, full adjustability — the cockpit serious sim racers actually keep.
          </p>
          <div className="flex items-center gap-3 mb-5">
            <span className="stars text-[0.95rem]">★★★★★</span>
            <span className="mono text-[0.68rem] text-mut">4.9 / 5 · 1,200+ RACERS</span>
          </div>
          <div className="flex items-baseline gap-3.5 mb-6">
            <span className="text-mut line-through text-[1.3rem]">$649</span>
            <span className="text-[2.8rem] font-bold tracking-tight leading-none">$499</span>
            <span className="self-center bg-ink text-ye mono text-[0.6rem] px-2.5 py-1 rounded-full">SAVE $130</span>
          </div>
          <div className="flex gap-3 flex-wrap mb-4">
            <AddToCart id="gt-fold-pro" label="Add to Cart — $499" size="lg" />
            <a href="/lineup" className={btnClass("ghost", "lg")}>Compare Rigs</a>
          </div>
          <p className="mono text-mut text-[0.6rem] tracking-[0.1em]">
            FREE EXPRESS SHIPPING · 30-DAY RETURNS · 12-MONTH WARRANTY
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-[linear-gradient(90deg,var(--color-or),var(--color-ye))] opacity-[0.28] blur-[44px] -z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/product-pro.png" alt="GT Pro racing simulator cockpit" className="w-full rounded-[20px] aspect-square object-cover shadow-[var(--shadow-warm)]" />
            <span className="absolute top-[18px] left-[18px] mono text-[0.62rem] bg-bg border border-line px-3.5 py-2 rounded-full">01 — BUCKET SEAT</span>
            <span className="absolute bottom-[18px] right-[18px] mono text-[0.62rem] bg-ink text-ye border border-ink px-3.5 py-2 rounded-full">ZERO FLEX</span>
            <div className="absolute -bottom-6 left-6 bg-white border border-line rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-[var(--shadow-warm-sm)]">
              <span className="stars text-[0.95rem]">★★★★★</span>
              <strong className="text-[1.15rem] tracking-tight">4.9</strong>
              <span className="mono text-[0.55rem] text-mut">1,200 REVIEWS</span>
            </div>
          </figure>
        </Reveal>
      </section>

      {/* TRUST STRIP */}
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-3.5 px-[6vw] py-[22px] border-b border-line bg-white/40">
        {([[Truck, "Free express shipping"], [Rotate, "30-day returns"], [Shield, "12-month warranty"], [Lock, "Secure checkout"]] as const).map(
          ([Icon, label], i) => (
            <div key={i} className="flex items-center gap-2.5 text-[0.9rem] font-medium">
              <Icon className="w-5 h-5 text-or" /> {label}
            </div>
          )
        )}
      </div>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-line py-3.5 bg-white">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="mono text-[0.7rem] tracking-[0.18em] text-mut pr-3">{compat}</span>
          <span className="mono text-[0.7rem] tracking-[0.18em] text-mut pr-3">{compat}</span>
        </div>
      </div>

      {/* PROMISE */}
      <Reveal as="section" className={section}>
        <div className="grid md:grid-cols-3 gap-5">
          {promises.map((p) => (
            <div key={p.h} className="bg-white border border-line rounded-[20px] p-[34px_30px] shadow-[var(--shadow-warm-sm)]">
              <p.Icon className="w-[30px] h-[30px] text-or mb-5" />
              <h3 className="text-[1.3rem] mb-2.5">{p.h}</h3>
              <p className="text-mut text-[0.9rem]">{p.p}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* BUY */}
      <Reveal as="section" id="buy" className={section}>
        <div className="grid md:grid-cols-2 border border-line rounded-3xl overflow-hidden bg-white shadow-[var(--shadow-warm)]">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/product-pro.png" alt="GT Pro" className="w-full h-full object-cover" />
          </figure>
          <div className="p-[56px_50px]">
            <p className="mono text-or mb-4">— GT PRO · SERIES 045</p>
            <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Your seat<br />on the grid.</h2>
            <div className="flex items-center gap-2.5 mt-3.5 mb-1">
              <span className="stars">★★★★★</span>
              <span className="mono text-[0.62rem] text-mut">4.9 · 1,200+ RACERS</span>
            </div>
            <p className="text-[2.6rem] font-bold tracking-tight my-3.5 flex items-center gap-3">
              <s className="text-mut font-normal text-[1.3rem]">$649</s> $499
              <span className="bg-ink text-ye mono text-[0.6rem] px-2.5 py-1 rounded-full">SAVE $130</span>
            </p>
            <ul className="my-5">
              {["Race-rigid fixed steel chassis — zero flex", "Fits every major wheel & pedal set", "Free express shipping & 30-day returns"].map((li) => (
                <li key={li} className="py-2.5 border-b border-line text-[0.95rem] pl-6 relative">
                  <span className="absolute left-0 text-or font-bold">✓</span>{li}
                </li>
              ))}
            </ul>
            <AddToCart id="gt-fold-pro" label="Add to Cart — $499" size="lg" full />
            <p className="mono text-or text-[0.62rem] text-center mt-3.5">
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-or mr-1.5 align-middle animate-pulse-dot" />
              LOW STOCK — SELLING FAST THIS WEEK
            </p>
            <p className="mono text-mut text-[0.6rem] text-center mt-2">SECURE CHECKOUT · VISA · MASTERCARD · PAYPAL · APPLE PAY</p>
          </div>
        </div>
      </Reveal>

      {/* NEWSLETTER */}
      <Reveal as="section" className={section}>
        <div className="bg-ink text-bg rounded-[28px] py-[70px] px-[8%] text-center">
          <p className="mono text-ye mb-5">— JOIN THE PADDOCK</p>
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] text-bg">$20 off your first rig.</h2>
          <p className="text-[#b8b2a8] mt-3.5 mb-8 max-w-xl mx-auto">Setup guides, early access to drops, and weekly community time trials. One email, no spam.</p>
          <NewsletterForm />
        </div>
      </Reveal>

      <Footer />

      <StickyBuy />
      <Toast />
    </>
  );
}
