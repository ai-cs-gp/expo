import { SectionizedViewItem, SectionizedViewItemProps, Spacer, Text, View, ViewProps } from '@/components';
import { clx } from '@/utils';

export type SectionizedViewTable = {
  title: string;
  items: SectionizedViewItemProps[][];
  wrapperProps?: ViewProps;
} & ViewProps;

export const SectionizedViewTable = ({
  title,
  items,
  className,
  wrapperProps: { className: wrapperClassName, ...wrapperProps } = {},
  ...props
}: SectionizedViewTable) => {
  return (
    <View className={clx(className)} {...props}>
      <Text size="lg" className="text-gray-400">
        {title}
      </Text>
      <Spacer height={10} />
      <View className={clx('bg-gray-400/10 rounded-xl', wrapperClassName)} {...wrapperProps}>
        {items.map((item, index) => (
          <View key={index}>
            {item.map((subItem, subIndex) => (
              <View key={subIndex}>
                <SectionizedViewItem {...subItem} />
                {subIndex !== item.length - 1 && <View className="h-[1] bg-gray-400/15" />}
              </View>
            ))}
            {index !== items.length - 1 && <View className="h-[1] bg-gray-400/30" />}
          </View>
        ))}
      </View>
    </View>
  );
};
