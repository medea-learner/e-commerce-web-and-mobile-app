'use client';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';

export default function Navbar() {
  const user = useUserStore((s) => s.user);

  return (
    <nav className="flex flex-wrap justify-between items-center p-4 shadow">
      <div className="w-full sm:w-auto flex justify-between sm:justify-start flex-wrap gap-2 sm:gap-4">
        <Link href="/products">Products</Link>
        {user && <Link href="/dashboard">Dashboard</Link>}
        <div className="block sm:hidden">{user ? `👤 ${user.username}` : <Link href="/login">Login</Link>}</div>
      </div>

      {/* Desktop login at the end */}
      <div className="hidden sm:block mt-2 sm:mt-0">
        {user ? `👤 ${user.username}` : <Link href="/login">Login</Link>}
      </div>
    </nav>

  );
}
