"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button, Logo } from "./";

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
    <div className="ui-flex ui-flex-col ui-gap-8 ui-p-8 ui-rounded-lg ui-border-outline-primary ui-border ui-w-full ui-max-w-[400px]">
      <header className="ui-flex ui-flex-col ui-gap-2">
        <Logo />
        <h1 className="ui-text-[19.2px] ui-leading-[1.25] ui-font-medium">
          Accedi
        </h1>
        <p className="ui-text-type-me">
          Per continuare su Italian Open Water Tour
        </p>
      </header>
      <div className="ui-flex ui-items-center ui-gap-2">
        <span className="ui-inline-block ui-h-px ui-flex-1 ui-bg-outline-primary"></span>
        <span className="ui-text-sm ui-leading-[1.25] ui-text-type-le">
          oppure
        </span>
        <span className="ui-inline-block ui-h-px ui-flex-1 ui-bg-outline-primary"></span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ui-flex ui-flex-col ui-gap-4"
      >
        {/* <FormElement>
          <FormElement.Label htmlFor="email" label="Email" />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormElement.Input
                type="text"
                {...field}
                aria-invalid={errors.email ? true : false}
                aria-errormessage="email"
                placeholder="mario.rossi@esempio.it"
              />
            )}
          />
          <FormElement.Error error={errors.email} errorFor="email" />
        </FormElement>
        <FormElement>
          <FormElement.Label htmlFor="password" label="Password" />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormElement.Input
                {...field}
                type="password"
                aria-invalid={errors.password ? true : false}
                aria-errormessage="password"
                placeholder="12+ characters"
              />
            )}
          />
          <FormElement.Error error={errors.password} errorFor="password" />
        </FormElement> */}
        <Button aria-disabled={!isLoaded}>Accedi</Button>
      </form>
      <p className="ui-text-type-me">
        Non hai un account?{" "}
        <Link
          href={`/signup${
            searchParams.entries.length !== 0
              ? "?".concat(searchParams.toString())
              : ""
          }`}
          className="ui-text-type-link-me"
        >
          Registrati
        </Link>
      </p>
    </div>
  );
}
