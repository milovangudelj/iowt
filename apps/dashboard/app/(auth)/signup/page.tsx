import { Metadata } from "next";
import { AuthForm } from "ui";

export const metadata: Metadata = {
  title: "IOWT - Sign up",
  description: "Sign up to access the IOWT Dashboard",
};

export default async function Page(): Promise<JSX.Element> {
  return <AuthForm intent="signup" />;
}
