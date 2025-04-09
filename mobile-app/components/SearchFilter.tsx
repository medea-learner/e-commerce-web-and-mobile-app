import { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { SearchFilterProps } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';

export default function SearchFilter({
  setSearch,
  setFilter,
  categories,
}: SearchFilterProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Debounce search input with 300ms delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(searchText);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  // Immediate category filter update
  useEffect(() => {
    setFilter(selectedCategory);
  }, [selectedCategory]);

  return (
    <View className="mb-4 mt-4">
      {/* Search Input */}
      <View className="flex-row items-center bg-white rounded-lg px-4 py-2 shadow-sm shadow-gray-200 mb-4">
        <Feather name="search" size={20} color="#6B7280" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 ml-2 text-gray-900 text-base"
          value={searchText}
          onChangeText={setSearchText}
          accessibilityLabel="Search products by title"
        />
      </View>

      {/* Category Picker */}
      <View className="bg-white rounded-lg shadow-sm shadow-gray-200">
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
          dropdownIconColor="#6B7280"
          accessibilityLabel="Select product category"
          style={{ color: '#111827', padding: 12 }}
        >
          <Picker.Item 
            label="All Categories" 
            value="" 
            style={{ fontSize: 16 }}
          />
          {categories.map((cat) => (
            <Picker.Item 
              key={cat} 
              label={cat.charAt(0).toUpperCase() + cat.slice(1)} 
              value={cat} 
              style={{ fontSize: 16 }}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}