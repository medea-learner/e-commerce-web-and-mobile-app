import { Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProductLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ paddingHorizontal: 12 }}>
            <Feather name="arrow-left" size={20} color="#000" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Product Details' }} />
      <Stack.Screen name="add-or-edit" options={{ title: 'Add / Edit Product' }} />
    </Stack>
  );
}
