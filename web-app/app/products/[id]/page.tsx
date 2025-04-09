import { api } from '@/lib/api';
import Image from 'next/image';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  try {
    const res = await api.get(`/products/${params.id}`);
    const product = res.data;

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="relative w-[200px] aspect-[2/3] mx-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            priority
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-400">{product.description}</p>
        <p className="text-gray-500 mt-2">{product.category}</p>
        <p className="text-xl font-semibold mt-2">${product.price}</p>
        <p className="text-sm mt-2">
          Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
        </p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product details:', error);
    return <div className="p-6 text-center">Failed to load product details.</div>;
  }
}
