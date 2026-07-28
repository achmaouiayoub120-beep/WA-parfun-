import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// Providers
import { LenisProvider } from "@/providers/LenisProvider";
import { CursorProvider } from "@/providers/CursorProvider";
import { AudioProvider } from "@/providers/AudioProvider";

// UI Components
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navigation } from "@/components/ui/Navigation";
import { PageTransition } from "@/components/animations/PageTransition";
import { CartSlider } from "@/components/ui/CartSlider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WA Perfumes | Ultra-Premium Luxury Fragrances",
  description: "Experience the essence of excellence. WA Perfumes offers ultra-premium luxury fragrances inspired by the world's most iconic scents.",
  keywords: "luxury perfume, premium fragrances, WA Perfumes, designer scents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-gold selection:text-foreground" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CursorProvider>
            <AudioProvider>
              <LenisProvider>
                <Navigation />
                <CartSlider />
                <PageTransition>
                  {children}
                </PageTransition>
              </LenisProvider>
            </AudioProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
