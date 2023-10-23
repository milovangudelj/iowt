"use client";

import * as React from "react";
import { CountryCode } from "libphonenumber-js/max";
import { PhoneCountryContext, AuthForm } from "ui";

export default function Page() {
  const [country, setCountry] = React.useState<CountryCode>("IT");

  React.useEffect(() => {
    console.log(country);
  }, [country]);

  return (
    <PhoneCountryContext.Provider value={{ country, setCountry }}>
      <AuthForm intent="signup" />
    </PhoneCountryContext.Provider>
  );
}
