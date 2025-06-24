import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { TextInput, TextInputProps } from './';

type Props<T extends Record<string, string>> = Omit<TextInputProps<T>, 'name'> & {
  label?: string;
  placeholder?: string;
  name?: string;
};

export const PasswordInput = <T extends Record<string, string>>({
  label = 'Password',
  placeholder = '********',
  control,
  name,
  rules,
  ...rest
}: Props<T>) => {
  const [showPassword, setShowPassword] = React.useState(true);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const inputProps = {
    control: control as Control<FieldValues>,
    name: name || 'password',
    rules: rules,
  };

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      secureTextEntry={showPassword}
      {...inputProps}
      postElement={
        <TouchableOpacity onPress={handleShowPassword}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="white" />
        </TouchableOpacity>
      }
      {...rest}
    />
  );
};
