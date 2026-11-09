"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Section, Logo } from "./ui";
import { FIGURES, FIGURES_NOTE } from "@/data/content";

const fmt = new Intl.NumberFormat("fr-FR");

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) { if (reduce) setN(to); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  // valeur finale pour lecteurs d’écran et rendu sans JS
  const final = `${prefix}${fmt.format(to)}${suffix}`;
  return (
    <span ref={ref} aria-label={final}>
      <span aria-hidden className="tabular-nums">{prefix}{fmt.format(n)}{suffix}</span>
    </span>
  );
}

export default function KeyFigures() {
  const [hero, ...rest] = FIGURES;
  return (
    <Section id="figures" title="Des stratégies pensées pour produire des résultats mesurables." className="bg-surface/40" wide>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        <div className="bg-accent p-8 md:col-span-2 md:p-12">
          <p className="text-[clamp(3.5rem,11vw,7rem)] font-semibold leading-none tracking-[-0.04em]">
            <Counter to={hero.value} prefix={hero.prefix} suffix={hero.suffix} />
          </p>
          <p className="mt-4 text-lg font-medium text-white/90">{hero.label}</p>
        </div>
        {rest.map((f) => (
          <div key={f.label} className="flex flex-col justify-between gap-8 bg-bg p-8 md:p-10">
            <div className="flex gap-2">
              {f.logos.map((l) => <Logo key={l} name={l} size={40} />)}
            </div>
            <div>
              <p className="text-6xl font-semibold leading-none tracking-[-0.04em] md:text-7xl">
                <Counter to={f.value} />
              </p>
              <p className="mt-3 max-w-xs text-base text-mute">{f.label}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mute">{FIGURES_NOTE}</p>
    </Section>
  );
}
