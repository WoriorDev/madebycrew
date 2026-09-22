import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

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
    icon: "/brand/logo.jpg",
  },
  openGraph: {
    title: "MadeByCrew.pl",
    description:
      "Tworzymy strony internetowe, które wyglądają dobrze i działają jeszcze lepiej.",
    images: ["/brand/banner.jpg"],
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-graphite text-off-white">
        {children}
      </body>
    </html>
  );
}
