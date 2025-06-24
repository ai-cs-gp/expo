/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, IconName, Text, TouchableOpacity, View } from '@/components';

type TabIconNameOrFunction = ((isSelected: boolean) => IconName) | IconName;
type Tab = {
  name: string;
  icon?: TabIconNameOrFunction;
  label: string;
  iconComponent?: React.ReactNode;
};

export const tabs: Tab[] = [
  {
    name: 'index',
    icon: (isSelected) => (isSelected ? 'home' : 'home-outline'),
    label: 'Home',
  },
  {
    name: 'notifications',
    icon: (isSelected) => (isSelected ? 'notifications' : 'notifications-outline'),
    label: 'Notifications',
  },
  {
    name: 'profile',
    icon: (isSelected) => (isSelected ? 'person' : 'person-outline'),
    label: 'Profile',
  },
];

export type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row overflow-hidden absolute bottom-0 bg-primary w-full px-auto justify-evenly p-1 h-[75] gap-x-2 rounded-t-xl"
      style={{ paddingBottom: insets.bottom, justifyContent: 'space-between' }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tab = tabs.find((tab) => tab.name === route.name);
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View className="items-center justify-center gap-2 size-full aspect-square">
              {tab?.iconComponent ? (
                tab.iconComponent
              ) : (
                <Icon
                  name={typeof tab?.icon === 'function' ? tab.icon(isFocused) : tab?.icon}
                  size={28}
                  color="white"
                />
              )}
              <Text className="text-xs text-center text-white" bold={isFocused}>
                {tab?.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
