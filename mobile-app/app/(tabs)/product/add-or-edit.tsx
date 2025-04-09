import { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import ProductForm from '@/components/ProductForm';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { View, Text, ActivityIndicator } from 'react-native';

export default function AddOrEditProduct() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(Boolean(id));

  const fetchProduct = useCallback(async () => {
    if (id) {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    } else {
      setProduct({
        title: '',
        price: undefined,
        description: '',
        category: '',
        image: '',
      });
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-xl text-gray-600 mt-4">Loading...</Text>
      </View>
    );
  }

  return <ProductForm initialData={product} />;
}
