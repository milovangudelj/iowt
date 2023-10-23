"use client";

import * as React from "react";
import * as z from "zod";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { AsYouType } from "libphonenumber-js/max";

import { Button, Logo, PhoneCountryContext, Input } from "./";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type SignUpFormSchema = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  code?: string;
};

const errorMessages: { [key: string]: string } = {
  form_identifier_exists: "Questa email è già collegata ad un account.",
  form_code_incorrect: "Il codice inserito non è corretto.",
};

export function SignUpForm() {
  const searchParams = useSearchParams();
  const [verificationInitiated, setVerificationInitiated] =
    React.useState(false);
  const { country } = React.useContext(PhoneCountryContext);

  const form = useForm<SignUpFormSchema>({
    defaultValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      email: "",
      password: "",
      code: "",
    },
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  async function handleVerification(code: string) {
    await signUp
      ?.attemptEmailAddressVerification({ code })
      .then(async (result) => {
        if (result.status === "complete" && result.createdUserId) {
          setActive({ session: result.createdSessionId });

          await fetch("/api/completeUser", {
            method: "POST",
            body: JSON.stringify({
              role: "USER",
              userId: result.createdUserId,
            }),
          });

          redirect(searchParams.get("redirectTo") ?? "/");
        }
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;
        const field = errorCode === "form_code_incorrect" ? "code" : "email";

        form.setError(field, {
          message: errorCode
            ? errorMessages[errorCode] ?? "Errore sconosciuto."
            : "Errore sconosciuto.",
        });
      });
  }

  const onSubmit: SubmitHandler<SignUpFormSchema> = async (data) => {
    console.log("Is hook loaded?", isLoaded ? "Yes" : "No");
    // if (!isLoaded) return;

    console.log("Do nothing for now.");

    return;

    if (verificationInitiated) {
      if (data.code === undefined) {
        form.setError("code", {
          message: "Inserisci il codice che ti abbiamo inviato.",
        });
        return;
      }

      return handleVerification(data.code ?? "");
    }

    await signUp
      ?.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
        lastName: data.surname,
        unsafeMetadata: {
          phoneNumber: data.phoneNumber,
        },
      })
      .then(() => {
        if (!signUp) return;
        signUp.prepareEmailAddressVerification();
        setVerificationInitiated(true);
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

        // console.log("Error code", errorCode);
      });
  };

  return (
    <div className="ui-flex ui-flex-col ui-gap-8 ui-p-8 ui-rounded-lg ui-border-outline-primary ui-border ui-w-full ui-max-w-[400px]">
      <header className="ui-flex ui-flex-col ui-gap-2">
        <Logo />
        <h1 className="ui-text-[19.2px] ui-leading-[1.25] ui-font-medium">
          {verificationInitiated
            ? "Verifica la tua email"
            : "Crea il tuo account"}
        </h1>
        <p className="ui-text-type-me">
          {verificationInitiated
            ? "Inserisci il codice che ti abbiamo inviato per verificare la tua email."
            : "Per continuare su Italian Open Water Tour"}
        </p>
      </header>
      {!verificationInitiated && (
        <div className="ui-flex ui-items-center ui-gap-2">
          <span className="ui-inline-block ui-h-px ui-flex-1 ui-bg-outline-primary"></span>
          <span className="ui-text-sm ui-leading-[1.25] ui-text-type-le">
            oppure
          </span>
          <span className="ui-inline-block ui-h-px ui-flex-1 ui-bg-outline-primary"></span>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="ui-flex ui-flex-col ui-gap-4"
        >
          <FormField
            control={form.control}
            rules={{
              required: "Inserisci il tuo nome per registrarti.",
            }}
            name="name"
            render={({ field }) => (
              <FormItem visible={!verificationInitiated}>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Mario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{
              required: "Inserisci il tuo cognome per registrarti.",
            }}
            name="surname"
            render={({ field }) => (
              <FormItem visible={!verificationInitiated}>
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Rossi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{
              required: "Inserisci un numero di telefono valido.",
              validate: (value) => {
                const asYouType = new AsYouType(country);
                asYouType.input(value);

                return asYouType.isValid()
                  ? true
                  : "Inserisci un numero di telefono valido per il paese selezionato.";
              },
            }}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem visible={!verificationInitiated}>
                <FormLabel>Numero di telefono</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="123 123 1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Inserisci la tua email per accedere.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Inserisci un indirizzo email valido.",
              },
              validate: (value) => {
                const isValid = z.string().email().safeParse(value).success;
                return isValid
                  ? true
                  : "Inserisci un indirizzo email valido per il paese selezionato.";
              },
            }}
            render={({ field }) => (
              <FormItem visible={!verificationInitiated}>
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
              <FormItem visible={!verificationInitiated}>
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
          <FormField
            control={form.control}
            name="code"
            rules={{
              pattern: {
                value: /^\d*$/,
                message: "Inserisci un codice numerico valido.",
              },
              minLength: {
                value: 6,
                message: "Il codice deve essere lungo 6 cifre.",
              },
              maxLength: {
                value: 6,
                message: "Il codice deve essere lungo 6 cifre.",
              },
            }}
            render={({ field }) => (
              <FormItem visible={verificationInitiated}>
                <FormLabel>Codice</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>{verificationInitiated ? "Verifica" : "Registrati"}</Button>
        </form>
      </Form>
      <p className="ui-text-type-me">
        Hai già un account?{" "}
        <Link
          href={`/signin${
            searchParams.size !== 0 ? "?".concat(searchParams.toString()) : ""
          }`}
          className="ui-text-type-link-me"
        >
          Accedi
        </Link>
      </p>
    </div>
  );
}
