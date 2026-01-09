import Link from 'next/link';
import React from 'react';
import { Mail, MapPin, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-black pt-24 pb-12 overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Background Orbs - Monochrome */}
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-black/[0.02] dark:bg-white/[0.01] rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-black/[0.01] dark:bg-white/[0.01] rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter uppercase whitespace-nowrap">
                সুফ্ফাহ <span className="opacity-40 text-black dark:text-white">সেন্টার</span>
              </h2>
              <div className="h-1.5 w-20 bg-black dark:bg-white rounded-full" />
            </div>

            <p className="text-xl text-muted-foreground font-bold leading-relaxed max-w-xl">
              সুফ্ফাহ সেন্টার হলো জামিয়াতুসসুফ্ফাহ-এর অফিসিয়াল ফতোয়া কেন্দ্র, যা কোরআন ও সুন্নাহভিত্তিক নির্ভরযোগ্য ইসলামিক দিকনির্দেশনা প্রদান করে।
            </p>

            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-12 h-12 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 shadow-sm active:scale-95">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30">Quick Links</h4>
              <ul className="space-y-5">
                {['Home', 'About', 'Contact', 'Fatawa'].map((item) => (
                  <li key={item}>
                    <Link href={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`} className="group flex items-center gap-3 text-lg font-bold hover:text-black dark:hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {item === 'Home' ? 'হোম' : item === 'About' ? 'আমাদের সম্পর্কে' : item === 'Contact' ? 'যোগাযোগ' : 'ফাতাওয়া'}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30">Resources</h4>
              <ul className="space-y-5">
                {['Guides', 'Archives', 'Scholars', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="group flex items-center gap-3 text-lg font-bold hover:text-black dark:hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {item === 'Guides' ? 'নির্দেশিকা' : item === 'Archives' ? 'আর্কাইভ' : item === 'Scholars' ? 'ওলামায়ে কেরাম' : 'ব্লগ'}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30">Contact</h4>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="mt-1 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-1">অবস্থান</p>
                    <p className="font-bold text-sm leading-relaxed text-foreground">ঢাকা, বাংলাদেশ</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-1">ইমেইল</p>
                    <p className="font-bold text-sm text-foreground">info@suffah.center</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[10px] font-black opacity-30 tracking-[0.2em] uppercase text-center md:text-left">
            &copy; 2025 Suffah Center. All rights reserved. <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> Engineered with Purpose.
          </div>

          <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.25em] opacity-30">
            <Link href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};