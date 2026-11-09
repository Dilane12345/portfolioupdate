import { Section } from "./ui";
import { SERVICES } from "@/data/content";

export default function Services() {
  return (
    <Section id="services" title="Transformons vos objectifs commerciaux en stratégies d’acquisition." className="bg-surface/40" wide>
      <p className="-mt-6 mb-12 max-w-2xl text-lg text-mute">
        Que vous souhaitiez générer des prospects, développer votre base d’utilisateurs ou améliorer les performances de vos
        campagnes publicitaires, je peux vous accompagner dans la mise en place d’un dispositif adapté à vos objectifs.
      </p>
      <ul className="border-t border-line">
        {SERVICES.map((s) => (
          <li key={s.n} className="grid gap-x-8 gap-y-2 border-b border-line py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline">
            <span className="text-lg font-semibold text-gold">{s.n}</span>
            <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="text-pretty leading-relaxed text-mute">{s.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
