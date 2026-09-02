import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "@/components/layout/Providers";
import { person } from "@/data/content";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HBD Wulan",
  description: "Website ulang tahun interaktif untuk Wulan",
  openGraph: {
    title: "HBD Wulan",
    description: "Website ulang tahun interaktif untuk Wulan",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf5f0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      data-theme="light"
      data-mood="dreamy"
      data-locked="true"
      suppressHydrationWarning
      className={`${playfair.variable} ${poppins.variable} bg-background`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
