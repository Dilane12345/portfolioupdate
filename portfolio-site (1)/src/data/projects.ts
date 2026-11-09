export type Capture = {
  src?: string;
  w?: number;
  h?: number;
  alt: string;
  caption: string;
  /** zone mise en évidence, en % de l’image */
  highlight?: { x: number; y: number; w: number; h: number };
  /** capture au format mobile (affichée plus étroite) */
  portrait?: boolean;
};

export type Project = {
  id: string;
  client: string;
  name: string;
  logo: string;
  brand: string; // couleur du bandeau de la carte
  sector: string;
  objective: string;
  platforms: string;
  period?: string;
  headline: { value: string; label: string };
  context?: string[];
  intervention: string;
  results: { label: string; value: string; detail?: string }[];
  total?: { value: string; label: string };
  lesson: string;
  disclaimer: string;
  captures: Capture[];
};

const EVENT_LESSON =
  "Dans le cadre d’événements, la publicité digitale peut jouer un rôle essentiel dans la constitution d’une base de prospects à exploiter par les équipes organisatrices.";
const EVENT_INTERVENTION =
  "Participation à la structuration des campagnes, à la définition du dispositif d’acquisition, au paramétrage, au suivi et à l’optimisation des performances.";
const EVENT_DISCLAIMER =
  "Résultats correspondant à des performances publicitaires mesurées : ils ne constituent pas nécessairement des ventes ou des participations finales.";
const LEADS_DISCLAIMER =
  "Résultats correspondant à des performances publicitaires mesurées : ils ne constituent pas nécessairement des ventes finales.";

export const PROJECTS: Project[] = [
  {
    id: "nsia",
    client: "NSIA Assurances",
    name: "Acquisition multi-offres",
    logo: "nsia",
    brand: "#06186b",
    sector: "Assurance",
    objective: "Génération de leads",
    platforms: "Meta Ads & TikTok Ads",
    headline: { value: "660", label: "leads générés sur 3 offres" },
    context: [
      "Dans le secteur de l’assurance, la génération de prospects nécessite de rendre des offres parfois complexes accessibles et attractives pour différentes catégories de consommateurs.",
      "L’enjeu était de soutenir l’acquisition de prospects pour trois offres distinctes de NSIA Assurances.",
    ],
    intervention:
      "Participation à la définition de la stratégie publicitaire, à la structuration des campagnes, à l’élaboration des briefs créatifs, au paramétrage, au suivi et à l’optimisation.",
    results: [
      { label: "NSIA Études", value: "139 leads", detail: "CPL : 0,37 $ · 3 semaines" },
      { label: "NSIA Retraite", value: "287 leads", detail: "CPL : 0,37 $ · 3 semaines" },
      { label: "NSIA Sérénité", value: "234 leads", detail: "CPL : 0,20 $ · 2 semaines" },
    ],
    total: { value: "660", label: "leads au total" },
    lesson:
      "Une stratégie d’acquisition multi-offres nécessite de tenir compte des spécificités de chaque produit. Une approche publicitaire uniforme ne garantit pas les mêmes performances pour des offres qui répondent à des besoins différents.",
    disclaimer: LEADS_DISCLAIMER,
    captures: [{ alt: "Capture des résultats NSIA Assurances", caption: "Capture des résultats NSIA" }],
  },
  {
    id: "big-gum",
    client: "Big Gum — Groupe Chococam",
    name: "Plateforme de pronostics CAN",
    logo: "big_gum",
    brand: "#1d5a2a",
    sector: "Grande consommation",
    objective: "Acquisition d’utilisateurs",
    platforms: "Meta Ads",
    headline: { value: "2 710", label: "utilisateurs acquis" },
    context: [
      "À l’occasion de la Coupe d’Afrique des Nations, Big Gum a développé une opération promotionnelle autour d’une plateforme de pronostics en ligne.",
      "L’enjeu était de faire connaître le dispositif auprès du public cible et de générer des utilisateurs sur la plateforme.",
    ],
    intervention:
      "Participation à la réflexion stratégique, à la structuration du dispositif publicitaire, à l’élaboration des briefs créatifs, au paramétrage des campagnes ainsi qu’au suivi et à l’optimisation.",
    results: [
      { label: "Utilisateurs acquis", value: "2 710" },
      { label: "Coût par utilisateur (CPI)", value: "0,23 €" },
    ],
    lesson:
      "Une opération promotionnelle peut devenir un véritable levier d’acquisition lorsqu’elle associe un mécanisme attractif, une communication adaptée et une stratégie publicitaire orientée vers l’action.",
    disclaimer: "Résultats correspondant à des performances publicitaires mesurées : ils ne constituent pas nécessairement des ventes finales.",
    captures: [
      {
        src: "/images/captures/big-gum-plateforme.jpg",
        w: 511,
        h: 735,
        portrait: true,
        alt: "Capture de la plateforme de pronostics Big Gum : 2 710 utilisateurs",
        caption: "Plateforme de pronostics Big Gum",
        highlight: { x: 3.5, y: 25.9, w: 93, h: 22 },
      },
    ],
  },
  {
    id: "tsa",
    client: "TSA — Transport et Services d’Afrique",
    name: "Inscriptions sur la plateforme",
    logo: "tsa",
    brand: "#0b4a87",
    sector: "Transport & Logistique",
    objective: "Acquisition d’utilisateurs",
    platforms: "Meta Ads & TikTok Ads",
    period: "1 mois",
    headline: { value: "300", label: "inscriptions directes" },
    context: [
      "TSA est une plateforme digitale de mise en relation entre affréteurs et transporteurs en Afrique centrale, notamment au Cameroun.",
      "L’objectif de la campagne était de générer des inscriptions directement sur la plateforme web afin d’élargir sa base d’utilisateurs.",
    ],
    intervention:
      "Participation à la définition de la stratégie d’acquisition, à la structuration des campagnes sur Meta Ads et TikTok Ads, à l’élaboration des briefs créatifs, au paramétrage et au suivi des performances.",
    results: [
      { label: "Inscriptions directes", value: "300" },
      { label: "Coût par inscription (CPI)", value: "0,58 $" },
      { label: "Durée", value: "1 mois" },
    ],
    lesson:
      "Pour une plateforme digitale, l’acquisition ne se limite pas à générer du trafic. La stratégie doit être construite autour de l’action attendue : l’inscription et l’entrée effective de nouveaux utilisateurs dans l’écosystème de la plateforme.",
    disclaimer: "Résultats correspondant à des performances publicitaires mesurées : ils ne constituent pas nécessairement des ventes finales.",
    captures: [{ alt: "Capture des résultats TSA", caption: "Capture des résultats TSA" }],
  },
  {
    id: "the-cop",
    client: "Communauté urbaine de Douala",
    name: "The Co’p 2025",
    logo: "the_cop",
    brand: "#d9a21f",
    sector: "Événementiel",
    objective: "Génération de leads",
    platforms: "Meta Ads",
    period: "2 jours",
    headline: { value: "326", label: "leads en 2 jours" },
    intervention: EVENT_INTERVENTION,
    results: [
      { label: "Leads", value: "326" },
      { label: "CPL", value: "0,12 $" },
      { label: "Durée", value: "2 jours" },
    ],
    lesson: EVENT_LESSON,
    disclaimer: EVENT_DISCLAIMER,
    captures: [
      {
        src: "/images/captures/the-cop-resultats.jpg",
        w: 720,
        h: 307,
        alt: "Capture Meta Ads de la campagne The Co’p : 326 prospects, 0,12 $ par résultat",
        caption: "Campagne The Co’p — Meta Ads",
        highlight: { x: 7.2, y: 52, w: 25, h: 26 },
      },
    ],
  },
  {
    id: "douala-fiesta",
    client: "Communauté urbaine de Douala",
    name: "Douala Fiesta 2025",
    logo: "douala_fiesta",
    brand: "#3a2418",
    sector: "Événementiel",
    objective: "Génération de leads",
    platforms: "Meta Ads",
    period: "9 jours",
    headline: { value: "452", label: "leads en 9 jours" },
    intervention: EVENT_INTERVENTION,
    results: [
      { label: "Leads", value: "452" },
      { label: "CPL", value: "0,11 $" },
      { label: "Durée", value: "9 jours" },
    ],
    lesson: EVENT_LESSON,
    disclaimer: EVENT_DISCLAIMER,
    captures: [
      {
        src: "/images/captures/douala-fiesta-resultats.jpg",
        w: 716,
        h: 675,
        alt: "Capture Meta Ads de la campagne Douala Fiesta : 452 prospects, 0,11 $ par prospect",
        caption: "Campagne Douala Fiesta — Meta Ads",
        highlight: { x: 9.1, y: 17.8, w: 54.7, h: 24.4 },
      },
    ],
  },
];
