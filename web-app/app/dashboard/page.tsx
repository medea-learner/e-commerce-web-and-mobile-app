'use client';

import React, { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '@/lib/api';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/type';

const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products');
  return res.data;
};

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useQuery('products', fetchProducts, {
    staleTime: 300000, // 5 minutes
  });
  const [selected, setSelected] = useState<Product | null>(null);

  const deleteMutation = useMutation(
    async (id: number) => {
      await api.delete(`/products/${id}`);
    },
    {
      onSuccess: () => {
        // Invalidate to refresh products
        queryClient.invalidateQueries('products');
      },
    }
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (confirm('Are you sure you want to delete this product?')) {
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation]
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Product Dashboard</h1>
      <button
        onClick={() =>
          setSelected({
            id: 0,
            title: '',
            price: 0,
            description: '',
            category: '',
            image: '',
          })
        }
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Product
      </button>

      {selected && (
        <ProductForm
          initialData={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            queryClient.invalidateQueries('products');
          }}
        />
      )}

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product: Product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p>${product.price}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setSelected(product)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id!)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border p-4 rounded shadow animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        </div>
      ))}
    </div>
  );
}
