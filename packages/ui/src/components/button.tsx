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
      className="ui-bg-surface-brand-1 ui-border ui-border-surface-brand-1 ui-select-none ui-text-base ui-leading-[1.25] disabled:ui-opacity-50 disabled:ui-cursor-not-allowed hover:ui-bg-surface-brand-2 hover:ui-border-surface-brand-2 focus:ui-bg-surface-brand-2 focus:ui-border-surface-brand-2 focus:ui-outline-none focus:ui-ring-4 focus:ui-ring-teal-900 ui-transition ui-p-3 ui-rounded-lg ui-font-semibold ui-text-type-brand-he"
      {...rest}
    >
      {children}
    </button>
  );
}
