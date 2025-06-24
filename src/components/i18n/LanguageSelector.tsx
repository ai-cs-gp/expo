import React from 'react';

import { Pressable, Text } from '@/components';
import { clx } from '@/utils';

type Props = {
  className?: string;
  text?: React.ComponentProps<typeof Text>;
};

export const LanguageSelector = ({ className, ...props }: Props) => {
  return (
    <Pressable className={clx(className)} {...props}>
      <Text className="text-white" size="xl">
        العربية
      </Text>
    </Pressable>
  );
};
