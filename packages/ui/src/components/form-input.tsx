"use client";

import { Eye, EyeClosed } from "icons";
import { ComponentProps, useState } from "react";

interface FormInputProps extends Omit<ComponentProps<"input">, "className"> {}

export function FormInput({
  type,
  onFocus = () => {},
  onBlur = () => {},
  ...props
}: FormInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleVisibilityToggle = () => {
    setPasswordVisible((current) => !current);
  };

  const handleFocus = (value: boolean) => {
    setInputFocused(value);
  };

  return type === "password" ? (
    <div
      className={`ui-flex ui-overflow-hidden ui-items-center ui-bg-gray-900 ui-transition hover:ui-border-teal-600 ui-rounded-lg ui-border ui-border-rounded-lg ${
        inputFocused
          ? "ui-ring-teal-900 ui-ring-4 ui-border-teal-600"
          : "ui-border-white/[0.06]"
      }`}
    >
      <input
        type={passwordVisible ? "text" : "password"}
        className="ui-bg-transparent ui-border-none ui-ring-0 ui-outline-none ui-flex-1"
        onFocus={(e) => {
          handleFocus(true);
          onFocus(e);
        }}
        onBlur={(e) => {
          handleFocus(false);
          onBlur(e);
        }}
        {...props}
      />
      <button
        type="button"
        className="ui-bg-gray-900 focus:ui-bg-gray-800 focus:ui-ring-0 focus:ui-outline-none ui-p-3 hover:ui-bg-gray-800"
        onClick={handleVisibilityToggle}
      >
        {passwordVisible ? <Eye size={16} /> : <EyeClosed size={16} />}
      </button>
    </div>
  ) : (
    <input
      type={type}
      className="ui-bg-gray-900 aria-disabled:ui-pointer-events-none ui-transition aria-disabled:ui-bg-gray-800 focus:ui-ring-teal-900 focus:ui-ring-4 hover:ui-border-teal-600 focus:ui-border-teal-600 ui-rounded-lg ui-border ui-border-rounded-lg ui-border-white/[0.06]"
      {...props}
    />
  );
}
