"use client"
import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-[#0056b3] text-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold">Logo</Link>
        
        <div className="flex-1 max-w-xl relative">
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="w-full py-2 px-4 pr-10 rounded-md text-black focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="flex items-center gap-2 bg-[#003d80] px-4 py-2 rounded-md">
            <div className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
          <User className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}