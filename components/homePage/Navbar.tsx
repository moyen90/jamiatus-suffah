"use client"

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { LogIn, HelpCircle } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { useAuth } from '@/providers/AuthProvider';
import { UserNav } from './UserNav';

export const Navbar = () => {
  const { user, loading, isAdmin } = useAuth();

  return (
    <div>
      <nav className="glass sticky top-0 z-50 border-b border-primary/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity">
            সুফ্ফাহ <span className="text-gradient">সেন্টার</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Link href="/" className="hidden md:block">
              <Button variant="ghost" className="font-semibold px-4 py-2 hover:bg-primary/5">হোম</Button>
            </Link>
            <Link href="/about" className="hidden md:block">
              <Button variant="ghost" className="font-semibold px-4 py-2 hover:bg-primary/5">সম্পর্কে</Button>
            </Link>

            <div className="h-6 w-px bg-primary/10 mx-2 hidden md:block" />

            <Link href="/ask">
              <Button className="hidden md:flex items-center gap-2 font-bold rounded-xl px-5">
                <HelpCircle className="h-4 w-4" />
                মাসালা-মাসায়েল জিজ্ঞাসা করুন
              </Button>
              <Button size="icon" className="md:hidden rounded-xl">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </Link>

            {!loading && (
              <>
                {user ? (
                  <UserNav />
                ) : (
                  <Link href="/login">
                    <Button variant="secondary" className="flex items-center gap-2 font-bold rounded-xl px-5 border border-primary/5">
                      <LogIn className="h-4 w-4" />
                      লগইন
                    </Button>
                  </Link>
                )}
              </>
            )}

            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};