import React from 'react';
import { Control, Controller, FieldValues, Path, UseFormSetValue } from 'react-hook-form';

import {
  ControlledInput,
  ControlledInputProps,
  Country,
  Input,
  InputProps,
  SelectCountry,
  SelectCountryProps,
} from '@/components';

export type PhoneInputProps<T extends Record<string, string>> = Partial<InputProps & ControlledInputProps<T>> & {
  onCountrySelect?: (country: Country) => void;
  setValue?: UseFormSetValue<FieldValues>;
  countryCodeName?: string;
  required?: boolean;
  countryDefaultValue?: SelectCountryProps['defaultValue'];
};

export const PhoneInput = <T extends Record<string, string>>({
  onCountrySelect,
  name,
  control,
  label,
  placeholder,
  countryCodeName,
  required,
  rules = {},
  countryDefaultValue,
  ...rest
}: PhoneInputProps<T>) => {
  const controlled = !!control;
  const InputWrapper = controlled ? ControlledInput : Input;

  const SelectCountryWrapper = (onChange?: (value: string) => void) => {
    return (
      <SelectCountry
        onCountrySelect={(country) => {
          onCountrySelect?.(country);
          onChange?.(country.code);
        }}
        defaultValue={countryDefaultValue}
      />
    );
  };

  return (
    <InputWrapper
      name={name || ''}
      control={control as Control<FieldValues>}
      label={label || 'Phone Number'}
      placeholder={placeholder || 'Enter Your Number'}
      required={required}
      rules={{ required, ...rules }}
      keyboardType="number-pad"
      preElement={
        controlled ? (
          <Controller
            control={control}
            name={(countryCodeName || 'countryCode') as Path<T>}
            render={({ field: { value: _value, onChange } }) => SelectCountryWrapper(onChange)}
          />
        ) : (
          SelectCountryWrapper()
        )
      }
      {...rest}
    />
  );
};
