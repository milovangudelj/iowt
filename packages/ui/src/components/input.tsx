"use client";

import * as React from "react";

import { TextInput, EmailInput, PasswordInput, TelInput } from "./form-inputs";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  type?: "text" | "email" | "password" | "tel";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }, ref) => {
    switch (type) {
      case "email":
        return <EmailInput ref={ref} {...props} />;
      case "password":
        return <PasswordInput ref={ref} {...props} />;
      case "tel":
        return <TelInput ref={ref} {...props} />;
      default:
        return <TextInput ref={ref} {...props} />;
    }
  }
);
Input.displayName = "Input";

export { Input };
