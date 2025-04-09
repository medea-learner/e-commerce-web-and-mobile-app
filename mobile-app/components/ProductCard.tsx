import React, { useCallback } from 'react';
import { Product } from '@/types';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

type Props = {
  product: Product;
  isAdmin?: boolean;
  onDelete?: () => void;
};

function ProductCard({ product, isAdmin = false, onDelete }: Props) {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push(`/product/${product.id}`);
  }, [isAdmin, product.id, router]);

  const handleEdit = useCallback(() => {
    router.push(`/product/add-or-edit?id=${product.id}`);
  }, [product.id, router]);

  return (
    <TouchableOpacity
      className="p-3 rounded-xl bg-white overflow-hidden shadow-sm shadow-gray-200 mb-4 mr-2"
      onPress={handlePress}
      activeOpacity={isAdmin ? 1 : 0.7}
    >
      <View className="flex-1 flex flex-col">
        {/* Admin Actions */}
        {isAdmin && (
          <View className="w-full z-10">
            <View className="flex flex-row self-end bg-white/90 p-1 rounded-bl-lg">
              <TouchableOpacity onPress={handleEdit} className="p-1">
                <Feather name="edit" size={18} color="#2563eb" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} className="p-1 ml-2">
                <Feather name="trash-2" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Image
          source={{ uri: product.image }}
          className="w-48 h-64 self-center mb-4"
          resizeMode="contain"
        />
        <Text className="font-semibold text-base mb-1" style={{ color: "#1a1f71", fontSize: 15 }}>
          {product.title}
        </Text>
        {/* <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
          {product.description}
        </Text> */}
        <Text className="text-sm" style={{ color: "#073980" }}>
          {product.category}
        </Text>
        <Text className="text-lg font-bold mt-2" style={{ color: "#00416A" }}>
          ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Wrap the component with React.memo so it only re-renders if props change.
export default React.memo(ProductCard);
