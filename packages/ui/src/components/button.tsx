"use client";

import * as React from "react";

export interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      className="ui-bg-teal-500 hover:ui-bg-teal-600 focus:ui-bg-teal-600 focus:ui-outline-none focus:ui-ring-4 focus:ui-ring-teal-900 ui-transition ui-p-3 ui-rounded-lg ui-font-semibold ui-text-black"
      {...rest}
    >
      {children}
    </button>
  );
}
