"use client";

import * as React from "react";
import { CountryCode } from "libphonenumber-js/max";
import { StateMachineProvider } from "little-state-machine";
import { PhoneCountryContext, AuthForm } from "ui";

export default function Page() {
  const [country, setCountry] = React.useState<CountryCode>("IT");

  return (
    <StateMachineProvider>
      <PhoneCountryContext.Provider value={{ country, setCountry }}>
        <AuthForm intent="signup" />
      </PhoneCountryContext.Provider>
    </StateMachineProvider>
  );
}
