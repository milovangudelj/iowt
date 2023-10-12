"use client";

import { InputHTMLAttributes, forwardRef } from "react";

export interface EmailInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        type={"text"}
        className={
          "ui-bg-surface-2 ui-p-3 ui-text-base ui-leading-[1.25] aria-disabled:ui-pointer-events-none ui-transition aria-disabled:ui-bg-gray-800 focus:ui-ring-teal-900 focus:ui-ring-4 hover:ui-border-teal-600 focus:ui-border-teal-600 ui-rounded-lg ui-border ui-border-rounded-lg ui-border-outline-primary placeholder:ui-text-type-le aria-disabled:ui-opacity-50"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
EmailInput.displayName = "EmailInput";

export { EmailInput };
