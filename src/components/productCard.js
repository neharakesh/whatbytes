"use client"
import { useCartStore } from '@/store/useCartStore';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out relative">
      
      {/* Category Badge - Glassmorphism style */}
      <div className="absolute top-6 left-6 z-10">
        <span className="bg-white/80 backdrop-blur-md border border-white/20 text-[#0056b3] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {product.category}
        </span>
      </div>

      <Link href={`/product/${product.id}`} className="flex-1">
        {/* Image Container with Zoom effect */}
        <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-50 mb-5 group-hover:bg-blue-50/50 transition-colors">
          <img 
            src={product.image} 
            alt={product.title} 
            className="object-contain w-full h-full p-6 group-hover:scale-110 transition-transform duration-500" 
          />
        </div>

        {/* Product Details */}
        <div className="space-y-1 px-1">
          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-1 group-hover:text-[#0056b3] transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-black text-gray-900 tracking-tight">
              ${product.price}
            </p>
            
            <div className="flex items-center gap-0.5 text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star size={12} fill="currentColor" stroke="none" />
              <span className="text-xs font-bold text-yellow-700">{product.rating || '4.5'}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Modern Button */}
      <button 
        onClick={(e) => {
          e.preventDefault(); // Prevents Link trigger
          addToCart(product);
        }}
        className="mt-5 w-full bg-[#0056b3] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 group-hover:shadow-blue-200"
      >
        <Plus size={18} strokeWidth={3} />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}