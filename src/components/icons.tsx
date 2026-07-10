type P = { className?: string };
const base = "stroke-current";

export const Truck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className={`${base} ${className ?? ""}`}>
    <path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.7" /><circle cx="17.5" cy="18" r="1.7" />
  </svg>
);
export const Rotate = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className={`${base} ${className ?? ""}`}>
    <path d="M20 11a8 8 0 1 0-2 6" /><path d="M20 5v5h-5" />
  </svg>
);
export const Shield = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className={`${base} ${className ?? ""}`}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
export const Lock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className={`${base} ${className ?? ""}`}>
    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const Seat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} className={`${base} ${className ?? ""}`}>
    <path d="M8 4h3a3 3 0 0 1 3 3v7H8z" /><path d="M8 14l-1 6M14 14l1 6" /><path d="M14 10h3a2 2 0 0 1 2 2v2" />
  </svg>
);
export const Sliders = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} className={`${base} ${className ?? ""}`}>
    <path d="M4 7h16M4 12h16M4 17h16" />
    <circle cx="9" cy="7" r="2.2" className="fill-bg" />
    <circle cx="15" cy="12" r="2.2" className="fill-bg" />
    <circle cx="8" cy="17" r="2.2" className="fill-bg" />
  </svg>
);
export const Cube = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} className={`${base} ${className ?? ""}`}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 3v18M4 7.5l8 4.5 8-4.5" />
  </svg>
);
export const Plug = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} className={`${base} ${className ?? ""}`}>
    <path d="M9 3v5M15 3v5" /><path d="M7 8h10v3a5 5 0 0 1-10 0z" /><path d="M12 16v5" />
  </svg>
);
