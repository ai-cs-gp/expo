import React, { ForwardedRef, forwardRef } from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { TextInput } from 'react-native';
import useMergedRef from '@react-hook/merged-ref';

import { Input, InputProps } from './Input';

type TRule = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

export type ControlledInputProps<T extends FieldValues> = InputProps & InputControllerType<T>;

export const ControlledInput = forwardRef(
  <T extends FieldValues>(props: ControlledInputProps<T>, ref: ForwardedRef<TextInput>) => {
    const { name, control, required, ...rest } = props;
    if (required) rest.rules = { ...rest.rules, required: `${props.label} is required` };
    const { field, fieldState } = useController<FieldValues>({
      name,
      control: control as Control<FieldValues>,
      rules: rest.rules,
    });
    const { onChange, onBlur, value } = field;
    const mergedRef = useMergedRef(ref, field.ref);

    return (
      <Input
        {...rest}
        ref={mergedRef}
        onChangeText={(text) => {
          onChange(text);
          if (typeof rest.onChangeText === 'function') rest.onChangeText(text);
        }}
        onBlur={onBlur}
        value={value}
        error={fieldState.error?.message}
      />
    );
  },
);

ControlledInput.displayName = 'ControlledInput';
