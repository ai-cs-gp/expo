import React from 'react';
import { Link, Stack } from 'expo-router';

import { Text, View } from '@/components';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="items-center justify-center flex-1">
        <Text className="font-extrabold text-9xl">404</Text>
        <Text>This screen doesn't exist.</Text>

        <Link className="p-3 mt-4 bg-slate-300" href="/_sitemap">
          <Text>Check Stitemap</Text>
        </Link>
      </View>
    </>
  );
}
