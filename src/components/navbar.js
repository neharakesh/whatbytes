"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Added searchParams
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to update the URL with the search term
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchValue) {
      params.set('search', searchValue);
    } else {
      params.delete('search');
    }
    
    // Push the new URL e.g., /?search=phone
    router.push(`/?${params.toString()}`);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-[#0056b3] text-white sticky top-0 z-[100] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-white text-[#0056b3] p-1.5 rounded-lg font-black text-xl">WB</div>
          <span className="text-2xl font-black uppercase hidden sm:block">Whatbytes</span>
        </Link>
        
        {/* Functional Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden md:block">
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search premium products..." 
            className="w-full bg-blue-700/40 border border-blue-300/20 py-2.5 px-5 pr-12 rounded-full text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-white text-[#0056b3] rounded-full hover:scale-110 transition-transform">
            <Search size={14} strokeWidth={3} />
          </button>
        </form>

        {/* Actions... (Cart, User, etc.) */}
        <div className="flex items-center gap-6">
           <Link href="/cart" className="relative p-2.5">
            <ShoppingCart size={24} />
            {isMounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-[10px] rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0056b3]">
                {totalItems}
              </span>
            )}
          </Link>
          <User className="hidden sm:block" />
        </div>
      </div>
    </nav>
  );
}