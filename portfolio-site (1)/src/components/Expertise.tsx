import { Section } from "./ui";
import { EXPERTISE, PLATFORMS } from "@/data/content";

export default function Expertise() {
  return (
    <Section id="expertise" title="Quatre domaines d’expertise, un seul objectif : la performance." wide>
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
        {EXPERTISE.map((e) => (
          <div key={e.title} className="border-t border-line pt-6">
            <h3 className="text-xl font-semibold tracking-tight">{e.title}</h3>
            <ul className="mt-4 space-y-2.5 text-mute">
              {e.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h3 className="text-2xl font-semibold tracking-tight">Plateformes publicitaires</h3>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((p, i) => (
            <li key={p.name} className={`p-6 ${i === 0 ? "bg-accent" : "bg-bg"}`}>
              <p className="text-lg font-semibold">{p.name}</p>
              <p className={`mt-1 text-sm ${i === 0 ? "text-white/85" : "text-mute"}`}>{p.level}</p>
              <div className="mt-6 flex gap-1.5" role="img" aria-label={`Niveau : ${p.level}`}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <span
                    key={k}
                    className={`h-1.5 flex-1 rounded-full ${k < p.score ? (i === 0 ? "bg-white" : "bg-accent") : i === 0 ? "bg-white/25" : "bg-line"}`}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-mute">Les niveaux indiqués reflètent mon degré de pratique réel sur chaque plateforme.</p>
      </div>
    </Section>
  );
}
