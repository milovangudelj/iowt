"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

interface LabelProps
  extends Omit<
    ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    "className"
  > {}

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ ...props }, forwardedRef) => {
    return (
      <LabelPrimitive.Root
        ref={forwardedRef}
        className={`ui-text-sm ui-leading-[1.25] ui-text-type-he`}
        {...props}
      />
    );
  }
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
