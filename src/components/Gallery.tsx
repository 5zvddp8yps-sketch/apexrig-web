"use client";

import { useState } from "react";

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <figure className="relative">
        <div className="absolute -inset-6 rounded-[32px] bg-[linear-gradient(90deg,var(--color-or),var(--color-ye))] opacity-[0.22] blur-[38px] -z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          className="w-full rounded-[24px] aspect-square object-cover shadow-[var(--shadow-warm)] bg-white"
        />
      </figure>
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2.5 mt-3.5">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View ${i + 1}`}
              className={`rounded-xl overflow-hidden aspect-square border transition ${
                i === active ? "border-or ring-1 ring-or" : "border-line hover:border-or"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover bg-white" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
