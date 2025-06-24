import React, { forwardRef } from 'react';
import { TextInputProps as RNTextInputProps, TextInput, ViewProps } from 'react-native';

import { Text, TextProps, View } from '@/components';
import { clx } from '@/utils';

export type InputProps = {
  label?: string | null;
  preElement?: React.ReactNode;
  postElement?: React.ReactNode;
  labelProps?: TextProps;
  containerClassName?: string;
  containerProps?: Omit<ViewProps, 'className'>;
  wrapperClassName?: string;
  error?: string;
  required?: boolean;
} & RNTextInputProps;

export type InputRefType = React.ComponentProps<typeof Input>['ref'];

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      preElement,
      postElement,
      className,
      labelProps,
      containerClassName,
      wrapperClassName,
      containerProps,
      error,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <View className={clx('flex-col', containerClassName)} {...containerProps}>
        {label && (
          <Text size="sm" {...labelProps}>
            {label} {required && <Text className="text-red-700">*</Text>}
          </Text>
        )}

        <View
          className={clx('relative flex-row mt-1 px-2 border rounded-lg border-gray-900/20 h-14', wrapperClassName)}
        >
          {preElement && (
            <View className="flex-row items-center gap-x-2">
              {preElement}
              <View className="w-[1px] h-[80%] bg-gray-900/20" />
            </View>
          )}

          <TextInput ref={ref} {...props} className={clx('flex-1 mx-3 placeholder:text-gray-dark', className)} />

          {postElement && <View className="flex-row items-center gap-x-2">{postElement}</View>}
        </View>

        {error && (
          <Text size="xs" className="mt-2 text-red-700 mx-7">
            {error}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

export { Input };
