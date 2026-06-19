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
        url: "https://art-couture-new-website.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Art Couture by Gabrielle Benot and Charmaigne Menn - Bespoke Haute Couture Atelier",
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
      "https://art-couture-new-website.web.app/og-image.png",
    ],
  },
  metadataBase: new URL("https://art-couture-new-website.web.app"),
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
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/art_couture_boutique",
    "https://www.pinterest.com/artcouturestudio",
    "https://www.facebook.com/profile.php?id=100089819151144",
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
      <head>
        {/* Preload key images so they're ready before user scrolls */}
        <link rel="preload" href="/images/color_is_power.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/patterns_fabric.jpg" as="image" type="image/jpeg" />
      </head>
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
