'use client';

import React, { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { Product } from '@/types/type';

const ProductForm: React.FC<{
  initialData: Partial<Product>;
  onClose: () => void;
  onSaved: () => void;
}> = ({ initialData, onClose, onSaved }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [image, setImage] = useState(initialData.image || '');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const payload = { title, price, description, category, image };

      if (initialData.id) {
        await api.put(`/products/${initialData.id}`, payload);
        alert('Product updated successfully!');
      } else {
        await api.post('/products', payload);
        alert("Product created successfully!")
      }
      onSaved();
    },
    [initialData.id, title, price, description, category, image, onSaved]
  );

  return (
    <div className="text-gray-500 fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">
          {initialData.id ? 'Edit' : 'Add'} Product
        </h2>

        <input
          placeholder="Title"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Price"
          className="w-full border p-2"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Category"
          className="w-full border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          placeholder="Image URL"
          className="w-full border p-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onClose} className="text-gray-600 underline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(ProductForm);
