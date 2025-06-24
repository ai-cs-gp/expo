import React from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';

import { preInitialize, Providers } from '@/contexts';

import '@/assets/global.css';
import 'react-native-reanimated';
import '@formatjs/intl-locale/polyfill';

import { StatusBar } from 'expo-status-bar';

preInitialize();

export const unstable_settings = {
  initialRouteName: '(app)',
};

const FONTS = {
  cairo: require('@/assets/fonts/Cairo.ttf'),
  'cairo-reg': require('@/assets/fonts/cairo/Cairo-Regular.ttf'),
  'cairo-bold': require('@/assets/fonts/cairo/Cairo-Bold.ttf'),
};

const RootLayout = () => {
  useFonts(FONTS);

  return (
    <Providers>
      <StatusBar style="dark" />
      <Slot />
    </Providers>
  );
};

export default RootLayout;
