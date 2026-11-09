"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { Section, Logo } from "./ui";
import { PROJECTS, type Project } from "@/data/projects";
import { SHOW_PLACEHOLDERS } from "@/lib/site";

const span = (i: number) => (i < 2 ? "lg:col-span-3" : "lg:col-span-2");

function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: (p: Project, el: HTMLElement) => void }) {
  return (
    <article className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface ${span(i)}`}>
      <div className="relative flex h-36 items-center justify-between px-6" style={{ background: p.brand }}>
        <Logo name={p.logo} size={72} className="shadow-lg" />
        <p className="max-w-[55%] text-right text-sm font-medium text-white/90">{p.client}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex gap-2"><dt className="w-20 shrink-0 text-mute">Secteur</dt><dd>{p.sector}</dd></div>
          <div className="flex gap-2"><dt className="w-20 shrink-0 text-mute">Objectif</dt><dd>{p.objective}</dd></div>
          <div className="flex gap-2"><dt className="w-20 shrink-0 text-mute">Plateformes</dt><dd>{p.platforms}</dd></div>
        </dl>
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-5xl font-semibold leading-none tracking-[-0.04em]">{p.headline.value}</p>
          <p className="mt-2 text-sm text-mute">{p.headline.label}</p>
        </div>
        <div className="mt-auto pt-7">
        <button
          type="button"
          onClick={(e) => onOpen(p, e.currentTarget)}
          className="inline-flex w-full items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:bg-accent"
          aria-label={`Voir l’étude de cas : ${p.client}, ${p.name}`}
        >
          Voir l’étude de cas
        </button>
        </div>
      </div>
    </article>
  );
}

function CaptureBlock({ c }: { c: Project["captures"][number] }) {
  if (!c.src) {
    if (!SHOW_PLACEHOLDERS) return null;
    return (
      <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line p-6 text-center text-sm text-mute">
        <ImagePlus size={22} aria-hidden />
        <p>{c.caption} : capture à ajouter</p>
        <p className="text-xs">public/images/captures</p>
      </div>
    );
  }
  return (
    <figure className={c.portrait ? "mx-auto max-w-[260px]" : ""}>
      <div className="relative overflow-hidden rounded-xl border border-line">
        <Image src={c.src} alt={c.alt} width={c.w!} height={c.h!} sizes="(min-width: 768px) 560px, 90vw" className="h-auto w-full" />
        {c.highlight && (
          <span
            aria-hidden
            className="pointer-events-none absolute rounded-md ring-2 ring-accent-soft"
            style={{ left: `${c.highlight.x}%`, top: `${c.highlight.y}%`, width: `${c.highlight.w}%`, height: `${c.highlight.h}%` }}
          />
        )}
      </div>
      <figcaption className="mt-2 text-xs text-mute">{c.caption}</figcaption>
    </figure>
  );
}

function Detail({ p, onClose, closeRef }: { p: Project; onClose: () => void; closeRef: React.RefObject<HTMLButtonElement | null> }) {
  const hasCapture = p.captures.some((c) => c.src || SHOW_PLACEHOLDERS);
  return (
    <>
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-line bg-surface/95 px-5 py-4 backdrop-blur md:px-8">
        <Logo name={p.logo} size={48} />
        <div className="min-w-0 flex-1">
          <h3 id="modal-title" className="truncate text-lg font-semibold leading-tight md:text-xl">{p.name}</h3>
          <p className="truncate text-sm text-mute">{p.client}</p>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Fermer l’étude de cas" className="rounded-full border border-line p-2 transition-colors hover:border-accent-soft">
          <X size={18} />
        </button>
      </div>
      <div className="space-y-10 px-5 py-8 md:px-8 md:py-10">
        <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          <div><dt className="text-mute">Secteur</dt><dd className="font-medium">{p.sector}</dd></div>
          <div><dt className="text-mute">Objectif</dt><dd className="font-medium">{p.objective}</dd></div>
          <div><dt className="text-mute">Plateformes</dt><dd className="font-medium">{p.platforms}</dd></div>
          {p.period && <div><dt className="text-mute">Durée</dt><dd className="font-medium">{p.period}</dd></div>}
        </dl>

        {p.context && (
          <div>
            <h4 className="text-lg font-semibold">Contexte</h4>
            <div className="mt-3 space-y-3 text-pretty leading-relaxed text-ink/80">{p.context.map((t) => <p key={t}>{t}</p>)}</div>
          </div>
        )}
        <div>
          <h4 className="text-lg font-semibold">Mon intervention</h4>
          <p className="mt-3 text-pretty leading-relaxed text-ink/80">{p.intervention}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Résultats</h4>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line">
            {p.results.map((r) => (
              <li key={r.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4">
                <span className="font-medium">{r.label}</span>
                <span className="text-right">
                  <span className="text-2xl font-semibold tracking-tight">{r.value}</span>
                  {r.detail && <span className="block text-sm text-mute">{r.detail}</span>}
                </span>
              </li>
            ))}
            {p.total && (
              <li className="flex items-baseline justify-between gap-6 bg-accent px-5 py-4">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-semibold tracking-tight">{p.total.value} <span className="text-base font-medium">{p.total.label.replace(/^\d+\s*/, "")}</span></span>
              </li>
            )}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-mute">{p.disclaimer}</p>
        </div>

        {hasCapture && (
          <div>
            <h4 className="text-lg font-semibold">Preuves de résultats</h4>
            <div className="mt-4 space-y-4">{p.captures.map((c) => <CaptureBlock key={c.alt} c={c} />)}</div>
          </div>
        )}

        <div className="border-l-2 border-accent pl-5">
          <h4 className="text-lg font-semibold">Enseignement</h4>
          <p className="mt-2 text-pretty leading-relaxed text-ink/80">{p.lesson}</p>
        </div>

        <a href="#contact" onClick={onClose} className="inline-flex rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover">
          Discuter d’un projet similaire
        </a>
      </div>
    </>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const onOpen = useCallback((p: Project, el: HTMLElement) => { trigger.current = el; setOpen(p); }, []);
  const onClose = useCallback(() => { setOpen(null); }, []);

  useEffect(() => {
    if (!open) { trigger.current?.focus?.(); return; }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <Section id="projects" title="Des campagnes, des résultats, des enseignements." wide>
      <div className="grid gap-5 lg:grid-cols-6">
        {PROJECTS.map((p, i) => <Card key={p.id} p={p} i={i} onOpen={onOpen} />)}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mute">
        Résultats correspondant à des performances publicitaires mesurées : ils ne constituent pas nécessairement des ventes ou des participations finales.
        Campagnes réalisées au sein de MMA Digital Agency.
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 md:items-center md:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          >
            <motion.div
              ref={panel}
              role="dialog" aria-modal="true" aria-labelledby="modal-title"
              className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-surface md:rounded-3xl"
              initial={{ y: reduce ? 0 : 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: reduce ? 0 : 30, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Detail p={open} onClose={onClose} closeRef={closeRef} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
