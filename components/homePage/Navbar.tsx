import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';

export const Navbar = () => {
  return (
    <div>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-gray-900 dark:text-white">
            সুফ্ফাহ সেন্টার
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">হোম</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">সম্পর্কে</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">যোগাযোগ</Button>
            </Link>
            <Link href="/create">
              <Button variant="default" className="hidden md:flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                মাসালা-মাসায়েল লিখুন
              </Button>
              <Button variant="default" size="icon" className="md:hidden">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};