import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { api } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch product list
  const fetchData = useCallback(async () => {
    try {
      const res = await api.get('/products');
      setData(res.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete product and update list locally
  const handleDelete = useCallback(async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setData((prevData) => prevData.filter((product) => product.id !== id));
      Alert.alert('Success', 'Product deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete product');
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized FlatList renderItem to avoid unnecessary re-renders.
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        isAdmin
        onDelete={() => handleDelete(item.id!)}
      />
    ),
    [handleDelete]
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <View className="flex-1 p-4">
      <TouchableOpacity
        className="bg-blue-600 px-4 py-2 rounded-lg self-end mb-4 flex-row items-center"
        onPress={() => router.push('/product/add-or-edit')}
      >
        <Feather name="plus" size={16} color="white" />
        <Text className="text-white ml-2 font-semibold">Add Product</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={11}
      />
    </View>
  );
}

// Skeleton components

const DashboardSkeleton = () => {
  // Display a few skeleton product cards so the user has a visual cue while loading
  return (
    <View className="flex-1 p-4">
      {/* Add Product Button Skeleton */}
      <View className="bg-blue-600 px-4 py-2 rounded-lg self-end mb-4 flex-row items-center opacity-50">
        <Feather name="plus" size={16} color="white" />
        <View className="w-20 h-4 bg-gray-300 ml-2 rounded" />
      </View>
      
      <FlatList
        data={[...Array(6).keys()]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <ProductCardSkeleton />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const ProductCardSkeleton = React.memo(() => {
  return (
    <View className="p-3 rounded-xl bg-white shadow-sm shadow-gray-200 mb-4">
      {/* Image placeholder */}
      <View className="w-full h-40 bg-gray-200 rounded-lg mb-4" />
      {/* Title placeholder */}
      <View className="h-4 bg-gray-200 rounded mb-2" />
      {/* Category placeholder */}
      <View className="h-3 bg-gray-200 rounded mb-2 w-1/2" />
      {/* Price placeholder */}
      <View className="h-5 bg-gray-200 rounded w-1/4" />
    </View>
  );
});
