import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Nav, Toast, Footer } from "@/components/chrome";
import { Seat, Sliders, Cube, Plug } from "@/components/icons";
import Cockpit3DSection from "@/components/Cockpit3DSection";

export const metadata: Metadata = { title: "The Rig — APEXRIG" };

const features = [
  { n: "01", Icon: Seat, h: "Pro ergonomics", p: "A genuine bucket-style race seat with high bolsters. Hours in, zero fatigue." },
  { n: "02", Icon: Sliders, h: "Dial it in", p: "Wheel height and reach, pedal angle and distance, seat recline. Your exact driving position, locked in." },
  { n: "03", Icon: Cube, h: "Zero flex", p: "Powder-coated steel chassis. No wobble at 900°, no shift under braking." },
  { n: "04", Icon: Plug, h: "Fits everything", p: "Universal pre-drilled plates. Logitech, Thrustmaster, Fanatec, Moza. 20-minute setup." },
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

const section = "px-[6vw] py-[100px] max-w-[1200px] mx-auto";

export default function TheRig() {
  return (
    <>
      <Nav />

      <section className="px-[6vw] pt-[70px] pb-10 max-w-[1200px] mx-auto">
        <p className="mono text-or mb-5">— THE RIG</p>
        <h1 className="text-[clamp(2.6rem,6vw,5rem)]">Built to hold<br />the racing line.</h1>
      </section>

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
        </div>
      </Reveal>

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

      <Cockpit3DSection />

      <Reveal as="section" className={`${section} max-w-[820px]`} id="specs">
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

      <Footer />
      <Toast />
    </>
  );
}
