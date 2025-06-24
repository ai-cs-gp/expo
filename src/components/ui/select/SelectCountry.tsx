import React from 'react';
import { View } from 'react-native';
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';

import { Emoji, Icon, Text, TouchableOpacity, TouchableOpacityProps } from '@/components';
import { useSheet } from '@/contexts';
import { countries } from '@/utils';

export type Country = {
  country: keyof typeof countries;
  flag: string;
  name: string;
  code: string;
};

export const DefaultCountry: Country = {
  country: 'EG',
  flag: 'eg',
  name: 'Egypt',
  code: '20',
};

export type SelectCountryProps = {
  onCountrySelect: (country: Country) => void;
  defaultValue?: Country;
} & TouchableOpacityProps;

const countriesSorted = Object.keys(countries)
  .sort()
  .map((country) => ({
    country,
    flag: country.toLowerCase(),
    name: countries[country as keyof typeof countries].name.common,
    code: countries[country as keyof typeof countries].callingCode[0],
  })) as Country[];

export const SelectCountry = ({ onCountrySelect, defaultValue, ...rest }: SelectCountryProps) => {
  const { sheetRef, setSheetContent, setSheetProps } = useSheet();

  const [country, setCountry] = React.useState<Country>(defaultValue || DefaultCountry);

  const bottomSheetRef = sheetRef; //React.useRef<BSheetRef>(null);

  const handleSelectCountry = (country: Country) => {
    setCountry(country);
    bottomSheetRef.current?.close();
    onCountrySelect?.(country);
  };

  const renderSheet = () => {
    setSheetProps({
      snapPoints: ['50%'],
      className: 'px-10 pt-9',
      enablePanDownToClose: true,
    });
    setSheetContent(<CountriesBottomSheet onSelectCountry={handleSelectCountry} />);
    bottomSheetRef.current?.expand();
  };

  return (
    <TouchableOpacity onPress={renderSheet} {...rest}>
      <View className="flex-row items-center justify-center px-2 gap-x-1">
        <Emoji name={country.flag} />
        <Text>+{country.code}</Text>
        <Icon name="chevron-down" size={18} />
      </View>

      {/* <View className="absolute bottom-0 left-0 right-0">
        <CountriesBottomSheet ref={bottomSheetRef} onSelectCountry={handleSelectCountry} />
      </View> */}
    </TouchableOpacity>
  );
};
type CountriesBottomSheetProps = {
  onSelectCountry: (country: Country) => void;
};

const CountriesBottomSheet = ({ onSelectCountry }: CountriesBottomSheetProps) => {
  return (
    <BottomSheetView className="px-4">
      <Text size="lg">Countries</Text>

      <BottomSheetFlatList
        data={countriesSorted}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectCountry(item)}>
            <View className="flex-row items-center justify-between px-4 py-3">
              <Emoji name={item.flag} />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </BottomSheetView>
  );
};
