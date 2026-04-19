"use client"
import { useState, useEffect } from 'react'; // Added hooks
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = ["All", "Electronics", "Clothing", "Home"];
  
  // 1. Local state to manage the slider value instantly for a smooth UI
  const [price, setPrice] = useState(searchParams.get('price') || 1000);

  const currentCategory = searchParams.get('category') || 'All';

  // 2. Handle Price Change and update URL
  const handlePriceChange = (value) => {
    setPrice(value);
    const params = new URLSearchParams(searchParams);
    params.set('price', value);
    router.push(`?${params.toString()}`);
  };

  const handleFilter = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "All") {
      params.delete('category');
    } else {
      params.set('category', cat.toLowerCase());
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-[#0056b3] text-white p-8 rounded-3xl shadow-xl h-fit sticky top-24 border border-blue-400/30">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8 border-b border-blue-400/50 pb-4">
        <div className="bg-white/20 p-2 rounded-xl">
          <Filter size={20} />
        </div>
        <h2 className="font-bold text-2xl tracking-tight">Filters</h2>
      </div>
      
      {/* Category Section */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] font-black mb-4 opacity-70">Category</p>
        <div className="space-y-2">
          {categories.map(cat => {
            const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button 
                key={cat} 
                onClick={() => handleFilter(cat)}
                className={`w-full flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                  ? "bg-white text-[#0056b3] shadow-lg font-bold scale-105" 
                  : "hover:bg-white/10 text-white/80 hover:text-white"
                }`}
              >
                <span className="text-sm">{cat}</span>
                <ChevronRight size={16} className={`${isActive ? "rotate-90" : "opacity-0"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs uppercase tracking-[0.2em] font-black opacity-70">Max Price</p>
          <span className="bg-white text-[#0056b3] px-3 py-1 rounded-full text-xs font-bold shadow-md">
            ${price}
          </span>
        </div>
        
        <div className="px-1">
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={price} // 3. Set the value from state
            onChange={(e) => handlePriceChange(e.target.value)} // 4. Add onChange
            className="w-full h-1.5 bg-blue-900/50 rounded-lg appearance-none cursor-pointer accent-white transition-all shadow-inner" 
          />
          <div className="flex justify-between text-[10px] font-bold mt-3 opacity-60">
            <span>$0</span>
            <span>$500</span>
            <span>$1000</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button 
        onClick={() => {
          setPrice(1000);
          router.push('/');
        }}
        className="w-full mt-10 py-3 border border-blue-300/30 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#0056b3] transition-all duration-300"
      >
        Clear Filters
      </button>
    </div>
  );
}