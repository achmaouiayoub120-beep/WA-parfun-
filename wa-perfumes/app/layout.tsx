import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// Providers
import LenisProvider from "@/providers/LenisProvider";
import { CursorProvider } from "@/providers/CursorProvider";

// UI Components — client components imported directly
import Navigation from "@/components/ui/Navigation";
import CartSlider from "@/components/ui/CartSlider";
import LuxuryCursor from "@/components/ui/LuxuryCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WA Perfumes | Ultra-Premium Luxury Fragrances",
    template: "%s | WA Perfumes",
  },
  description:
    "Experience the essence of excellence. WA Perfumes offers ultra-premium luxury fragrances — WA Signature for men, WA Elegance for women. Leave Your Signature.",
  keywords: [
    "luxury perfume",
    "premium fragrances",
    "WA Perfumes",
    "designer scents",
    "Morocco",
    "parfum de luxe",
  ],
  metadataBase: new URL("https://wa-parfun.vercel.app"),
  openGraph: {
    title: "WA Perfumes | Leave Your Signature",
    description: "Ultra-premium luxury fragrances inspired by the world's most iconic scents.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased min-h-screen bg-[#0A0A0A] text-[#F5F2EC] overflow-x-hidden"
        suppressHydrationWarning
      >
        <CursorProvider>
          <LenisProvider>
            <LuxuryCursor />
            <Navigation />
            <CartSlider />
            <main>{children}</main>
          </LenisProvider>
        </CursorProvider>

        {/* Film Grain Overlay — pure CSS, zero JS cost */}
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
