import React from 'react';
import { Control, FieldValues } from 'react-hook-form';

import { ControlledInput, ControlledInputProps } from '.';
import { Input } from './Input';

export type TextInputProps<T extends Record<string, string>> = Partial<
  React.ComponentProps<typeof Input> & ControlledInputProps<T>
> & {
  label?: string;
  placeholder?: string;
  name: string;
};

export const TextInput = <T extends Record<string, string>>({
  label,
  placeholder,
  control,
  name,
  rules,
  ...rest
}: TextInputProps<T>) => {
  const InputWrapper = control ? ControlledInput : Input;

  const inputProps = {
    control: control as Control<FieldValues>,
    name: name,
    rules: rules,
  };

  return <InputWrapper label={label} {...inputProps} placeholder={placeholder} {...rest} />;
};
