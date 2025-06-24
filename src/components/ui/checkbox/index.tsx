import React, { useState } from 'react';
import { View, ViewProps } from 'react-native';
import { Checkbox as ExpoCheckbox, CheckboxProps as ExpoCheckboxProps } from 'expo-checkbox';

import { Text } from '../text';

export type CheckboxProps = {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkboxProps?: ExpoCheckboxProps;
} & ViewProps;

const Checkbox = ({
  label,
  checked = false,
  onCheckedChange,
  checkboxProps: { style, ...checkBoxRest } = {},
  ...props
}: CheckboxProps) => {
  const [isChecked, setChecked] = useState(checked);

  return (
    <View className="flex-row items-center gap-x-2" {...props}>
      <ExpoCheckbox
        value={isChecked}
        onValueChange={(value) => {
          setChecked(value);
          onCheckedChange?.(value);
        }}
        style={{
          borderRadius: 4,
          width: 18,
          height: 18,
          ...(style as object),
        }}
        {...checkBoxRest}
      />
      {!!label && <Text>{label}</Text>}
    </View>
  );
};

export { Checkbox };
