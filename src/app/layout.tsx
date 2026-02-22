import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: "Star Plus Foods | Premium Quality Food Products - Coming Soon",
  description: "Experience the premium taste of Star Plus Foods. We are launching a curated range of high-quality food products. Join our waitlist for exclusive updates.",
  keywords: [
    "Star Plus Foods",
    "premium food products",
    "gourmet food",
    "quality spices",
    "healthy ingredients",
    "luxury food brand",
    "coming soon",
    "food subscription",
    "high-quality groceries"
  ],
  authors: [{ name: "Star Plus Foods Team" }],
  openGraph: {
    title: "Star Plus Foods | Premium Quality Food Products",
    description: "The gold standard in premium food products. Coming soon to your table.",
    url: "https://starplusfoods.com",
    siteName: "Star Plus Foods",
    images: [
      {
        url: "/star-plus/Star-plus1.jpeg",
        width: 1200,
        height: 630,
        alt: "Star Plus Foods Premium Branding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Star Plus Foods | Premium Food Brand",
    description: "Premium food products, coming soon. Sign up for early access.",
    images: ["/star-plus/Star-plus1.jpeg"],
  },
  icons: {
    icon: "/star-plus/Star-plus1.jpeg",
    apple: "/star-plus/Star-plus1.jpeg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Star Plus Foods",
  "url": "https://starplusfoods.com",
  "logo": "https://starplusfoods.com/logo.png",
  "description": "Premium quality food products for a healthier lifestyle.",
  "potentialAction": {
    "@type": "SubscribeAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://starplusfoods.com/#subscribe"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-black text-white selection:bg-rose-500 selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
