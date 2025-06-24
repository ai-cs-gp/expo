import React, { forwardRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { BSheet, Icon, Text, TouchableOpacity, View } from '@/components';
import { clx } from '@/utils';

const languages = ['English', 'Arabic'];

type Props = Omit<
  {
    className?: string;
  } & React.ComponentProps<typeof BSheet>,
  'children'
>;

export const LanguageBSheet = forwardRef<BottomSheet, Props>(({ className }: Props, ref) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const onLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <BSheet ref={ref} className={clx('px-5 pt-10 gap-y-5', className)} snapPoints={['30%']}>
      <Text size="lg">Languages</Text>

      <BottomSheetFlatList
        data={languages}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View className="border-b border-gray-dark" />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onLanguageSelect(item)}>
            <View className="flex-row items-center justify-between px-4 py-[20]">
              <Text className="text-white">{item}</Text>
              {selectedLanguage === item && <Icon name="checkmark" color="white" size={20} />}
            </View>
          </TouchableOpacity>
        )}
      />
    </BSheet>
  );
});

LanguageBSheet.displayName = 'LanguageBSheet';
