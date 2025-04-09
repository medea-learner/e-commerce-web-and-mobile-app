'use client';

import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';

const roboto = Roboto({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={roboto.className}>
        <Navbar />
        {/* Wrap your app with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <main>{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
