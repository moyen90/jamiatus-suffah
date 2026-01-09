import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { HelpCircle, Sparkles, BookOpen, ScrollText } from 'lucide-react';

export const Header = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/10 text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="h-4 w-4 fill-primary/20" />
          <span>ইসলামিক জ্ঞান ও ফতোয়ার নির্ভরযোগ্য কেন্দ্র</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          সুফ্ফাহ সেন্টার এ <br />
          <span className="text-gradient">স্বাগতম</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          নির্ভরযোগ্য ও প্রামাণ্য ফতোয়ার মাধ্যমে আপনার ধর্মীয় জিজ্ঞাসার সঠিক সমাধান পান।
          কোরআন ও সুন্নাহর আলোকে আমাদের আলেমগণ আপনার প্রতিটি প্রশ্নের নিখুঁত উত্তর প্রদান করেন।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Link href="/ask">
            <Button size="xl" className="h-14 px-8 text-lg font-bold rounded-2xl shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 group">
              <HelpCircle className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
              মাসালা-মাসায়েল জিজ্ঞাসা করুন
            </Button>
          </Link>
          <Button variant="outline" size="xl" className="h-14 px-8 text-lg font-bold rounded-2xl glass hover:bg-muted/50 transition-all hover:-translate-y-1 active:scale-95">
            <BookOpen className="h-5 w-5 mr-3" />
            সবগুলো আর্টিকেল দেখুন
          </Button>
        </div>

        <div className="mt-20 flex items-center justify-center gap-8 grayscale opacity-50 contrast-125 dark:invert dark:opacity-30 animate-in fade-in duration-1000 delay-700">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><ScrollText className="w-5 h-5" /> ফতোয়া</div>
          <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><Sparkles className="w-5 h-5" /> হিদায়াত</div>
          <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><BookOpen className="w-5 h-5" /> জ্ঞান</div>
        </div>
      </div>
    </section>
  );
};