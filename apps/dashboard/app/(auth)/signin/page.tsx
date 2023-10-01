import { Metadata } from "next";
import { AuthForm } from "ui";

export const metadata: Metadata = {
  title: "IOWT - Sign in",
  description: "Sign in to access the IOWT Dashboard",
};

export default async function Page() {
  return <AuthForm intent="signin" />;
}
