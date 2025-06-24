import React from 'react';
import { useRouter } from 'expo-router';

import { Button, Input, Screen, Spacer, Text, TouchableOpacity, View } from '@/components';

const Login = () => {
  return (
    <Screen authHeader>
      <View className="flex-1 center">
        <Text bold size="h2">
          Login
        </Text>
      </View>
      <LoginForm />
    </Screen>
  );
};

export default Login;

const LoginForm = () => {
  const router = useRouter();

  return (
    <View>
      <Input label="Email" placeholder="Email" required />
      <Spacer height={20} />
      <Input label="Password" placeholder="Password" required />
      <Spacer height={30} />
      <Button
        onPress={() => {
          router.push('/');
        }}
        title="Login"
      />
      <View className="center flex-row gap-2 h-[50]">
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text className="text-blue-500 underline">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
