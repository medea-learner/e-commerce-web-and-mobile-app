import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { useRouter } from 'expo-router';

export default function ProductForm({
  initialData,
}: {
  initialData: Partial<Product>;
}) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  // Populate form inputs from initialData on load or when it changes.
  useEffect(() => {
    setTitle(initialData.title || '');
    setPrice(initialData.price || null);
    setDescription(initialData.description || '');
    setCategory(initialData.category || '');
    setImage(initialData.image || '');
  }, [initialData]);

  const handleSubmit = useCallback(async () => {
    const payload = { title, price, description, category, image };

    try {
      if (initialData.id) {
        await api.put(`/products/${initialData.id}`, payload);
        Alert.alert('Success', 'Product updated successfully!');
      } else {
        await api.post('/products', payload);
        Alert.alert('Success', 'Product added successfully!');
        router.back();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save product');
    }
  }, [title, price, description, category, image, initialData.id, router]);

  return (
    <View className="bg-white flex-1 p-4">
      <ScrollView 
        className="w-full"
        contentContainerStyle={{ 
          padding: 24,
          width: '100%'
        }}
      >
        {/* Title Input */}
        <View className="w-full mb-4">
          <Text className="text-lg text-gray-700 my-2">Title</Text>
          <TextInput
            placeholder="Product title"
            className="border p-3 rounded-md text-base w-full"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Price Input */}
        <View className="w-full mb-4">
          <Text className="text-lg text-gray-700 my-2">Price</Text>
          <TextInput
            placeholder="Product price"
            className="border p-3 rounded-md text-base w-full"
            value={price?.toString()}
            onChangeText={(p: string) => setPrice(p ? parseFloat(p) : null)}
            keyboardType="numeric"
          />
        </View>

        {/* Category Input */}
        <View className="w-full mb-4">
          <Text className="text-lg text-gray-700 my-2">Category</Text>
          <TextInput
            placeholder="Product category"
            className="border p-3 rounded-md text-base w-full"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Image URL Input */}
        <View className="w-full mb-4">
          <Text className="text-lg text-gray-700 my-2">Image URL</Text>
          <TextInput
            placeholder="Image URL"
            className="border p-3 rounded-md text-base w-full"
            value={image}
            onChangeText={setImage}
          />
        </View>

        {/* Description Input */}
        <View className="w-full mb-6">
          <Text className="text-lg text-gray-700 my-2">Description</Text>
          <TextInput
            placeholder="Product description"
            className="border p-3 rounded-md text-base h-24 w-full"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          onPress={handleSubmit} 
          className="bg-blue-600 px-4 py-2 rounded w-full"
        >
          <Text className="text-white text-center font-medium">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
