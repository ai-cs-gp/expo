import { ReactNode, useState } from 'react';

import { FlatList, FlatListProps, Text, TouchableOpacity, View, ViewProps } from '@/components';
import { clx } from '@/utils';

type renderItemProps<T> = {
  item: T;
  index: number;
  isSelected: boolean;
};

type Props<T> = {
  label?: string;
  className?: string;
  data: T[];
  idExtractor: (item: T) => string;
  labelExtractor: (item: T) => string;
  renderItem?: (props: renderItemProps<T>) => ReactNode;
  onSelect?: (item: T) => void;
  itemClassName?: (isSelected: boolean) => string;
  textClassName?: (isSelected: boolean) => string;
  defaultSelected?: (data: T[]) => string;
  listProps?: Partial<FlatListProps<T>>;
} & ViewProps;

export const SliderInput = <T,>({
  label,
  className,
  data,
  idExtractor,
  labelExtractor,
  renderItem,
  onSelect,
  itemClassName,
  textClassName,
  defaultSelected,
  listProps,
  ...rest
}: Props<T>) => {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelected ? defaultSelected(data) : null);

  const defaultRenderItem = ({ item, isSelected }: renderItemProps<T>) => {
    return (
      <View
        className={clx(
          'px-6 py-3 rounded-2xl border border-1',
          { 'border-gray-500 bg-[#333333]': !isSelected },
          { 'border-primary bg-primary': isSelected },
          itemClassName?.(isSelected),
        )}
      >
        <Text className={clx({ 'text-white': !isSelected }, textClassName?.(isSelected))}>{labelExtractor(item)}</Text>
      </View>
    );
  };

  const itemRenderer = renderItem || defaultRenderItem;

  return (
    <View className={clx(className)} {...rest}>
      {label && (
        <Text size="lg" className="mb-2 font-sans">
          {label}
        </Text>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        // estimatedItemSize={viewportWidth * 0.305}
        horizontal={true}
        ItemSeparatorComponent={() => <View className="w-2.5" />}
        contentContainerClassName="px-5"
        data={data}
        keyExtractor={(item) => `slider-input-${idExtractor(item)}`}
        extraData={selectedId} // mandatory to re-render the list when selectedId changes
        renderItem={(renderItemProps) => {
          const currentId = idExtractor(renderItemProps.item);
          const isSelected = selectedId === currentId;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSelectedId(currentId);
                onSelect?.(renderItemProps.item);
              }}
            >
              {itemRenderer({ ...renderItemProps, isSelected })}
            </TouchableOpacity>
          );
        }}
        {...listProps}
      />
    </View>
  );
};
