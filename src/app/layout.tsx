import "@/styles/globals.css";

import { type Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Noto_Sans_JP } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Footer } from "@/components";
import { title, description } from "./meta.data";

const baseUrl = process.env.BASE_URL ?? "https://product-quiz-game.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  robots: {
    index: true,
  },
  icons: [{ rel: "icon", url: "/icon/48" }],
};

const noto = Noto_Sans_JP({
  weight: ["400", "700", "800"],
  style: "normal",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${noto.className}`}>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </TRPCReactProvider>
        {process.env.GA_ID && <GoogleAnalytics gaId={process.env.GA_ID} />}
      </body>
    </html>
  );
}
