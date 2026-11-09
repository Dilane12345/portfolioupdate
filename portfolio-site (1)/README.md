# Portfolio — Tedonki Nguimtsa

Site one-page (Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide) : Media Buyer & Digital Acquisition Strategist.

## Installation

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # sert le build
npm run lint       # vérification TypeScript
```

Node 20+ requis.

## Déploiement sur GitHub puis Vercel

```bash
git init && git add . && git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<utilisateur>/<depot>.git
git push -u origin main
```

1. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt (Next.js est détecté automatiquement, aucun réglage de build).
2. Ajoutez les variables d’environnement ci-dessous, puis déployez.

### Variables d’environnement (voir `.env.example`)

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, Open Graph, sitemap). Sans elle, l’URL Vercel de production est utilisée. |
| `RESEND_API_KEY` | Active l’envoi réel du formulaire via [Resend](https://resend.com). |
| `CONTACT_TO_EMAIL` | Destinataire des messages (par défaut `tedonkinguimtsa@gmail.com`). |
| `CONTACT_FROM_EMAIL` | Expéditeur. Avec Resend, utilisez un domaine vérifié pour recevoir sur une autre adresse que celle du compte. |

**Formulaire de contact** : sans `RESEND_API_KEY`, l’API répond 501 et le site ouvre le message pré-rempli dans la messagerie du visiteur (il doit l’envoyer lui-même). Avec la clé, l’envoi est direct. Le bouton WhatsApp fonctionne sans configuration.

## Structure

```
src/app/            layout (SEO, Open Graph, JSON-LD), page, API /api/contact, robots, sitemap, icônes
src/components/     une section = un composant (Hero, About, KeyFigures, Methodology, Process, Expertise, Projects, Services, Contact…)
src/data/           content.ts (textes) et projects.ts (études de cas)
src/lib/site.ts     contacts, navigation, option SHOW_PLACEHOLDERS
public/images/      logos/, captures/, tedonki.jpg
public/og.png       image de partage (1200×630)
```

## Mettre à jour le contenu

- **Textes, chiffres, services** : `src/data/content.ts`.
- **Études de cas** : `src/data/projects.ts`. Pour ajouter une capture, déposez l’image dans `public/images/captures/` et renseignez `src`, `w`, `h` (et `highlight` pour entourer un chiffre, en % de l’image).
- **Captures NSIA et TSA** : leurs emplacements sont signalés « capture à ajouter ». Mettez `SHOW_PLACEHOLDERS = false` dans `src/lib/site.ts` pour masquer les emplacements vides.
- Aucune capture n’est générée : seules les captures réelles fournies sont utilisées.
