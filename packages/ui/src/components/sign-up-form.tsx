"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "./";

export function SignUpForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [verificationInitiated, setVerificationInitiated] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  async function handleVerification(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signUp
      ?.attemptEmailAddressVerification({ code })
      .then((result) => {
        if (result.status === "complete") {
          console.log("Email address verified. Sign up complete.");
          setActive({ session: result.createdSessionId });

          redirect(searchParams.get("redirectTo") ?? "/");
        }
      })
      .catch((err) =>
        console.error("Email verification error:", err.errors[0].longMessage)
      );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signUp
      ?.create({
        emailAddress: email,
        password,
      })
      .then(() => {
        signUp.prepareEmailAddressVerification();
        setVerificationInitiated(true);
      })
      .catch((err) =>
        console.error("Sign up error:", err.errors[0].longMessage)
      );
  }

  return isLoaded ? (
    verificationInitiated ? (
      <form
        onSubmit={handleVerification}
        className="ui-flex ui-flex-col ui-gap-4"
      >
        <div className="ui-flex ui-flex-col ui-gap-1">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="ui-bg-gray-900 ui-rounded-lg ui-border ui-border-rounded-lg ui-border-white/[0.06]"
          />
        </div>
        <Button>Verify</Button>
      </form>
    ) : (
      <div className="ui-flex ui-flex-col ui-gap-4">
        <form onSubmit={handleSubmit} className="ui-flex ui-flex-col ui-gap-4">
          <div className="ui-flex ui-flex-col ui-gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ui-bg-gray-900 ui-rounded-lg ui-border ui-border-rounded-lg ui-border-white/[0.06]"
            />
          </div>
          <div className="ui-flex ui-flex-col ui-gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ui-bg-gray-900 ui-rounded-lg ui-border ui-border-rounded-lg ui-border-white/[0.06]"
            />
          </div>
          <Button>Sign up</Button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            href={`/signin${
              searchParams.size !== 0 ? "?".concat(searchParams.toString()) : ""
            }`}
            className="ui-text-teal-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    )
  ) : (
    <p>Loading...</p>
  );
}
