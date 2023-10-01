import { SignInForm, SignUpForm } from "./";

interface AuthFormProps {
  intent: "signin" | "signup";
}

export function AuthForm({ intent }: AuthFormProps) {
  if (intent === "signin") {
    return <SignInForm />;
  }

  return <SignUpForm />;
}
