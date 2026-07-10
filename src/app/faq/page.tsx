import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { Nav, Toast, Footer } from "@/components/chrome";

export const metadata: Metadata = { title: "FAQ — APEXRIG" };

const faqs: [string, string][] = [
  ["Will my wheel and pedals fit?", "Yes — universal pre-drilled patterns cover Logitech G29/G920/G923, Thrustmaster T248/T300/TX, Fanatec CSL and Moza R5/R9. Hardware included."],
  ["Do any models fold away?", "The GT-Fold One and GT-Fold Sport fold flat in under 30 seconds without tools. The GT Pro, Elite and Apex use fixed chassis for maximum rigidity."],
  ["How long is assembly?", "Around 20 minutes, one person, tools and illustrated guide included."],
  ["How fast is shipping?", "Dispatch in 24–48 h from a regional warehouse. Tracked express, typically 3–7 business days."],
  ["What if it's not for me?", "30-day returns, no questions asked. We email you a label."],
  ["Warranty?", "12 months on the frame and all adjustment hardware. Replacement parts ship free."],
];

const section = "px-[6vw] py-[100px] max-w-[1200px] mx-auto";

export default function Faq() {
  return (
    <>
      <Nav />
      <Reveal as="section" className={`${section} max-w-[820px]`}>
        <p className="mono text-or mb-5">— FAQ</p>
        <h1 className="text-[clamp(2.6rem,6vw,5rem)] mb-8">Questions,<br />answered.</h1>
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
      <Footer />
      <Toast />
    </>
  );
}
