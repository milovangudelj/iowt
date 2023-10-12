"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  parsePhoneNumber,
  CountryCode,
  formatIncompletePhoneNumber,
} from "libphonenumber-js/mobile";

import { Button, Logo } from "./";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Inserisci il tuo nome per registrarti." }),
  surname: z
    .string()
    .min(1, { message: "Inserisci il tuo cognome per registrarti." }),
  phoneNumber: z.string().refine(
    (value) => {
      const phoneNumber = parsePhoneNumber(value, "IT");
      return phoneNumber.isValid();
    },
    { message: "Inserisci un numero di telefono valido." }
  ),
  email: z
    .string()
    .email({ message: "Inserisci un indirizzo email valido." })
    .min(1, { message: "Inserisci la tua email per accedere." }),
  password: z
    .string()
    .min(12, { message: "La password deve essere lunga almeno 12 caratteri." })
    .max(64, { message: "La password non deve avere più di 64 caratteri." }),
  code: z
    .string()
    .regex(/^\d*$/, { message: "Inserisci un codice numerico valido." })
    .min(6, { message: "Il codice deve essere lungo 6 cifre." })
    .max(6, { message: "Il codice deve essere lungo 6 cifre." })
    .optional(),
});
type SignUpFormSchema = z.infer<typeof schema>;

const errorMessages: { [key: string]: string } = {
  form_identifier_exists: "Questa email è già collegata ad un account.",
  form_code_incorrect: "Il codice inserito non è corretto.",
};

export function SignUpForm() {
  const searchParams = useSearchParams();
  const [verificationInitiated, setVerificationInitiated] = useState(false);

  // const [phoneCountry, setPhoneCountry] = useState<CountryCode>("IT");

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      phoneNumber: "+39 347 678 7256",
      email: "",
      password: "",
      code: "",
    },
  });
  const watchPhoneNumber = form.watch("phoneNumber");

  // useEffect(() => {
  //   const phoneNumber = formatIncompletePhoneNumber(
  //     watchPhoneNumber,
  //     phoneCountry
  //   );

  //   console.log(phoneNumber);

  //   form.setValue("phoneNumber", phoneNumber);
  // }, [watchPhoneNumber, phoneCountry]);

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
    if (!isLoaded) return;

    if (verificationInitiated) {
      if (data.code === undefined) {
        form.setError("code", {
          message: "Inserisci il codice che ti abbiamo inviato.",
        });
        return;
      }

      return handleVerification(data.code);
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
          <Button disabled={!isLoaded} aria-disabled={!isLoaded}>
            {verificationInitiated ? "Verifica" : "Registrati"}
          </Button>
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
