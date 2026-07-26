import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/core/SmoothScroll";
import LoadingScreen from "@/components/core/LoadingScreen";
import { PopupProvider } from "@/context/PopupContext";
import GlobalPopup from "@/components/core/GlobalPopup";
import { cn } from "@/lib/utils";

// Aristocratic serif — headlines, display text
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Clean modern sans — body copy, UI text
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Geometric sans — labels, caps, tracking
const jost = Jost({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alwalaa Real Estate | Premium Investment in Oman",
  description: "Invest in Oman’s most prestigious properties with Alwalaa Real Estate. Redefining luxury real estate investment for global investors.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "256x256", type: "image/png" },
    ],
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
      className={cn("antialiased", cormorant.variable, dmSans.variable, jost.variable)}
      suppressHydrationWarning
    >
      <body className="flex flex-col" suppressHydrationWarning>
        <PopupProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <GlobalPopup />
        </PopupProvider>
      </body>
    </html>
  );
}
