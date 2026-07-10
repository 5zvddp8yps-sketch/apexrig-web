import Link from "next/link";
import { CATALOG_LIST, money } from "@/lib/catalog";
import { btnClass } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Nav, StickyBuy, Toast, AddToCart, NewsletterForm } from "@/components/chrome";
import { Truck, Rotate, Shield, Lock, Seat, Sliders, Cube, Plug } from "@/components/icons";
import Cockpit3DSection from "@/components/Cockpit3DSection";

const compat = "LOGITECH G29 / G923 — THRUSTMASTER T300 — FANATEC CSL — MOZA R5 — PC — PS5 — XBOX — ";

const features = [
  { n: "01", Icon: Seat, h: "Pro ergonomics", p: "A genuine bucket-style race seat with high bolsters. Hours in, zero fatigue." },
  { n: "02", Icon: Sliders, h: "Dial it in", p: "Wheel height and reach, pedal angle and distance, seat recline. Your exact driving position, locked in." },
  { n: "03", Icon: Cube, h: "Zero flex", p: "Powder-coated steel chassis. No wobble at 900°, no shift under braking." },
  { n: "04", Icon: Plug, h: "Fits everything", p: "Universal pre-drilled plates. Logitech, Thrustmaster, Fanatec, Moza. 20-minute setup." },
];

const reviews = [
  { init: "MT", name: "Marcus T.", set: "iRacing · Logitech G923", q: "Went from a desk clamp to this and instantly found 1.5 seconds at Spa. Nothing moves except the car." },
  { init: "SL", name: "Sofia L.", set: "ACC · Fanatec CSL DD", q: "Built like it costs twice as much. Zero flex under my Fanatec DD, and setup took me twenty minutes flat." },
  { init: "DK", name: "Dan K.", set: "Le Mans Ultimate · Moza R9", q: "The seat is genuinely comfortable for four-hour endurance stints. Shipping was fast and it arrived perfect." },
];

const specs: [string, string][] = [
  ["FRAME", "Powder-coated steel"], ["SEAT", "Bucket-style, suede-touch fabric"],
  ["MAX LOAD", "130 kg / 286 lb"], ["WEIGHT", "22 kg / 48 lb"],
  ["WHEEL DECK", "Height + reach adjustable"], ["PEDAL PLATE", "Angle + distance adjustable"],
  ["FOOTPRINT", "118 × 50 cm"], ["ASSEMBLY", "~20 min, tools included"],
];

const details = [
  { img: "detail-headrest.png", cap: "FIG. A — SCULPTED HEADREST" },
  { img: "detail-stitch.png", cap: "FIG. B — DOUBLE-STITCH SEAMS" },
  { img: "detail-mount.png", cap: "FIG. C — UNIVERSAL WHEEL MOUNT" },
  { img: "detail-pedal.png", cap: "FIG. D — ANGLED PEDAL PLATE" },
];

const promises = [
  { Icon: Truck, h: "Free express shipping", p: "Dispatched in 24–48h from a regional warehouse. Tracked door-to-door, no surprise fees." },
  { Icon: Rotate, h: "30-day test drive", p: "Not your pace? Send it back within 30 days for a full refund. We email you the label." },
  { Icon: Shield, h: "12-month warranty", p: "Every frame and all adjustment hardware covered for a full year. Parts ship free." },
];

const faqs: [string, string][] = [
  ["Will my wheel and pedals fit?", "Yes — universal pre-drilled patterns cover Logitech G29/G920/G923, Thrustmaster T248/T300/TX, Fanatec CSL and Moza R5/R9. Hardware included."],
  ["Do any models fold away?", "The GT-Fold One and GT-Fold Sport fold flat in under 30 seconds without tools. The GT Pro, Elite and Apex use fixed chassis for maximum rigidity."],
  ["How long is assembly?", "Around 20 minutes, one person, tools and illustrated guide included."],
  ["How fast is shipping?", "Dispatch in 24–48 h from a regional warehouse. Tracked express, typically 3–7 business days."],
  ["What if it's not for me?", "30-day returns, no questions asked. We email you a label."],
  ["Warranty?", "12 months on the frame and all adjustment hardware. Replacement parts ship free."],
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
            <a href="#lineup" className={btnClass("ghost", "lg")}>Compare Rigs</a>
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

      {/* FEATURES */}
      <section id="rig" className={section}>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-line rounded-[20px] overflow-hidden bg-white shadow-[var(--shadow-warm-sm)]">
          {features.map((f) => (
            <StaggerItem key={f.n} className="p-[38px_30px] border-b lg:border-b-0 lg:border-r border-line last:border-0">
              <f.Icon className="w-[30px] h-[30px] text-or mb-5" />
              <p className="mono text-mut text-[0.6rem] mb-3">{f.n}</p>
              <h3 className="text-[1.25rem] mb-2.5">{f.h}</h3>
              <p className="text-mut text-[0.88rem]">{f.p}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* SPLIT — HARDWARE */}
      <Reveal as="section" className={`${section} grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center`}>
        <figure className="relative">
          <div className="absolute inset-[18px_-18px_-18px_18px] rounded-[20px] bg-[linear-gradient(90deg,var(--color-or),var(--color-ye))] opacity-35 -z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fold.png" alt="Adjustment hardware close-up" className="w-full rounded-[20px] aspect-[4/3] object-cover shadow-[0_24px_60px_rgba(255,92,0,0.18)]" />
        </figure>
        <div>
          <p className="mono text-or mb-5">— THE HARDWARE</p>
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Steel where<br />it counts.</h2>
          <p className="text-mut mt-5 max-w-md">Cast adjustment clamps, a full-length base rail and torque-checked fasteners. Trail-brake, curb-hop, counter-steer — the chassis doesn&apos;t move unless you tell it to.</p>
        </div>
      </Reveal>

      {/* SPLIT — IN THE WILD */}
      <Reveal as="section" className={`${section} grid md:grid-cols-[0.9fr_1.1fr] gap-16 items-center`}>
        <figure className="relative md:order-2">
          <div className="absolute inset-[18px_18px_-18px_-18px] rounded-[20px] bg-[linear-gradient(90deg,var(--color-or),var(--color-ye))] opacity-35 -z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/setup.png" alt="GT Pro in a real setup" className="w-full rounded-[20px] aspect-[4/3] object-cover shadow-[0_24px_60px_rgba(255,92,0,0.18)]" />
        </figure>
        <div className="md:order-1">
          <p className="mono text-or mb-5">— IN THE WILD</p>
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">From spare corner<br />to starting grid.</h2>
          <p className="text-mut mt-5 max-w-md">Adjustable wheel height and reach, angled pedal platform, full recline. Fits racers 150–200 cm, up to 130 kg.</p>
          <a href="#buy" className="inline-block mt-6 text-or font-medium border-b border-current pb-0.5">Claim your grid spot →</a>
        </div>
      </Reveal>

      {/* SHOWROOM */}
      <Reveal as="section" className={section}>
        <p className="mono text-or mb-5">— THE SHOWROOM</p>
        <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">GT Pro, every angle.</h2>
        <p className="text-mut mt-4 max-w-md">Six real shots of the rig you&apos;re buying — no renders, no stock photos.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {[
            ["product-pro.png", "01 · FRONT ¾"],
            ["product-pro-2.png", "02 · SIDE PROFILE"],
            ["product-pro-3.png", "03 · REAR ¾"],
            ["product-pro-4.png", "04 · WHEEL MOUNT"],
            ["product-pro-5.png", "05 · FULL RIG"],
            ["product-pro-6.png", "06 · HEADREST"],
          ].map(([img, cap]) => (
            <div key={img} className="relative rounded-2xl overflow-hidden aspect-square bg-white border border-line group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/${img}`} alt={cap} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute bottom-3 left-3 mono text-[0.58rem] bg-bg/90 backdrop-blur px-3 py-1.5 rounded-full">{cap}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 3D MODEL */}
      <Cockpit3DSection />

      {/* REVIEWS */}
      <section id="reviews" className={section}>
        <Reveal>
          <div className="flex justify-between items-end gap-8 flex-wrap">
            <div>
              <p className="mono text-or mb-5">— FROM THE GRID</p>
              <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Racers don&apos;t<br />hold back.</h2>
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

      {/* SPECS */}
      <Reveal as="section" className={`${section} max-w-[820px]`}>
        <p className="mono text-or mb-5">— SPECIFICATIONS</p>
        <div className="border-t border-line">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between items-baseline py-[18px] px-1 border-b border-line hover:bg-white">
              <span className="mono text-mut">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* DETAILS */}
      <Reveal as="section" className={section}>
        <p className="mono text-or mb-5">— THE DETAILS</p>
        <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Stitched, not printed.</h2>
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {details.map((d) => (
            <figure key={d.img} className="relative rounded-3xl overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/${d.img}`} alt={d.cap} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" />
              <figcaption className="absolute bottom-4 left-4 mono text-[0.62rem] bg-bg/90 backdrop-blur px-3.5 py-[7px] rounded-full">{d.cap}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      {/* LINEUP */}
      <section id="lineup" className={section}>
        <Reveal>
          <p className="mono text-or mb-5">— THE LINEUP</p>
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Five rigs. One obsession.</h2>
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

      {/* FAQ */}
      <Reveal as="section" id="faq" className={`${section} max-w-[820px]`}>
        <p className="mono text-or mb-5">— FAQ</p>
        {faqs.map(([q, a]) => (
          <details key={q} className="border-b border-line py-5 group">
            <summary className="cursor-pointer font-medium text-[1.05rem] flex justify-between list-none">
              {q}
              <span className="text-or group-open:hidden">+</span>
              <span className="text-or hidden group-open:inline">–</span>
            </summary>
            <p className="text-mut mt-3 text-[0.92rem] max-w-[38rem]">{a}</p>
          </details>
        ))}
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

      {/* FOOTER */}
      <footer className="px-[6vw] pt-20 pb-10 border-t border-line">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 max-w-[1200px] mx-auto">
          <div>
            <p className="font-bold text-[1.3rem] mb-3">APEXRIG<sup className="text-or text-[0.55em]">®</sup></p>
            <p className="text-mut max-w-[20rem] text-[0.9rem]">Sim racing gear for people who chase tenths.</p>
          </div>
          {([["SHOP", [["GT Pro", "#buy"], ["Full lineup", "#lineup"], ["Specs", "#specs"]]],
            ["SUPPORT", [["Track order", "/track"], ["FAQ", "#faq"], ["Contact", "mailto:support@apexrig.example"]]],
            ["COMPANY", [["Reviews", "#reviews"], ["Instagram", "#"], ["YouTube", "#"]]]] as const).map(([h, links]) => (
            <div key={h}>
              <h4 className="mono text-[0.6rem] text-mut mb-3.5">{h}</h4>
              {links.map(([t, href]) => (
                <a key={t} href={href} className="block text-[0.92rem] py-1.5 hover:text-or">{t}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-line mono text-[0.6rem] text-mut tracking-[0.14em]">
          © 2026 APEXRIG · PRIVACY · TERMS
        </div>
      </footer>

      <StickyBuy />
      <Toast />
    </>
  );
}
