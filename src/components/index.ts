import { ComponentProps } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';

export * from './ui';
export * from './app';
export * from './i18n';
export { FlashList, FlashListProps } from '@shopify/flash-list';
export { Ionicons as Icon } from '@expo/vector-icons';
export { View, ViewProps, Alert, Pressable, FlatList, FlatListProps } from 'react-native';
export { Image } from 'expo-image';
export type Icon = ComponentProps<typeof Ionicons>['name'];
export type IconName = ComponentProps<typeof Ionicons>['name'];

TouchableOpacity.defaultProps.activeOpacity = 0.8;

export { TouchableOpacity, TouchableOpacityProps, BottomSheet };
