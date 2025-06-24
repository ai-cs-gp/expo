import React from 'react';
import { useRouter } from 'expo-router';

import { Button, Input, Screen, Spacer, Text, TouchableOpacity, View } from '@/components';

const Register = () => {
  return (
    <Screen authHeader>
      <View className="flex-1 center">
        <Text bold size="h2">
          Register
        </Text>
      </View>
      <RegisterForm />
    </Screen>
  );
};

export default Register;

const RegisterForm = () => {
  const router = useRouter();

  return (
    <View>
      <Input label="First Name" placeholder="John" required />
      <Spacer height={20} />
      <Input label="Last Name" placeholder="Doe" required />
      <Spacer height={20} />
      <Input label="Email" placeholder="Email" required />
      <Spacer height={20} />
      <Input label="Password" placeholder="Password" required />
      <Spacer height={30} />
      <Button
        onPress={() => {
          // handle register
        }}
        title="Register"
      />
      <View className="center flex-row gap-2 h-[50]">
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth')}>
          <Text className="text-blue-500 underline">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
