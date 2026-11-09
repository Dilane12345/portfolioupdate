import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SITE } from "@/lib/site";

const title = `${SITE.name} — ${SITE.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: "Portfolio Tedonki Nguimtsa",
  authors: [{ name: SITE.name }],
  keywords: ["media buyer", "Meta Ads", "TikTok Ads", "acquisition digitale", "génération de leads", "publicité en ligne", "Douala", "Cameroun"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Tedonki Nguimtsa",
    title,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: SITE.description, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0A0E1C", colorScheme: "dark", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tedonki Nguimtsa",
  jobTitle: SITE.title,
  email: SITE.email,
  telephone: "+237679480495",
  address: { "@type": "PostalAddress", addressLocality: "Douala", addressCountry: "CM" },
  url: SITE.url,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={GeistSans.variable}>
      <body>
        <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2">
          Aller au contenu
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
