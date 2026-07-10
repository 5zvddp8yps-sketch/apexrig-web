"use client";

import dynamic from "next/dynamic";

const Cockpit3D = dynamic(() => import("./Cockpit3D"), {
  ssr: false,
  loading: () => (
    <div className="grid place-items-center h-full text-mut mono text-[0.7rem]">
      LOADING 3D MODEL…
    </div>
  ),
});

export default function Cockpit3DSection() {
  return (
    <section className="px-[6vw] py-[100px] max-w-[1200px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
        <div>
          <p className="mono text-or mb-5">— SPIN IT</p>
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)]">Every angle.<br />Yours to explore.</h2>
        </div>
        <p className="mono text-mut text-[0.62rem] max-w-[16rem]">
          DRAG TO ROTATE · SCROLL TO ZOOM · INTERACTIVE 3D MODEL
        </p>
      </div>
      <div className="relative rounded-[24px] border border-line bg-white/50 overflow-hidden aspect-[16/10] md:aspect-[2/1] shadow-[var(--shadow-warm-sm)]">
        <div className="absolute inset-0">
          <Cockpit3D />
        </div>
        <span className="absolute top-5 left-5 mono text-[0.6rem] bg-bg/80 backdrop-blur border border-line px-3.5 py-2 rounded-full pointer-events-none">
          GT PRO · 3D
        </span>
        <span className="absolute bottom-5 right-5 mono text-[0.6rem] bg-ink text-ye px-3.5 py-2 rounded-full pointer-events-none">
          360° VIEW
        </span>
      </div>
    </section>
  );
}
