import { ReactNode } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';

import { clx } from '@/utils';

import { Text } from '../text';

export type TagProps = {
  label?: string;
  className?: string;
  children?: ReactNode;
  onPress?: () => void;
} & ViewProps;

export const Tag = ({ label, className, children, onPress, ...props }: TagProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.8 : 1}>
      <View {...props} className={clx('bg-primary rounded-lg px-3 py-[2] center min-w-[30]', className)}>
        {!!label && (
          <Text className="pt-1 text-white" size="sm">
            {label}
          </Text>
        )}
        {children}
      </View>
    </TouchableOpacity>
  );
};
