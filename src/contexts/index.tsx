import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';

import { ConsoleInjector } from '@/utils';

import { ApolloProvider } from './apollo.context';
import { UserProvider } from './user.context';

export * from './user.context';
export * from './apollo.context';

type Props = {
  children: React.ReactNode;
};

export const preInitialize = () => {
  LogBox.ignoreLogs(['Require cycle:']);

  // Just for testing (fixing keyboard white flicker on appearance)
  SystemUI.setBackgroundColorAsync('transparent');

  ConsoleInjector.inject();

  // Keep the splash screen visible while we load resources
  SplashScreen.preventAutoHideAsync();
};

export const Providers = ({ children }: Props) => {
  // const [loaded] = useFonts({
  //   Gotham: require('@/assets/fonts/GothamMedium.ttf'),
  //   GothamBold: require('@/assets/fonts/Gotham-Bold.otf'),
  // });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <>
      <StatusBar animated style="dark" />

      <GestureHandlerRootView className="flex-1">
        {/* <BottomSheetModalProvider> */}
        <ApolloProvider>
          <UserProvider>
            {children}
            <Toast />
          </UserProvider>
        </ApolloProvider>
        {/* </BottomSheetModalProvider> */}
      </GestureHandlerRootView>
    </>
  );
};
