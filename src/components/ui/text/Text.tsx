import React from 'react';
import { Text as RNText } from 'react-native';
import { VariantProps } from 'class-variance-authority';

import { clx } from '@/utils';

import { textStyles } from './Text.styles';

export type TextProps = {
  bold?: boolean;
  semiBold?: boolean;
  uppercase?: boolean;
} & React.ComponentProps<typeof RNText> &
  VariantProps<typeof textStyles>;

export const Text = ({ className, children, uppercase, size, bold = false, semiBold = false, ...props }: TextProps) => {
  return (
    <RNText
      className={clx(
        textStyles({ size }),
        'font-cairo',
        { ['font-[600]']: semiBold },
        { ['font-cairo-bold']: bold || className?.includes('font-bold') || className?.includes('font-extrabold') },
        { ['uppercase']: uppercase },
        className,
      )}
      {...props}
    >
      {children}
    </RNText>
  );
};
