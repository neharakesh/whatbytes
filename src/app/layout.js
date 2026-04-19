import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Suspense } from 'react'; // 1. Import Suspense

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Wrap Navbar in Suspense because it uses useSearchParams */}
        <Suspense fallback={<div className="h-20 bg-[#0056b3]" />}>
          <Navbar />
        </Suspense>

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}