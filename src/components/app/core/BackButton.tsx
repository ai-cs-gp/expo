import React from 'react';
import { Pressable } from 'react-native';
import { Href, useRouter } from 'expo-router';

import { Icon } from '@/components';
import { clx } from '@/utils';

type Props = {
  className?: string;
  replaceWith?: Href;
  size?: number;
  color?: string;
};

export const BackButton = ({ className, size = 24, color = 'white' }: Props) => {
  const router = useRouter();

  return (
    router.canGoBack() && (
      <Pressable
        onPress={() => {
          router.back();
        }}
        className={clx('bg-gray-300 rounded-full p-[5]', className)}
      >
        <Icon name="arrow-back" size={size} color={color} />
      </Pressable>
    )
  );
};
