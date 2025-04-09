import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to E-commerce Store</h1>
      <p className="mt-4 text-xl">Browse products from here.</p>
      <Link href="/products" className="mt-6 inline-block text-blue-500">Go to Products</Link>
    </div>
  );
}
