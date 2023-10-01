import "~/styles/globals.css";
import "ui/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Italian Open Water Tour",
  description:
    "Visualizza gli eventi in programma e i risultati delle gare di nuoto in acque libere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`bg-gray-900 flex ${inter.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
