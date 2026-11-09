import Image from "next/image";
import { Section } from "./ui";
import { ABOUT } from "@/data/content";

export default function About() {
  return (
    <Section id="about" title={ABOUT.title}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <figure className="mx-auto w-full max-w-sm lg:mx-0">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src="/images/tedonki.jpg"
              alt="Portrait de Tedonki Nguimtsa, Media Buyer & Digital Acquisition Strategist"
              width={1100}
              height={1473}
              sizes="(min-width: 1024px) 380px, 90vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm text-mute">Douala, Cameroun</figcaption>
        </figure>
        <div>
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/85">
            {ABOUT.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <p className="font-medium text-ink">{ABOUT.experience}</p>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-medium text-mute">Mon périmètre d’intervention</h3>
            <ol className="relative mt-5 space-y-4 border-l border-line pl-6">
              {ABOUT.scope.map((s) => (
                <li key={s} className="relative text-base">
                  <span aria-hidden className="absolute -left-[29.5px] top-[0.55em] h-1.5 w-1.5 rounded-full bg-gold" />
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <blockquote className="mt-12 border-l-2 border-gold pl-6">
            <p className="text-pretty text-xl font-medium leading-snug md:text-2xl">{ABOUT.conviction}</p>
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
