export function btnClass(
  variant: "solid" | "ghost" | "grad" = "solid",
  size: "md" | "lg" | "sm" = "md"
) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors cursor-pointer text-center";
  const sizes = {
    md: "px-8 py-3.5 text-[0.95rem]",
    lg: "px-11 py-4 text-base",
    sm: "px-5 py-2.5 text-[0.82rem]",
  };
  const variants = {
    solid: "bg-ink text-bg hover:bg-or",
    ghost: "bg-transparent border border-line text-ink hover:border-or hover:text-or",
    grad: "text-[#1a1000] bg-[linear-gradient(90deg,var(--color-or),var(--color-ye))] hover:opacity-90",
  };
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
