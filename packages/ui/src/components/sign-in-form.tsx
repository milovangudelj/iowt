"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button, Logo, Input } from "./";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type SignInFormSchema = {
  email: string;
  password: string;
};

const errorMessages: { [key: string]: string } = {
  form_password_incorrect: "La password inserita non è corretta.",
  form_identifier_not_found: "Questa email non è registrata.",
};

export function SignInForm() {
  const searchParams = useSearchParams();

  const form = useForm<SignInFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
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

        form.setError(field, {
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="ui-flex ui-flex-col ui-gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Inserisci la tua email per accedere.",
              validate: (value) => {
                const isValid = z.string().email().safeParse(value).success;
                return isValid ? true : "Inserisci un indirizzo email valido.";
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="mario.rossi@esempio.it"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "La password deve essere lunga almeno 12 caratteri.",
              minLength: {
                value: 12,
                message: "La password deve essere lunga almeno 12 caratteri.",
              },
              maxLength: {
                value: 64,
                message: "La password non deve avere più di 64 caratteri.",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="12+ caratteri"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!isLoaded} aria-disabled={!isLoaded}>
            Accedi
          </Button>
        </form>
      </Form>
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
