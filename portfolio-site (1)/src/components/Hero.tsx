"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MessageSquare } from "lucide-react";
import { SITE } from "@/lib/site";

const BARS = [14, 22, 19, 33, 44, 58, 76, 100];
const PTS = BARS.map((b, i) => [14 + i * 36, 262 - b * 2.35 - 14] as const);
const PATH = PTS.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");

function Composition() {
  const reduce = useReducedMotion();
  const d = (n: number) => (reduce ? 0 : n);
  return (
    <svg viewBox="0 0 300 280" className="h-full w-full" role="img" aria-label="Illustration : courbe de croissance des résultats publicitaires">
      <line x1="0" y1="266" x2="300" y2="266" stroke="#1f2b58" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1="0" x2="300" y1={70 + i * 66} y2={70 + i * 66} stroke="#18214a" strokeDasharray="2 6" />
      ))}
      {BARS.map((b, i) => (
        <motion.rect
          key={i}
          x={14 + i * 36 - 11}
          width="22"
          rx="4"
          fill={i === BARS.length - 1 ? "#3f5cff" : "#16204a"}
          initial={{ height: reduce ? b * 2.35 : 0, y: reduce ? 266 - b * 2.35 : 266 }}
          animate={{ height: b * 2.35, y: 266 - b * 2.35 }}
          transition={{ duration: 0.7, delay: d(0.5 + i * 0.07), ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      <motion.path
        d={PATH}
        fill="none"
        stroke="#d4a853"
        strokeWidth="1.8"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, delay: d(0.9), ease: "easeInOut" }}
      />
      {PTS.map((p, i) => (
        <motion.circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r={i === PTS.length - 1 ? 5 : 3}
          fill={i === PTS.length - 1 ? "#fff" : "#0a0e1c"}
          stroke="#d4a853"
          strokeWidth="1.6"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d(1 + i * 0.15) }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <section id="top" aria-labelledby="hero-title" className="grid-dots relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.h1 id="hero-title" {...rise(0)} className="text-[clamp(3rem,10vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            Tedonki
            <br />
            Nguimtsa
          </motion.h1>
          <motion.p {...rise(0.15)} className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-gold md:text-base">
            Media Buyer &amp; Digital Acquisition Strategist
          </motion.p>
          <motion.p {...rise(0.3)} className="mt-6 max-w-xl text-xl italic leading-snug text-ink/90 md:text-2xl">
            “{SITE.signature}”
          </motion.p>
          <motion.p {...rise(0.4)} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-mute md:text-lg">
            J’accompagne les entrepreneurs et les entreprises dans la conception et le déploiement de stratégies
            publicitaires orientées vers l’acquisition et la performance.
          </motion.p>
          <motion.p {...rise(0.45)} className="mt-4 max-w-xl text-pretty text-base text-ink/85 md:text-lg">
            <span className="mr-2 inline-block h-px w-6 translate-y-[-0.25em] bg-gold align-middle" aria-hidden />
            Plus d’un an de campagnes en agence, sur des secteurs très différents.
          </motion.p>
          <motion.div {...rise(0.5)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-white transition-colors hover:bg-accent-hover">
              Explorer mes projets <ArrowDown size={18} aria-hidden />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium transition-colors hover:border-accent-soft hover:bg-surface">
              Discuter d’un projet <MessageSquare size={18} aria-hidden />
            </a>
          </motion.div>
        </div>
        <div className="relative mx-auto aspect-[300/280] w-full max-w-md lg:max-w-none">
          <Composition />
          <motion.span {...rise(1.6)} className="absolute left-0 top-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-mute">Meta Ads</motion.span>
          <motion.span {...rise(1.75)} className="absolute left-[34%] top-0 rounded-full border border-line bg-surface px-3 py-1 text-xs text-mute">TikTok Ads</motion.span>
          <motion.span {...rise(1.9)} className="absolute right-[14%] top-[-2%] rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">Acquisition</motion.span>
        </div>
      </div>
    </section>
  );
}
