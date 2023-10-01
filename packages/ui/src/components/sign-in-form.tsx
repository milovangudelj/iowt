"use client";

import { redirect, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "./";

export function SignInForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signIn!
      .create({
        identifier: email,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          console.log(result);
          setActive!({ session: result.createdSessionId });

          redirect(decodeURI(searchParams.get("redirectTo") ?? "/"));
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  return isLoaded ? (
    <div className="ui-flex ui-flex-col ui-gap-4">
      <form onSubmit={submit} className="ui-flex ui-flex-col ui-gap-4">
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
        <Button>Sign in</Button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link
          href={`/signup${
            searchParams.entries.length !== 0
              ? "?".concat(searchParams.toString())
              : ""
          }`}
          className="ui-text-teal-700"
        >
          Sign up
        </Link>
      </p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
