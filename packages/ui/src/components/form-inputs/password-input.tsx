"use client";

import { Eye, EyeClosed } from "icons";
import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ onFocus = () => {}, onBlur = () => {}, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const handleVisibilityToggle = () => {
      setPasswordVisible((current) => !current);
    };

    const handleFocus = (value: boolean) => {
      setInputFocused(value);
    };
    return (
      <div
        className={`ui-bg-transparent ui-flex ui-overflow-hidden ui-items-center ui-transition hover:ui-border-teal-600 ui-rounded-lg ui-border ui-border-rounded-lg ${
          inputFocused
            ? "ui-ring-teal-900 ui-ring-4 ui-border-teal-600"
            : "ui-border-outline-primary"
        }`}
      >
        <input
          type={passwordVisible ? "text" : "password"}
          onFocus={(e) => {
            handleFocus(true);
            onFocus(e);
          }}
          onBlur={(e) => {
            handleFocus(false);
            onBlur(e);
          }}
          className="ui-bg-transparent ui-border-none focus:ui-border-none focus:ui-ring-0 focus:ui-outline-none ui-flex-1 placeholder:ui-text-type-le"
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="focus:ui-bg-surface-2 focus:ui-ring-0 focus:ui-outline-none ui-p-3 hover:ui-bg-surface-2 ui-border-l ui-border-outline-primary"
          onClick={handleVisibilityToggle}
        >
          {passwordVisible ? <Eye size={16} /> : <EyeClosed size={16} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
