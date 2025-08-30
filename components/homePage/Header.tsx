import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';

export const Header = () => {
  return (
    <div className=''>
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-indigo-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">সুফ্ফাহ সেন্টার এ স্বাগতম</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            সুফ্ফাহ সেন্টার হলো জামিয়াতুসসুফ্ফাহ-এর অধীনে পরিচালিত একটি বিশেষ কেন্দ্র, যেখানে নির্ভরযোগ্য ও প্রামাণ্য ফতোয়া প্রদান করা হয়। কোরআন ও সুন্নাহর আলোকে আলেমগণ ব্যক্তিগত ও সামাজিক জীবনের বিভিন্ন বিষয়ে সঠিক দিকনির্দেশনা দেন।
          </p>
          <Link href="/create">
            <div className="flex items-center justify-center gap-2">
              <Button size="lg" className="">
                <PlusCircle className="h-5 w-5" />
                মাসালা-মাসায়েল লিখুন
              </Button>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};