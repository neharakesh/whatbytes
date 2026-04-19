"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [isMounted, setIsMounted] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // Toggle for search
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchValue) params.set('search', searchValue);
    else params.delete('search');
    router.push(`/?${params.toString()}`);
    setShowMobileSearch(false);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-[#0056b3] text-white sticky top-0 z-[100] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-8">
        
        {/* LOGO - Always visible */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-white text-[#0056b3] p-1 rounded-lg font-black text-lg">WB</div>
          <span className="text-xl font-black uppercase tracking-tighter hidden xs:block">Whatbytes</span>
        </Link>
        
        {/* DESKTOP SEARCH - Hidden on mobile, visible from MD up */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative hidden md:block">
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..." 
            className="w-full bg-blue-700/40 border border-blue-300/20 py-2 px-5 pr-12 rounded-full text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-white text-[#0056b3] rounded-full hover:scale-110 transition-transform">
            <Search size={14} strokeWidth={3} />
          </button>
        </form>

        {/* ACTION BUTTONS - Optimized for Mobile */}
        <div className="flex items-center gap-1 md:gap-6">
          
          {/* MOBILE SEARCH TOGGLE - Visible only on small screens */}
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {showMobileSearch ? <X size={22} /> : <Search size={22} />}
          </button>

          {/* PROFILE OPTION - Now visible on ALL screens as an icon */}
          <Link href="/profile" className="p-2 hover:bg-white/10 rounded-full flex items-center gap-2">
            <User size={24} />
            <span className="hidden lg:block text-sm font-bold">Neha R.</span>
          </Link>

          {/* CART - Always visible */}
          <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-all">
            <ShoppingCart size={24} />
            {isMounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0056b3]">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH BAR - Slides down when Search Icon is clicked */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#004a99] border-t border-blue-400/20 ${showMobileSearch ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
        <form onSubmit={handleSearch} className="p-3">
          <div className="relative">
            <input 
              type="text" 
              autoFocus={showMobileSearch}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Type to search..." 
              className="w-full bg-blue-800/50 border border-blue-300/20 py-2 px-4 pr-10 rounded-xl text-white outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search size={18} className="text-blue-200" />
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}