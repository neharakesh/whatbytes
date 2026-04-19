import { products } from '@/data/product.js';
import { Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProductDetail({ params }) {
  // In Next.js 15+, params is a Promise. We must await it.
  const { id } = await params;
  
  // Find the product that matches the ID from the URL
  const product = products.find((p) => p.id === parseInt(id));

  // Handle cases where the product ID doesn't exist
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/" className="text-blue-600 underline mt-4">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
        <ChevronLeft size={20} />
        <span>Back to products</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Left Side: Product Image */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl p-10">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex-1 space-y-6">
          <div>
            <span className="bg-blue-100 text-[#0056b3] text-xs font-bold px-3 py-1 rounded-full uppercase">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mt-4">{product.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < product.rating ? "currentColor" : "none"} />
              ))}
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* This part needs to be a client component if you want interactivity */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
               <label className="font-semibold">Quantity:</label>
               <select className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500">
                 {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
               </select>
            </div>
            
            <button className="w-full bg-[#0056b3] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}