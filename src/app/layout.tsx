import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Art Couture | Bespoke Haute Couture by Gabrielle Benot & Charmaigne Menn",
  description:
    "Art Couture by Gabrielle Benot and Charmaigne Menn. Bespoke haute couture gowns born from original paintings, handcrafted with Lunéville embroidery in our private atelier. Custom evening gowns, bridal couture, and wearable art.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Art Couture | Bespoke Haute Couture by Gabrielle Benot & Charmaigne Menn",
    description:
      "Bespoke haute couture gowns by Gabrielle Benot and Charmaigne Menn. Original paintings transformed into wearable art with Lunéville embroidery at our private atelier.",
    type: "website",
    url: "https://artcouture.studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Art Couture by Gabrielle Benot and Charmaigne Menn – Bespoke Haute Couture Atelier",
      },
    ],
    siteName: "Art Couture",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Couture | Bespoke Haute Couture by Gabrielle Benot & Charmaigne Menn",
    description:
      "Bespoke haute couture gowns by Gabrielle Benot and Charmaigne Menn. Original paintings transformed into wearable art with Lunéville embroidery at our private atelier.",
    images: [
      "/og-image.png",
    ],
  },
  metadataBase: new URL("https://artcouture.studio"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Art Couture",
  alternateName: "Gabi et Char",
  url: "https://artcouture.studio",
  logo: "https://artcouture.studio/favicon.svg",
  description:
    "Bespoke haute couture born from original paintings. Art Couture fuses fine art and fashion.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1010 Pearl St, Ste A",
    addressLocality: "La Jolla",
    addressRegion: "CA",
    postalCode: "92037",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/artcouture.studio",
    "https://www.pinterest.com/artcouturestudio",
    "https://www.facebook.com/artcouturestudio",
  ],
  founder: [
    { "@type": "Person", name: "Gabrielle Benot" },
    { "@type": "Person", name: "Charmaigne Menn" },
  ],
  industry: "Luxury Fashion & Haute Couture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
