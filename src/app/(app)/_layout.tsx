import React from 'react';
import { Redirect, Stack } from 'expo-router';

let count = 0;

const AppLayout = () => {
  // if (!isAuth) {
  //   return <Redirect href="/auth" />;
  // }
  // if (count === -1) {
  if (count === 0) {
    // make this 0 for auth
    count++;
    return <Redirect href="/auth" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
