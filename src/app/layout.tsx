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
  title: "Art Couture | Where Art Inspires Haute Couture",
  description:
    "Explore Art Couture, bespoke couture dresses by Gabi et Char, born from paintings, colors, and textures that transform art into fashion.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Art Couture | Where Art Inspires Haute Couture",
    description:
      "Bespoke couture dresses by Gabi et Char — born from paintings, colors, and textures that transform art into fashion.",
    type: "website",
    url: "https://artcouture.studio",
    images: [
      {
        url: "https://storage.googleapis.com/mixo-sites/images/file-0ae10f15-2ee8-43af-885e-16f4bbe10af4.png",
        width: 1200,
        height: 630,
        alt: "Art Couture — Where Art Inspires Haute Couture",
      },
    ],
    siteName: "Art Couture",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Couture | Where Art Inspires Haute Couture",
    description:
      "Bespoke couture dresses by Gabi et Char — born from paintings, colors, and textures that transform art into fashion.",
    images: [
      "https://storage.googleapis.com/mixo-sites/images/file-0ae10f15-2ee8-43af-885e-16f4bbe10af4.png",
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
    "Bespoke haute couture born from original paintings. Art Couture fuses fine art and fashion in La Jolla, California.",
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
