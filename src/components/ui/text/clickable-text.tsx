import React from 'react';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

import { TouchableOpacity } from '@/components';

import { Text, TextProps } from './Text';

export type ClickableTextProps = {
  onPress: () => void;
  containerProps?: TouchableOpacityProps;
} & TextProps;

export const ClickableText = ({ children, containerProps, onPress, ...props }: ClickableTextProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()} {...containerProps}>
      <Text {...props}>{children}</Text>
    </TouchableOpacity>
  );
};
