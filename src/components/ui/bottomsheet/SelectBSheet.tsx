import React, { forwardRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { BSheet, Icon, Text, TouchableOpacity, View } from '@/components';
import { clx } from '@/utils';

type Props<T extends string> = Omit<
  {
    className?: string;
    title: string;
    currentlySelected: T;
    selectItems: readonly T[];
    onSelect: (item: T) => void;
  } & React.ComponentProps<typeof BSheet>,
  'children'
>;

export const SelectBSheet = forwardRef<BottomSheet, Props<string>>(
  ({ className, title, currentlySelected, selectItems, onSelect: onItemSelect }: Props<string>, ref) => {
    const [selectedItem, setSelectedItem] = useState(currentlySelected);
    const onSelect = (item: string) => {
      onItemSelect(item);
      setSelectedItem(item);
    };

    return (
      <BSheet ref={ref} className={clx('px-5 pt-10 gap-y-5', className)} snapPoints={['30%']}>
        <Text size="lg">{title}</Text>

        <BottomSheetFlatList
          data={selectItems}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View className="border-b border-gray-dark" />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item)}>
              <View className="flex-row items-center justify-between px-4 py-[20]">
                <Text className="text-white">{item}</Text>
                {selectedItem === item && <Icon name="checkmark" color="white" size={20} />}
              </View>
            </TouchableOpacity>
          )}
        />
      </BSheet>
    );
  },
);

SelectBSheet.displayName = 'SelectBSheet';
