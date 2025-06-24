import React from 'react';
import { ActivityIndicator } from 'react-native';

import {
  Icon,
  IconName,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from '@/components';
import { clx } from '@/utils';

export type ButtonProps = {
  title?: string;
  onPress: () => void;
  className?: string;
  textProps?: TextProps;
  iconName?: IconName;
  iconSize?: number;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  wrapperProps?: TouchableOpacityProps;
  loading?: boolean;
  disabled?: boolean;
} & ViewProps;

export const Button = ({
  title,
  onPress,
  className,
  textProps: { className: textClassName, ...textProps } = {},
  iconName,
  iconSize = 20,
  icon,
  iconPosition = 'left',
  wrapperProps: { className: wrapperClassName, ...wrapperRest } = {},
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      className={clx('relative center', wrapperClassName)}
      {...wrapperRest}
    >
      <View
        className={clx(
          'gap-2 bg-primary rounded-lg p-3 center flex-row',
          { 'bg-primary/60': loading },
          { 'flex-row-reverse': iconPosition === 'right' },
          { 'opacity-50': disabled },
          className,
        )}
        {...rest}
      >
        {loading && (
          <View>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
        {iconName && <Icon name={iconName} size={iconSize} />}
        {!!icon && icon}
        {title && (
          <Text className={clx('text-white', textClassName)} size="lg" bold {...textProps}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
