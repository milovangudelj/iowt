"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button, FormInput } from "./";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Inserisci un indirizzo email valido." })
    .min(1, { message: "Inserisci la tua email per accedere." }),
  password: z
    .string()
    .min(12, { message: "La password deve essere lunga almeno 12 caratteri." })
    .max(64, { message: "La password non deve avere più di 64 caratteri." }),
});
type SignInFormSchema = z.infer<typeof schema>;

const errorMessages: { [key: string]: string } = {
  form_password_incorrect: "La password inserita non è corretta.",
  form_identifier_not_found: "Questa email non è registrata.",
};

export function SignInForm() {
  const searchParams = useSearchParams();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(schema),
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const onSubmit: SubmitHandler<SignInFormSchema> = async (data) => {
    await signIn
      ?.create({
        identifier: data.email,
        password: data.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });

          redirect(decodeURI(searchParams.get("redirectTo") ?? "/"));
        }
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;
        const field =
          errorCode === "form_password_incorrect" ? "password" : "email";

        setError(field, {
          message: errorCode
            ? errorMessages[errorCode] ?? "Errore sconosciuto."
            : "Errore sconosciuto.",
        });
      });
  };

  return (
    <div className="ui-flex ui-flex-col ui-gap-4 ui-w-full ui-max-w-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ui-flex ui-flex-col ui-gap-4"
      >
        <div className="ui-flex ui-flex-col ui-gap-1">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput {...field} placeholder="mario.rossi@esempio.it" />
            )}
          />
          {errors.email && (
            <p className="ui-text-[#dd4400] ui-text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="ui-flex ui-flex-col ui-gap-1">
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <FormInput {...field} type="password" />}
          />
          {errors.password && (
            <p className="ui-text-[#dd4400] ui-text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button aria-disabled={!isLoaded}>Accedi</Button>
      </form>
      <p>
        Non hai un account?{" "}
        <Link
          href={`/signup${
            searchParams.entries.length !== 0
              ? "?".concat(searchParams.toString())
              : ""
          }`}
          className="ui-text-teal-700"
        >
          Registrati
        </Link>
      </p>
    </div>
  );
}
