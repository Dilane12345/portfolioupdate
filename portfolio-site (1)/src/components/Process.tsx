import { Section } from "./ui";
import { PROCESS } from "@/data/content";

export default function Process() {
  return (
    <Section id="process" title="De la réflexion stratégique à l’optimisation des performances." className="bg-surface/40" wide>
      <ol className="relative mx-auto max-w-3xl lg:mx-0 lg:ml-auto lg:max-w-4xl">
        <span aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line" />
        {PROCESS.map((s) => (
          <li key={s.n} className="relative grid grid-cols-[2.8rem_1fr] gap-5 pb-10 last:pb-0 md:gap-8">
            <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-bg text-sm font-semibold">
              {s.n}
            </span>
            <div className="pt-1.5">
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-mute">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
