import { ReactNode } from 'react';
import { Href, useRouter } from 'expo-router';

import { Icon, IconName, Text, TouchableOpacity, View, ViewProps } from '@/components';
import { clx } from '@/utils';

export type SectionizedViewItemProps = {
  label?: string;
  subLabel?: string;
  main?: ReactNode;
  iconName?: IconName;
  iconSize?: number;
  hideChevron?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
  link?: Href;
} & ViewProps;

export const SectionizedViewItem = ({
  label,
  subLabel,
  main,
  iconName,
  iconSize = 28,
  icon,
  hideChevron,
  onPress,
  link,
  className,
  ...props
}: SectionizedViewItemProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
        if (link) router.push(link);
      }}
    >
      <View className={clx('flex-row items-center justify-between p-3', className)} {...props}>
        <View className="flex-row items-center gap-4">
          {iconName ? <Icon name={iconName} size={iconSize} /> : icon}
          <View>
            <View className="flex-col">
              {label ? (
                <>
                  {subLabel && (
                    <Text size="sm" className="text-gray-500">
                      {label}
                    </Text>
                  )}
                  <Text bold>{subLabel ?? label}</Text>
                </>
              ) : (
                main
              )}
            </View>
          </View>
        </View>
        {!hideChevron && <Icon name="chevron-forward" size={18} color="gray" />}
      </View>
    </TouchableOpacity>
  );
};
