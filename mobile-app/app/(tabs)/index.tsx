import React, { useMemo, useState, useCallback } from 'react';
import { Text, View, FlatList } from 'react-native';
import { api } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import SearchFilter from '@/components/SearchFilter';
import { useQuery } from 'react-query';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Using React Query for caching and automatic retries
  const { data: products, isLoading: productsLoading } = useQuery(
    'products',
    () => api.get('/products').then(res => res.data),
    { staleTime: 5 * 60 * 1000 } // Cache for 5 minutes
  );

  const { data: categories } = useQuery(
    'categories',
    () => api.get('/products/categories').then(res => res.data),
    { staleTime: Infinity } // Categories rarely change
  );

  // Memoized filtered data calculation
  const filteredData = useMemo(() => {
    if (!products) return [];
    
    return products.filter((product: Product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Memoize the renderItem callback to prevent unnecessary re-renders
  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  // Skeleton loader for initial load
  if (productsLoading) {
    return (
      <View className="flex-1 px-4 bg-gray-50">
        <SearchFilterSkeleton />
        <FlatList
          data={[...Array(8).keys()]}
          renderItem={() => <ProductCardSkeleton />}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 bg-gray-100">
      <SearchFilter
        setSearch={setSearchQuery}
        setFilter={setSelectedCategory}
        categories={categories || []}
      />
      
      <FlatList
        data={filteredData}
        keyExtractor={(item: Product) => item.id!.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={11}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-12">
            <Text className="text-gray-500 text-lg">No products found</Text>
          </View>
        }
      />
    </View>
  );
}

// Optionally memoize skeleton components if needed
const SearchFilterSkeleton = React.memo(() => (
  <View className="mb-4 mt-4">
    <View className="h-12 bg-gray-200 rounded-lg mb-4" />
    <View className="h-14 bg-gray-200 rounded-lg" />
  </View>
));

const ProductCardSkeleton = React.memo(() => (
  <View className="p-3 rounded-xl bg-white overflow-hidden shadow-sm shadow-gray-200 mb-4 mr-2">
    <View className="w-48 h-64 bg-gray-200 mb-4 self-center" />
    <View className="h-5 bg-gray-200 mb-2 w-3/4" />
    <View className="h-4 bg-gray-200 w-1/2" />
    <View className="h-5 bg-gray-200 mt-2 w-1/3" />
  </View>
));
