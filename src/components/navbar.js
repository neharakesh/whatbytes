"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [isMounted, setIsMounted] = useState(false);

  // Fix for Hydration: Ensures cart count loads only on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-[#0056b3] text-white sticky top-0 z-[100] shadow-lg backdrop-blur-md bg-opacity-95 border-b border-blue-400/20">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-white text-[#0056b3] p-1.5 rounded-lg font-black text-xl group-hover:rotate-3 transition-transform shadow-md">
            WB
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase hidden sm:block">
            Whatbytes
          </span>
        </Link>
        
        {/* Premium Search Bar */}
        <div className="flex-1 max-w-2xl relative group hidden md:block">
          <input 
            type="text" 
            placeholder="Search premium products..." 
            className="w-full bg-blue-700/40 border border-blue-300/20 py-2.5 px-5 pr-12 rounded-full text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-blue-800/60 transition-all shadow-inner"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-white text-[#0056b3] rounded-full cursor-pointer hover:scale-110 transition-transform shadow-sm">
            <Search size={14} strokeWidth={3} />
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2 md:gap-6 shrink-0">
          
          {/* Cart Icon with Badge */}
          <Link href="/cart" className="relative p-2.5 hover:bg-white/10 rounded-full transition-all group">
            <ShoppingCart size={24} strokeWidth={2} />
            {isMounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0056b3] animate-in zoom-in duration-300 shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Profile Section */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-blue-400/40 cursor-pointer hover:opacity-90 transition-opacity">
            <div className="text-right">
              <p className="text-[10px] uppercase opacity-60 leading-none mb-1">Welcome</p>
              <p className="text-sm font-bold leading-none">Neha R.</p>
            </div>
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-400 to-blue-200 rounded-full flex items-center justify-center border border-white/40 shadow-sm overflow-hidden text-blue-800">
              <User size={20} />
            </div>
          </div>

          {/* Mobile Menu (Icon only) */}
          <button className="md:hidden p-2 hover:bg-white/10 rounded-lg">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}