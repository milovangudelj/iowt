"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { parsePhoneNumber } from "libphonenumber-js/mobile";

import { Button, FormInput } from "./";

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

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(schema),
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

        setError(field, {
          message: errorCode
            ? errorMessages[errorCode] ?? "Errore sconosciuto."
            : "Errore sconosciuto.",
        });
      });
  }

  const onSubmit: SubmitHandler<SignUpFormSchema> = async (data) => {
    if (verificationInitiated) {
      if (data.code === undefined) {
        setError("code", {
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

        setError(field, {
          message: errorCode
            ? errorMessages[errorCode] ?? "Errore sconosciuto."
            : "Errore sconosciuto.",
        });

        console.log("Error code", errorCode);
      });
  };

  return (
    <div className="ui-flex ui-flex-col ui-gap-4 ui-w-full ui-max-w-sm">
      {verificationInitiated && (
        <div className="ui-mb-4">
          <h1 className="ui-text-2xl ui-font-bold ui-mb-4">
            Verifica la tua mail
          </h1>
          <p className="ui-text-white/70">
            Inserisci il codice che ti abbiamo inviato per verificare la tua
            mail.
          </p>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ui-flex ui-flex-col ui-gap-4"
      >
        <div
          className={`${
            verificationInitiated ? "ui-hidden" : "ui-block"
          } ui-flex ui-flex-col ui-gap-1`}
        >
          <label htmlFor="name">Nome</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <FormInput {...field} />}
          />
          {errors.name && (
            <p className="ui-text-[#dd4400] ui-text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div
          className={`${
            verificationInitiated ? "ui-hidden" : "ui-block"
          } ui-flex ui-flex-col ui-gap-1`}
        >
          <label htmlFor="surname">Cognome</label>
          <Controller
            name="surname"
            control={control}
            render={({ field }) => <FormInput {...field} />}
          />
          {errors.surname && (
            <p className="ui-text-[#dd4400] ui-text-sm">
              {errors.surname.message}
            </p>
          )}
        </div>
        <div
          className={`${
            verificationInitiated ? "ui-hidden" : "ui-block"
          } ui-flex ui-flex-col ui-gap-1`}
        >
          <label htmlFor="phoneNumber">Numero di telefono</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => <FormInput {...field} />}
          />
          {errors.phoneNumber && (
            <p className="ui-text-[#dd4400] ui-text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div
          className={`${
            verificationInitiated ? "ui-hidden" : "ui-block"
          } ui-flex ui-flex-col ui-gap-1`}
        >
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
        <div
          className={`${
            verificationInitiated ? "ui-hidden" : "ui-block"
          } ui-flex ui-flex-col ui-gap-1`}
        >
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
        <div
          className={`${
            verificationInitiated ? "ui-block" : "ui-hidden"
          } ui-flex ui-flex-col ui-gap-1`}
        >
          <label htmlFor="code">Codice</label>
          <Controller
            name="code"
            control={control}
            render={({ field }) => <FormInput {...field} />}
          />
          {errors.code && (
            <p className="ui-text-[#dd4400] ui-text-sm">
              {errors.code.message}
            </p>
          )}
        </div>
        <Button aria-disabled={!isLoaded}>
          {verificationInitiated ? "Verifica" : "Registrati"}
        </Button>
      </form>
      <p>
        Hai già un account?{" "}
        <Link
          href={`/signin${
            searchParams.size !== 0 ? "?".concat(searchParams.toString()) : ""
          }`}
          className="ui-text-teal-700"
        >
          Accedi
        </Link>
      </p>
    </div>
  );
}
