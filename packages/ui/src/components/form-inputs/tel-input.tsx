"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";
import {
  getCountryCallingCode,
  CountryCode,
  AsYouType,
} from "libphonenumber-js/max";
import { CaretDown, CaretUp, CaretUpDown, Check } from "icons";
import { Flag, countries, countriesByName } from "flags";

type PhoneCountryContextValue = {
  country: CountryCode;
  setCountry: React.Dispatch<React.SetStateAction<CountryCode>>;
};

export const PhoneCountryContext =
  React.createContext<PhoneCountryContextValue>({} as PhoneCountryContextValue);

export interface TelInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "type"
  > {}

const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(
  (
    {
      onFocus = () => {},
      onBlur = () => {},
      onChange = () => {},
      name = "phoneNumber",
      ...props
    },
    ref
  ) => {
    const [inputFocused, setInputFocused] = React.useState(false);
    const { country, setCountry } = React.useContext(PhoneCountryContext);
    const { getValues, setValue } = useFormContext();

    const handleFocus = (value: boolean) => {
      setInputFocused(value);
    };

    const handleCountryChange = (value: string) => {
      setCountry(value as CountryCode);

      const phoneNumber = getValues(name);

      const asYouType = new AsYouType(country);
      const formatted = asYouType.input(phoneNumber);

      setValue(name, formatted);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);

      const value = e.target.value;

      const asYouType = new AsYouType(country);
      const formatted = asYouType.input(value);

      const newCountry = asYouType.getCountry();
      if (newCountry && newCountry !== country) {
        setCountry(newCountry);
      }

      setValue(name, formatted);
    };

    return (
      <div
        className={`ui-bg-transparent ui-flex ui-overflow-hidden ui-items-center ui-transition hover:ui-border-teal-600 ui-rounded-lg ui-border ui-border-rounded-lg ${
          inputFocused
            ? "ui-ring-teal-900 ui-ring-4 ui-border-teal-600"
            : "ui-border-outline-primary"
        }`}
      >
        <Select.Root
          value={country}
          onValueChange={handleCountryChange}
          defaultValue="IT"
        >
          <Select.Trigger
            className="ui-flex ui-flex-none [&>*]:[display:inherit] ui-self-stretch ui-p-3 ui-gap-2 ui-items-center ui-border-r ui-transition ui-border-outline-primary focus:ui-ring-0 focus:ui-outline-none focus:ui-border-r hover:ui-bg-surface-2 focus:ui-bg-surface-2"
            aria-label="Prefisso"
          >
            <Select.Value
              aria-label={countries.find((el) => el.code === country)!.name}
            >
              <Flag country={country} size={16} />
            </Select.Value>
            <Select.Icon>
              <CaretUpDown size={16} className="ui-text-type-me" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="ui-bg-surface-2 ui-rounded-lg ui-overflow-hidden ui-border ui-border-outline-primary ui-shadow-xl">
              <Select.ScrollUpButton className="ui-flex ui-justify-center ui-p-1 hover:ui-bg-surface-3 ui-border-b ui-border-outline-primary">
                <CaretUp size={16} className="ui-text-type-me" />
              </Select.ScrollUpButton>
              <Select.Viewport className="">
                {countriesByName.map((el) => (
                  <SelectItem key={el.code} value={el.code}>
                    <Flag country={el.code} size={16} />
                    <div className="ui-flex ui-items-baseline ui-gap-2">
                      <span className="ui-flex-none ui-text-type-he ui-text-base ui-leading-[1.25]">
                        {el.name}
                      </span>
                      <span className="ui-flex-none ui-text-type-le ui-text-xs ui-leading-[1.25]">
                        +{getCountryCallingCode(el.code)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="ui-flex ui-justify-center ui-p-1 hover:ui-bg-surface-3 ui-border-t ui-border-outline-primary">
                <CaretDown size={16} className="ui-text-type-me" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <input
          type="tel"
          name={name}
          onFocus={(e) => {
            handleFocus(true);
            onFocus(e);
          }}
          onBlur={(e) => {
            handleFocus(false);
            onBlur(e);
          }}
          onChange={handleChange}
          className="ui-bg-transparent ui-p-3 ui-leading-[1.25] ui-border-none focus:ui-border-none focus:ui-ring-0 focus:ui-outline-none ui-flex-1 ui-min-w-0 placeholder:ui-text-type-le"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
TelInput.displayName = "TelInput";

export { TelInput };

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.SelectItem>,
  Omit<React.ComponentPropsWithoutRef<typeof Select.SelectItem>, "className">
>(({ children, ...props }, ref) => {
  return (
    <Select.Item
      className="ui-flex data-[state=unchecked]:ui-pl-10 data-[state=checked]:ui-bg-surface-3 ui-gap-3 ui-p-3 ui-transition ui-items-center focus:ui-ring-0 focus:ui-outline-none focus:ui-border-none ui-cursor-pointer hover:ui-bg-surface-3"
      {...props}
      ref={ref}
    >
      <Select.ItemIndicator>
        <Check size={16} className="ui-text-type-he" />
      </Select.ItemIndicator>
      <Select.ItemText asChild>
        <div className="ui-flex ui-flex-nowrap ui-min-w-fit ui-gap-2 ui-items-center">
          {children}
        </div>
      </Select.ItemText>
    </Select.Item>
  );
});
SelectItem.displayName = Select.SelectItem.displayName;
