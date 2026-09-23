import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/fx/SmoothScroll";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MadeByCrew.pl",
  description:
    "Dwuosobowy crew od stron, landingów i aplikacji webowych. Nowoczesny design, czysty kod, realne wyniki dla Twojego biznesu.",
  metadataBase: new URL("https://madebycrew.pl"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
