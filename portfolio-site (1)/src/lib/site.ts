export const SITE = {
  name: "TEDONKI NGUIMTSA",
  title: "Media Buyer & Digital Acquisition Strategist",
  signature: "Designing advertising strategies. Driving measurable growth.",
  description:
    "Media Buyer & Digital Acquisition Strategist. Plus d’un an de campagnes en agence sur des secteurs variés : Meta Ads, TikTok Ads, génération de leads et acquisition d’utilisateurs.",
  email: "tedonkinguimtsa@gmail.com",
  phoneDisplay: "(+237) 679 48 04 95",
  whatsapp: "237679480495",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
};

export const whatsappLink = (text = "Bonjour Tedonki, je souhaite discuter d’un projet publicitaire.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

/** Affiche les emplacements « capture à ajouter » dans les études de cas. Passer à false pour les masquer. */
export const SHOW_PLACEHOLDERS = true;

export const NAV = [
  { id: "about", label: "À propos" },
  { id: "experience", label: "Expérience" },
  { id: "methodology", label: "Méthode" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projets" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];
