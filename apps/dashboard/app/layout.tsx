import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ClerkProvider>{children}</ClerkProvider>;
}
