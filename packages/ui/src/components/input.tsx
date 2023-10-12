"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const TextInput = dynamic(() =>
  import("./form-inputs").then((mod) => mod.TextInput)
);
const EmailInput = dynamic(() =>
  import("./form-inputs").then((mod) => mod.EmailInput)
);
const PasswordInput = dynamic(() =>
  import("./form-inputs").then((mod) => mod.PasswordInput)
);
const TelInput = dynamic(() =>
  import("./form-inputs").then((mod) => mod.TelInput)
);

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
