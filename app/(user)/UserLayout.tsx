import { Footer } from '@/components/homePage/Footer';
import { Navbar } from '@/components/homePage/Navbar';
import React from 'react';


export const UserLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className=''>
      <div className='w-full'>
           {/* Navigation */}
              <Navbar />
              <div className="min-h-[80vh]">
                {children}
              </div>
          {/* Footer */}
             <Footer />
        </div>
    </div>
  );
};
