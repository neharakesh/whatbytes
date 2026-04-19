"use client"
import { useCartStore } from '@/store/useCartStore';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`} className="flex-1">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50 mb-4">
          <img src={product.image} alt={product.title} className="object-contain w-full h-full p-2" />
        </div>
        <h3 className="font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
        <p className="text-xl font-bold text-gray-900 mt-1">${product.price}</p>
        <div className="flex gap-0.5 text-blue-400 my-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} stroke="currentColor" />
          ))}
        </div>
      </Link>
      <button 
        onClick={() => addToCart(product)}
        className="mt-2 w-full bg-[#0056b3] text-white py-2.5 rounded-md font-medium hover:bg-blue-700 active:scale-[0.98] transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
}