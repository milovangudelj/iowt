import "~/styles/globals.css";
import "ui/styles.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";

import cover from "~/public/assets/conor-rabbett-_BwO1BiVI6A-unsplash.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`bg-gray-900 flex min-h-screen ${inter.className}`}>
          <main className="flex-1 min-h-full flex items-center justify-center">
            {children}
          </main>
          <div className="flex-1 min-h-full">
            <Image
              src={cover}
              alt="Un gruppo di nuotatori in mare durante il Crana Swim Series 2019"
              placeholder="blur"
              className="w-full h-full object-cover"
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
