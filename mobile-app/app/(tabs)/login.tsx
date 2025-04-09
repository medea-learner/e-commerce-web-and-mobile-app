import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '@/lib/api';
import { useUserStore } from '@/context/UserContext';
import { User } from '@/types';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;

      const users = await api.get('/users');
      const user = users.data.find((u: User) => u.username === username);

      if (!user) throw new Error('User not found');

      setToken(token);
      setUser({ ...user, token });

      router.replace('/(tabs)/dashboard');
    } catch (err) {
      console.log("Invalid credentials", err);
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">

      <TextInput
        placeholder="Username"
        className="border border-gray-300 rounded px-4 py-3 mb-4"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        className="border border-gray-300 rounded px-4 py-3 mb-6"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-blue-600 rounded p-3"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-medium">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
