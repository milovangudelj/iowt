"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  InputHTMLAttributes,
  RefAttributes,
  forwardRef,
  useState,
} from "react";
import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, CaretUpDown, Check } from "icons";

export interface TelInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {}

const countries: { [key: string]: string } = {
  france: "🇫🇷",
  "united-kingdom": "🇬🇧",
  spain: "🇪🇸",
};

const TelInput = forwardRef<HTMLInputElement, TelInputProps>(
  ({ onFocus = () => {}, onBlur = () => {}, ...props }, ref) => {
    const [inputFocused, setInputFocused] = useState(false);
    const [value, setValue] = useState("france");

    const handleFocus = (value: boolean) => {
      setInputFocused(value);
    };

    return (
      <div
        className={`ui-flex ui-overflow-hidden ui-items-center ui-bg-surface-2 ui-transition hover:ui-border-teal-600 ui-rounded-lg ui-border ui-border-rounded-lg ${
          inputFocused
            ? "ui-ring-teal-900 ui-ring-4 ui-border-teal-600"
            : "ui-border-outline-primary"
        }`}
      >
        <Select.Root value={value} onValueChange={setValue} defaultValue="+39">
          <Select.Trigger
            className="ui-flex ui-flex-none ui-p-3 ui-gap-2 ui-items-center ui-border-r ui-transition ui-border-outline-primary focus:ui-ring-0 focus:ui-outline-none focus:ui-border-r hover:ui-bg-surface-3"
            aria-label="Prefisso"
          >
            <Select.Value aria-label={value}>{countries[value]}</Select.Value>
            <Select.Icon className="">
              <CaretUpDown size={16} className="ui-text-type-me" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="ui-bg-surface-2 ui-rounded-lg ui-overflow-hidden ui-border ui-border-outline-primary ui-shadow-xl">
              <Select.ScrollUpButton className="">
                <CaretUp size={16} className="ui-text-type-me" />
              </Select.ScrollUpButton>
              <Select.Viewport className="">
                <SelectItem value="+39">Italia</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </Select.Viewport>
              <Select.ScrollDownButton>
                <CaretDown size={16} className="ui-text-type-me" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <input
          type="tel"
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
      </div>
    );
  }
);
TelInput.displayName = "TelInput";

export { TelInput };

const SelectItem = forwardRef<
  ElementRef<typeof Select.SelectItem>,
  Omit<ComponentPropsWithoutRef<typeof Select.SelectItem>, "className">
>(({ children, ...props }, ref) => {
  return (
    <Select.Item
      className="ui-flex data-[state=unchecked]:ui-pl-9 ui-gap-2 ui-p-3 ui-transition ui-items-center focus:ui-ring-0 focus:ui-outline-none focus:ui-border-none ui-cursor-pointer hover:ui-bg-surface-3"
      {...props}
      ref={ref}
    >
      <Select.ItemIndicator>
        <Check size={16} className="ui-text-type-me" />
      </Select.ItemIndicator>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});
SelectItem.displayName = Select.SelectItem.displayName;
