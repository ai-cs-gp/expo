import React from 'react';
import { ViewProps } from 'react-native';

import { Logo, View } from '@/components';
import { clx } from '@/utils';

type Props = {
  className?: string;
} & ViewProps;

export const AuthHeader = ({ className, ...props }: Props) => {
  return (
    <View className={clx('flex-row min-h-60 p-5 items-center justify-center bg-primary', className)} {...props}>
      <Logo className="size-20" width={180} height={130} />
    </View>
  );
};
