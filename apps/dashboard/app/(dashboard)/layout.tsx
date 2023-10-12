import "~/styles/globals.css";
import "ui/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "ui";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`bg-surface-1 min-h-[100dvh] max-h-[100dvh] flex ${inter.className}`}
        >
          <Navbar />
          <main className="max-w-7xl max-h-full mx-auto my-16 w-full flex flex-col gap-8">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
