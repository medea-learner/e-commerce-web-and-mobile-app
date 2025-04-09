'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { api } from '@/lib/api';
import { Product } from '@/types/type';
import SearchFilter from '@/components/SearchFilter';
import ProductCard from '@/components/ProductCard';

const fetchProducts = async (filter: string): Promise<Product[]> => {
  // If a filter is applied, fetch products from a specific category
  const endpoint = filter ? `/products/category/${filter}` : '/products';
  const res = await api.get(endpoint);
  return res.data;
};

const fetchCategories = async (): Promise<string[]> => {
  const res = await api.get('/products/categories');
  return res.data;
};

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Fetch products based on the current category filter
  const {
    data: products = [],
    isLoading: productsLoading,
  } = useQuery(['products', filter], () => fetchProducts(filter), {
    staleTime: 300000, // 5 minutes
  });

  // Fetch list of categories
  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useQuery('categories', fetchCategories, { staleTime: Infinity });

  // Memoize filtered products based on the search input
  const filteredProducts = useMemo(() => {
    return products.filter((p: Product) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <SearchFilter
        categories={categories}
        setSearch={setSearch}
        setFilter={setFilter}
        search={search}
        filter={filter}
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
