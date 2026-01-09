'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from './AuthProvider';
import { BlogProvider } from './BlogProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <BlogProvider>
            {children}
          </BlogProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}