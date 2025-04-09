import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Product } from '@/types';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return (
    <View className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-xl text-gray-600 mt-4">Loading...</Text>
      </View>
  );

  return (
    <ScrollView className='bg-white' contentContainerStyle={{ padding: 24 }}>
      <Image
        source={{ uri: product.image }}
        className="w-48 h-64 self-center mb-4"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold mb-2">{product.title}</Text>
      <Text className="text-gray-500 mb-2">{product.description}</Text>
      <Text className="text-gray-400">{product.category}</Text>
      <Text className="text-lg font-bold mt-2">${product.price}</Text>
      <Text className="text-sm mt-2">
        Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)
      </Text>
    </ScrollView>
  );
}
