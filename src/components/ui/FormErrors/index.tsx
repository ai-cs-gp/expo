import React from 'react';

import { Text, View, ViewProps } from '@/components';
import { clx } from '@/utils';

type FormErrorsProps = {
  errors: string[];
} & ViewProps;

export const FormErrors = ({ errors, className, ...props }: FormErrorsProps) => {
  return (
    !!errors.length && (
      <View className={clx('flex-col p-3 bg-red-300/20 border border-red-300/60 rounded-2xl', className)} {...props}>
        <Text bold className="mb-2 text-red-300">
          Error
        </Text>

        {errors.map((error) => (
          <Text key={error} size="sm" className="text-red-300">
            • {error}
          </Text>
        ))}
      </View>
    )
  );
};
