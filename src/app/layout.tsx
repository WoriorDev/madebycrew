import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { ScrollProgress } from "@/components/fx/ScrollProgress";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MadeByCrew.pl — tworzymy strony internetowe",
  description:
    "Dwuosobowy crew od stron, landingów i aplikacji webowych. Nowoczesny design, czysty kod, realne wyniki dla Twojego biznesu.",
  metadataBase: new URL("https://madebycrew.pl"),
  icons: {
    icon: [{ url: "/brand/mark.png", type: "image/png" }],
    apple: "/brand/mark.png",
    shortcut: "/brand/mark.png",
  },
  openGraph: {
    title: "MadeByCrew.pl",
    description:
      "Tworzymy strony internetowe, które wyglądają dobrze i działają jeszcze lepiej.",
    images: ["/brand/banner-transparent.png"],
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={cn("dark h-full antialiased", display.variable, body.variable)}
    >
      <body className="flex min-h-full flex-col bg-graphite text-off-white">
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
