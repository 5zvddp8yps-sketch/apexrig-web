export type Product = {
  id: string;
  name: string;
  series: string;
  price: number;
  was?: number;
  tag: string;
  desc: string;
  img: string;
  specs: [string, string][];
  angles?: number; // number of gallery images: img, img-2 … img-N
};

// Build gallery paths from the hero image + angle count.
export function gallery(p: Product): string[] {
  const n = p.angles ?? 1;
  if (n <= 1) return [p.img];
  const base = p.img.replace(/\.png$/, "");
  return [p.img, ...Array.from({ length: n - 1 }, (_, i) => `${base}-${i + 2}.png`)];
}

export const CATALOG: Record<string, Product> = {
  "gt-fold-one": {
    id: "gt-fold-one",
    name: "GT-Fold One",
    series: "SERIES 015",
    price: 249,
    tag: "Your first real cockpit.",
    desc: "Everything you need to get off the desk clamp: a foldable steel frame, comfortable leather-look seat, and universal wheel & pedal plates.",
    img: "/images/product-one.png",
    specs: [["SEAT", "Fixed sport seat"], ["FOLD", "Tool-free, flat"], ["RATED FOR", "Belt-driven wheels"]],
    angles: 6,
  },
  "gt-fold-sport": {
    id: "gt-fold-sport",
    name: "GT-Fold Sport",
    series: "SERIES 030",
    price: 379,
    tag: "More laps, more comfort.",
    desc: "Adds a reclining seat, height-adjustable wheel deck and a stiffer rail — and still folds flat when the race is over.",
    img: "/images/product-sport.png",
    specs: [["SEAT", "Reclining sport seat"], ["FOLD", "Tool-free, flat"], ["RATED FOR", "Belt-driven wheels"]],
    angles: 6,
  },
  "gt-fold-pro": {
    id: "gt-fold-pro",
    name: "GT Pro",
    series: "SERIES 045",
    price: 499,
    was: 649,
    tag: "Zero flex. Full control.",
    desc: "A genuine bucket seat on a fixed rigid steel chassis with full adjustability — wheel, pedals and recline.",
    img: "/images/product-pro.png",
    specs: [["SEAT", "Bucket, suede-touch"], ["ADJUST", "Wheel, pedals, recline"], ["RATED FOR", "All FFB wheels"]],
    angles: 6,
  },
  "gt-fold-elite": {
    id: "gt-fold-elite",
    name: "GT Elite",
    series: "SERIES 060",
    price: 749,
    tag: "Direct-drive ready.",
    desc: "A reinforced fixed chassis and alloy pedal plate built to hold zero flex under high-torque direct-drive wheels.",
    img: "/images/product-elite.png",
    specs: [["SEAT", "Bucket, reinforced"], ["CHASSIS", "DD-rated steel"], ["RATED FOR", "Direct drive 25 Nm"]],
    angles: 6,
  },
  "gt-fold-apex": {
    id: "gt-fold-apex",
    name: "GT Apex",
    series: "SERIES 090",
    price: 1099,
    tag: "The flagship. No excuses left.",
    desc: "Our top rig: an orange-accented sport shell seat, heavy reinforced chassis and a full integrated monitor mount — the complete cockpit, wheel-deck to screen, in one premium package.",
    img: "/images/product-apex.png",
    specs: [["SEAT", "Sport shell · orange accents"], ["EXTRAS", "Integrated monitor mount"], ["CHASSIS", "Heavy reinforced steel"], ["RATED FOR", "Direct drive 25 Nm+"]],
    angles: 6,
  },
};

export const CATALOG_LIST = Object.values(CATALOG);
export const money = (n: number) => "$" + n.toLocaleString("en-US");
