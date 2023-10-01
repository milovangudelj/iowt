"use client";

import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button({ children }: ButtonProps): JSX.Element {
  return (
    <button onClick={() => console.log("Button clicked!")}>{children}</button>
  );
}
