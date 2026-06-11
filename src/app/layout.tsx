import type { Metadata, Viewport } from "next";
import { Anton, Cormorant_Garamond, Archivo } from "next/font/google";
import { site, TICKETS_URL } from "@/config/site";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `The Altar ${site.year} — ${site.tagline} | ${site.host}`,
  description: site.description,
  openGraph: {
    title: `The Altar ${site.year} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: `The Altar ${site.year}`,
    images: [{ url: site.images.ogImage, width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `The Altar ${site.year} — ${site.tagline}`,
    description: site.description,
    images: [site.images.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0805",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  name: `The Altar ${site.year}`,
  description: site.description,
  startDate: site.date.isoStart,
  endDate: site.date.isoEnd,
  doorTime: site.date.isoDoors,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`${site.url}${site.images.ogImage}`],
  location: {
    "@type": "Place",
    name: site.venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Arena Square",
      addressLocality: site.venue.city,
      postalCode: "HA9 0AA",
      addressCountry: site.venue.country,
    },
  },
  organizer: {
    "@type": "Organization",
    name: site.host,
    url: site.hostUrl,
  },
  performer: site.lineup.map((person) => ({
    "@type": "Person",
    name: person.name,
  })),
  offers: {
    "@type": "Offer",
    url: TICKETS_URL,
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01T00:00:00+00:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${cormorant.variable} ${archivo.variable} antialiased`}
    >
      <body className="bg-bg font-sans text-cream">
        {children}
        {/* cinematic atmosphere — sits above everything except the cursor */}
        <div aria-hidden className="vignette pointer-events-none fixed inset-0 z-80" />
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-90" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
