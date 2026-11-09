import { Section, Logo } from "./ui";
import { EXPERIENCE } from "@/data/content";

export default function Experience() {
  return (
    <Section id="experience" title={EXPERIENCE.title} wide>
      <p className="-mt-6 mb-12 max-w-2xl text-lg text-mute">{EXPERIENCE.intro}</p>
      <ul className="border-t border-line">
        {EXPERIENCE.sectors.map((s) => (
          <li key={s.sector} className="grid gap-x-8 gap-y-4 border-b border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-center">
            <h3 className="text-lg font-semibold tracking-tight text-gold">{s.sector}</h3>
            <ul className="flex flex-wrap gap-3">
              {s.brands.map((b) => (
                <li key={b.name} className="flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-2 pr-5">
                  {b.logo ? (
                    <Logo name={b.logo} size={36} className="!rounded-full" />
                  ) : (
                    <span aria-hidden className="ml-2 h-2 w-2 rounded-full bg-gold" />
                  )}
                  <span className="leading-tight">
                    <span className="block text-[0.95rem] font-medium">{b.name}</span>
                    {b.note && <span className="block text-xs text-mute">{b.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-mute">{EXPERIENCE.outro}</p>
    </Section>
  );
}
