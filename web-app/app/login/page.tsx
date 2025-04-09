'use client';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { User } from '@/types/type';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const setToken = useUserStore((s) => s.setToken);

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', {
        username,
        password,
      });
      const token = res.data.token;

      const users = await api.get('/users');
      const user = users.data.find((u: User) => u.username === username);

      if (!user) throw new Error('User not found');

      // Save user and token in Zustand
      setUser({ ...user, token });
      setToken(token);

      // Save token in cookie
      Cookies.set('token', token, { expires: 1 }); // 1 day

      router.push('/products');
    } catch (err) {
      console.log("Invalid credentials", err);
      alert('Invalid credentials');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-4 w-full max-w-md p-6 border rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          className="w-full border p-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
