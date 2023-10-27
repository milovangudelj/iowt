"use client";

import * as React from "react";
import * as z from "zod";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { isValidNumberForRegion } from "libphonenumber-js";
import { AsYouType, parsePhoneNumber } from "libphonenumber-js/max";
import {
  GlobalState,
  createStore,
  useStateMachine,
} from "little-state-machine";

import { Button, Logo, PhoneCountryContext, Input } from "./";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface DetailsForm {
  name: string;
  surname: string;
}
interface PhoneForm {
  phoneNumber: string;
}
interface PhoneVerificationForm {
  phoneVerificationCode: string;
}
interface CredentialsForm {
  email: string;
  password: string;
}
interface EmailVerificationForm {
  emailVerificationCode: string;
}

type FormSteps =
  | "details"
  | "phone"
  | "phoneVerification"
  | "phoneVerified"
  | "credentials"
  | "emailVerification"
  | "emailVerified";

declare module "little-state-machine" {
  interface GlobalState {
    data: DetailsForm &
      PhoneForm &
      PhoneVerificationForm &
      CredentialsForm &
      EmailVerificationForm;
    step: FormSteps;
    createdUserId: string | undefined | null;
    createdSessionId: string | undefined | null;
  }
}

createStore(
  {
    step: "details",
    data: {
      name: "",
      surname: "",
      phoneNumber: "",
      phoneVerificationCode: "",
      email: "",
      password: "",
      emailVerificationCode: "",
    },
    createdSessionId: undefined,
    createdUserId: undefined,
  },
  {
    persist: "none",
  }
);

function updateStep(state: GlobalState, payload: GlobalState["step"]) {
  return {
    ...state,
    step: payload,
  };
}

function updateDetails(state: GlobalState, payload: DetailsForm) {
  return {
    ...state,
    data: {
      ...state.data,
      name: payload.name,
      surname: payload.surname,
    },
  } satisfies GlobalState;
}

function updatePhone(state: GlobalState, payload: PhoneForm) {
  return {
    ...state,
    data: {
      ...state.data,
      phoneNumber: payload.phoneNumber,
    },
  } satisfies GlobalState;
}

function updatePhoneVerificationCode(
  state: GlobalState,
  payload: PhoneVerificationForm
) {
  return {
    ...state,
    data: {
      ...state.data,
      phoneVerificationCode: payload.phoneVerificationCode,
    },
  } satisfies GlobalState;
}

function updateCredentials(state: GlobalState, payload: CredentialsForm) {
  return {
    ...state,
    data: {
      ...state.data,
      email: payload.email,
      password: payload.password,
    },
  } satisfies GlobalState;
}

function updateEmailVerificationCode(
  state: GlobalState,
  payload: EmailVerificationForm
) {
  return {
    ...state,
    data: {
      ...state.data,
      emailVerificationCode: payload.emailVerificationCode,
    },
  } satisfies GlobalState;
}

function updateSessionId(state: GlobalState, payload: string | null) {
  return {
    ...state,
    createdSessionId: payload,
  } satisfies GlobalState;
}

function updateUserId(state: GlobalState, payload: string | null) {
  return {
    ...state,
    createdUserId: payload,
  } satisfies GlobalState;
}

function resetStore(state: GlobalState) {
  return {
    ...state,
    data: {
      name: "",
      surname: "",
      phoneNumber: "",
      phoneVerificationCode: "",
      email: "",
      password: "",
      emailVerificationCode: "",
    },
    step: "details",
    createdSessionId: undefined,
    createdUserId: undefined,
  } satisfies GlobalState;
}

const errorMessages: { [key: string]: string } = {
  form_identifier_exists: "Questa email è già collegata ad un account.",
  form_code_incorrect: "Il codice inserito non è corretto.",
};

const formMessages: {
  [key in FormSteps]: {
    title: string;
    message: string;
  };
} = {
  details: {
    title: "Crea il tuo account",
    message: "Per continuare su Italian Open Water Tour",
  },
  phone: {
    title: "Aggiungi un numero di telefono",
    message: "Inserisci il tuo numero di telefono per continuare.",
  },
  phoneVerification: {
    title: "Verifica il tuo numero di telefono",
    message:
      "Inserisci il codice che ti abbiamo inviato per verificare il tuo numero di telefono.",
  },
  phoneVerified: {
    title: "Numero di telefono verificato",
    message: "Il tuo numero di telefono è stato verificato con successo.",
  },
  credentials: {
    title: "Crea le credenziali",
    message: "Scegli le credenziali con cui accedere al tuo account.",
  },
  emailVerification: {
    title: "Verifica la tua email",
    message:
      "Inserisci il codice che ti abbiamo inviato per verificare la tua email.",
  },
  emailVerified: {
    title: "Email verificata",
    message: "La tua email è stata verificata con successo.",
  },
};

const FormStep = ({
  step = "details",
  signUpComplete = false,
}: {
  step: FormSteps;
  signUpComplete: boolean;
}) => {
  const searchParams = useSearchParams();
  const { actions } = useStateMachine({ updateStep, resetStore });

  switch (step) {
    case "details":
      return <DetailsStep />;

    case "phone":
      return <PhoneStep />;

    case "phoneVerification":
      return <PhoneVerificationStep />;

    case "phoneVerified":
      return (
        <FormStepAction
          onClick={() => {
            actions.updateStep("credentials");
          }}
        />
      );

    case "credentials":
      return <CredentialsStep />;

    case "emailVerification":
      return <EmailVerificationStep />;

    case "emailVerified":
      return (
        <FormStepAction
          disabled={!signUpComplete}
          aria-disabled={!signUpComplete}
          onClick={() => {
            actions.resetStore();
            redirect(searchParams.get("redirectTo") ?? "/");
          }}
        />
      );
  }
};

export function SignUpForm() {
  const searchParams = useSearchParams();
  const { setActive } = useSignUp();
  const { getState } = useStateMachine({
    updateStep,
    resetStore,
  });
  const [signUpComplete, setSignupComplete] = React.useState(false);

  React.useEffect(() => {
    if (getState().createdSessionId === null) {
      console.log(
        "Panic! For some reason you completed all steps but the session is null."
      );
    }

    if (
      signUpComplete ||
      getState().step !== "emailVerified" ||
      !getState().createdSessionId ||
      !setActive
    )
      return;

    setActive({ session: getState().createdSessionId })
      .then(() => {
        console.log("Session activated. Sign up complete.");

        setSignupComplete(true);
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;

        console.log("Error:", errorCode);
      });
  }, [getState().step, getState().createdSessionId, setActive]);

  return (
    <div className="ui-flex ui-flex-col ui-gap-8 ui-p-8 ui-rounded-lg ui-border-outline-primary ui-border ui-w-full ui-max-w-[400px]">
      <header className="ui-flex ui-flex-col ui-gap-2">
        <Logo />
        <h1 className="ui-text-[19.2px] ui-leading-[1.25] ui-font-medium">
          {formMessages[getState().step].title}
        </h1>
        <p className="ui-text-type-me">
          {formMessages[getState().step].message}
        </p>
      </header>
      <FormStep step={getState().step} signUpComplete={signUpComplete} />
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

const DetailsStep = () => {
  const { isLoaded, signUp } = useSignUp();
  const { getState, actions } = useStateMachine({ updateDetails, updateStep });

  const form = useForm<DetailsForm>({
    defaultValues: {
      name: "",
      surname: "",
    },
  });

  const onSubmit: SubmitHandler<DetailsForm> = async (data) => {
    actions.updateDetails(data);

    await signUp
      ?.create({
        firstName: getState().data.name,
        lastName: getState().data.surname,
      })
      .then(() => {
        console.log("Created SignUp object.");

        actions.updateStep("phone");
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;

        console.log("Error:", errorCode);
      });
  };

  return (
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
            <FormItem>
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
            <FormItem>
              <FormLabel>Cognome</FormLabel>
              <FormControl>
                <Input placeholder="Rossi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormStepAction disabled={!isLoaded} aria-disabled={!isLoaded} />
      </form>
    </Form>
  );
};

const PhoneStep = () => {
  const { isLoaded, signUp } = useSignUp();
  const { getState, actions } = useStateMachine({ updatePhone, updateStep });
  const { country } = React.useContext(PhoneCountryContext);

  const form = useForm<PhoneForm>({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<PhoneForm> = async (data) => {
    actions.updatePhone(data);

    await signUp
      ?.update({
        phoneNumber: parsePhoneNumber(
          getState().data.phoneNumber,
          country
        ).formatInternational(),
      })
      .then(async () => {
        console.log("Updated SignUp object. Added `phoneNumber`.");

        console.log("Preparing phone number verification...");
        await signUp.preparePhoneNumberVerification();

        actions.updateStep("phoneVerification");
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;

        console.log("Error:", errorCode);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="ui-flex ui-flex-col ui-gap-4"
      >
        <FormField
          control={form.control}
          rules={{
            required: "Inserisci un numero di telefono valido.",
            validate: (value) => {
              const asYouType = new AsYouType(country);
              asYouType.input(value);

              const valid =
                asYouType.isValid() &&
                asYouType.getNumber() !== undefined &&
                isValidNumberForRegion(
                  asYouType.getNumber()!.formatNational(),
                  country
                );

              return valid
                ? true
                : "Inserisci un numero di telefono valido per il paese selezionato.";
            },
          }}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero di telefono</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="123 123 1234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormStepAction disabled={!isLoaded} aria-disabled={!isLoaded} />
      </form>
    </Form>
  );
};

const PhoneVerificationStep = () => {
  const { isLoaded, signUp } = useSignUp();
  const { getState, actions } = useStateMachine({
    updatePhoneVerificationCode,
    updateStep,
  });

  const form = useForm<PhoneVerificationForm>({
    defaultValues: {
      phoneVerificationCode: "",
    },
  });

  const onSubmit: SubmitHandler<PhoneVerificationForm> = async (data) => {
    actions.updatePhoneVerificationCode(data);

    console.log("Attempting phone verification...");
    await signUp
      ?.attemptPhoneNumberVerification({
        code: getState().data.phoneVerificationCode,
      })
      .then(async (result) => {
        console.log("Phone verification complete.");

        actions.updateStep("phoneVerified");
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;

        form.setError("phoneVerificationCode", {
          message: errorCode
            ? errorMessages[errorCode] ?? "Errore sconosciuto."
            : "Errore sconosciuto.",
        });

        console.log("Error:", err.errors[0].code);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="ui-flex ui-flex-col ui-gap-4"
      >
        <FormField
          control={form.control}
          name="phoneVerificationCode"
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
            <FormItem>
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
        <FormStepAction disabled={!isLoaded} aria-disabled={!isLoaded} />
      </form>
    </Form>
  );
};

const CredentialsStep = () => {
  const { isLoaded, signUp } = useSignUp();
  const { getState, actions } = useStateMachine({
    updateCredentials,
    updateStep,
  });

  const form = useForm<CredentialsForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<CredentialsForm> = async (data) => {
    actions.updateCredentials(data);

    await signUp
      ?.update({
        emailAddress: getState().data.email,
        password: getState().data.password,
      })
      .then(async (result) => {
        console.log("Preparing email address verification...");
        await signUp.prepareEmailAddressVerification();

        actions.updateStep("emailVerification");
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;

        const whichField =
          errorCode === "form_identifier_exists" ? "email" : "password";

        form.setError(whichField, {
          message: errorCode
            ? errorMessages[errorCode] ?? "Errore sconosciuto."
            : "Errore sconosciuto.",
        });

        console.log("Error:", err.errors[0].code);
      });
  };

  return (
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
                <Input type="password" placeholder="12+ caratteri" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormStepAction disabled={!isLoaded} aria-disabled={!isLoaded} />
      </form>
    </Form>
  );
};

const EmailVerificationStep = () => {
  const { isLoaded, signUp } = useSignUp();
  const { actions, getState } = useStateMachine({
    updateEmailVerificationCode,
    updateSessionId,
    updateUserId,
    updateStep,
  });

  const form = useForm<EmailVerificationForm>({
    defaultValues: {
      emailVerificationCode: "",
    },
  });

  const onSubmit: SubmitHandler<EmailVerificationForm> = async (data) => {
    actions.updateEmailVerificationCode(data);

    console.log("Attempting email verification...");
    await signUp
      ?.attemptEmailAddressVerification({
        code: getState().data.emailVerificationCode,
      })
      .then(async (result) => {
        actions.updateSessionId(result.createdSessionId);
        actions.updateUserId(result.createdUserId);

        // Won't work cause middleware redirects the request thinking it's not authenticated
        // await fetch("/api/completeUser", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     role: "USER",
        //     userId: result.createdUserId,
        //   }),
        // });

        console.log("Email verification complete.");

        actions.updateStep("emailVerified");
      })
      .catch((err) => {
        const errorCode = err.errors[0].code as string | undefined;

        form.setError("emailVerificationCode", {
          message: errorCode
            ? errorMessages[errorCode] ?? "Errore sconosciuto."
            : "Errore sconosciuto.",
        });

        console.log("Error:", err.errors[0].code);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="ui-flex ui-flex-col ui-gap-4"
      >
        <FormField
          control={form.control}
          name="emailVerificationCode"
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
            <FormItem>
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
        <FormStepAction disabled={!isLoaded} aria-disabled={!isLoaded} />
      </form>
    </Form>
  );
};

const FormStepAction = ({
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { getState } = useStateMachine();

  const actionMessage = () => {
    switch (getState().step) {
      case "details":
        return "Registrati";
      case "phoneVerification":
        return "Verifica il numero";
      case "emailVerification":
        return "Verifica l'email";
      default:
        return "Continua";
    }
  };

  return (
    <Button
      className="ui-flex ui-flex-col ui-items-center ui-gap-2"
      onClick={onClick}
      {...props}
    >
      {actionMessage()}
    </Button>
  );
};
