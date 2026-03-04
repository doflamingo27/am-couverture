import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AM Couverture — Couvreur à Orléans & Loiret (45)",
  description:
    "Démoussage, rénovation et réparation de toiture à Orléans et dans le Loiret. Devis gratuit en 24h. Artisan local, assurance décennale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
