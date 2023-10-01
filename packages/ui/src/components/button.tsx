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
      className="ui-bg-teal-500 ui-p-3 ui-rounded-lg ui-font-semibold ui-text-black"
      {...rest}
    >
      {children}
    </button>
  );
}
