import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/type';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border p-4 rounded hover:shadow cursor-pointer">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="h-40 object-contain mx-auto"
        />
        <h2 className="font-semibold text-lg truncate">{product.title}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);
