import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <div>
      <footer className="border-t bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-bold text-xl mb-4">সুফ্ফাহ সেন্টার</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                সুফ্ফাহ সেন্টার হলো জামিয়াতুসসুফ্ফাহ-এর অফিসিয়াল ফতোয়া কেন্দ্র, যা কোরআন ও সুন্নাহভিত্তিক নির্ভরযোগ্য ইসলামিক দিকনির্দেশনা প্রদান করে।
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gray-900 dark:hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                    React
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                    TypeScript
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>

          <div className="border-t mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
            <p>&copy; 2025 Suffah Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};