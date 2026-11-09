import { NAV, SITE, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-14 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-semibold tracking-tight">Tedonki Nguimtsa</p>
          <p className="mt-2 max-w-xs text-sm text-mute">{SITE.signature}</p>
        </div>
        <nav aria-label="Pied de page">
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} className="text-mute transition-colors hover:text-ink">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 text-sm">
          <li><a href={`mailto:${SITE.email}`} className="text-mute transition-colors hover:text-ink">{SITE.email}</a></li>
          <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-mute transition-colors hover:text-ink">WhatsApp {SITE.phoneDisplay}</a></li>
          <li className="text-mute">Douala, Cameroun</li>
        </ul>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-mute">
        <p>© {new Date().getFullYear()} Tedonki Nguimtsa. Tous droits réservés.</p>
        <a href="#top" className="transition-colors hover:text-ink">Retour en haut</a>
      </div>
    </footer>
  );
}
