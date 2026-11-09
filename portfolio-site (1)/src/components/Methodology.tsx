"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./ui";
import { PILLARS } from "@/data/content";

const R = 36;
const pos = (i: number) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
};

export default function Methodology() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const pts = PILLARS.map((_, i) => pos(i));
  const poly = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Section id="methodology" title="Les 5 piliers d’une campagne publicitaire performante." wide>
      <p className="-mt-6 mb-12 max-w-2xl text-lg text-mute">
        La performance publicitaire n’est jamais le fruit du hasard. Elle résulte de la cohérence entre plusieurs
        facteurs stratégiques, créatifs et financiers.
      </p>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx="50" cy="50" r="47" fill="none" stroke="#18214a" strokeDasharray="0.6 2" />
            <polygon points={poly} fill="none" stroke="#1f2b58" strokeWidth="0.35" />
            {pts.map((p, i) => (
              <motion.line
                key={i}
                x1="50" y1="50" x2={p.x} y2={p.y}
                stroke={i === active ? "#3f5cff" : "#2b3a78"}
                strokeWidth={i === active ? 0.7 : 0.35}
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, delay: reduce ? 0 : i * 0.12 }}
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-center text-[clamp(0.55rem,1.9vw,0.8rem)] font-semibold tracking-wider">
            PERFORMANCE
          </div>
          {PILLARS.map((p, i) => (
            <button
              key={p.n}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`${p.n} — ${p.title}`}
              className={`absolute flex h-[17%] w-[17%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center transition-colors ${
                active === i ? "border-accent bg-[#14226b]" : "border-line bg-surface hover:border-accent-soft"
              }`}
              style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
            >
              <span className="text-[clamp(0.7rem,2.4vw,1rem)] font-semibold leading-none">{p.n}</span>
              <span className="mt-0.5 text-[clamp(0.45rem,1.5vw,0.65rem)] leading-none text-mute">{p.short}</span>
            </button>
          ))}
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {PILLARS.map((p, i) => (
            <li key={p.n}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group grid w-full grid-cols-[2.5rem_1fr] gap-x-2 py-5 text-left"
                aria-current={active === i}
              >
                <span className={`text-lg font-semibold ${active === i ? "text-gold" : "text-mute"}`}>{p.n}</span>
                <span>
                  <span className={`block text-lg font-medium transition-colors ${active === i ? "text-ink" : "text-ink/70"}`}>{p.title}</span>
                  <span className={`mt-1 block text-pretty text-[0.95rem] leading-relaxed transition-colors ${active === i ? "text-ink/80" : "text-mute"}`}>{p.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
