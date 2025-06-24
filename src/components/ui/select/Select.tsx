import React, { useEffect, useState } from 'react';

import { FlatList, FlatListProps, Text, TextProps, TouchableOpacity, View, ViewProps } from '@/components';
import { clx } from '@/utils';

type Props<T> = {
  className?: string;
  data: T[];
  keyExtractor: (item: T) => string;
  onChange: (value: T) => void;
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
  itemProps?: ViewProps;
  textProps?: TextProps;
  selectedItemClassName?: string;
  selectedTextClassName?: string;
  initialValue?: T;
} & Omit<FlatListProps<T>, 'renderItem' | 'data'>;

export const Select = <T,>({
  data,
  keyExtractor,
  onChange,
  renderItem,
  className,
  itemProps: { className: itemClassName, ...itemProps } = {},
  textProps: { className: textClassName, ...textProps } = {},
  selectedItemClassName,
  selectedTextClassName,
  initialValue,
  ...rest
}: Props<T>) => {
  const [selected, setSelected] = useState<T | null>(initialValue ?? null);

  useEffect(() => setSelected(initialValue ?? null), [initialValue]);

  return (
    <FlatList
      className={clx(className)}
      data={data}
      keyExtractor={(item) => keyExtractor(item)}
      renderItem={({ item }) => {
        const isSelected = selected === item;
        const _className = clx(itemClassName, isSelected && selectedItemClassName);
        const _textClassName = clx(textClassName, isSelected && selectedTextClassName);
        return (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
              onChange(item);
            }}
          >
            <View className={clx('p-3 rounded-lg border border-white/20 bg-white/5', _className)} {...itemProps}>
              {typeof item === 'string' ? (
                <Text className={clx(_textClassName)} {...textProps}>
                  {item}
                </Text>
              ) : (
                renderItem?.(item, isSelected)
              )}
            </View>
          </TouchableOpacity>
        );
      }}
      {...rest}
    />
  );
};
