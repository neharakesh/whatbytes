import Sidebar from '@/components/sidebar';
import ProductCard from '@/components/productCard';
import { products } from '@/data/product.js';
import { LayoutGrid, ListFilter } from 'lucide-react';

export default async function HomePage({ searchParams }) {
  // 1. Await searchParams ONCE to get all URL data
  const params = await searchParams;
  const activeCategory = params.category;
  const searchQuery = params.search;

  // 2. Multi-level filtering logic
  let filteredProducts = products;

  // Filter by Category if it exists
  if (activeCategory && activeCategory.toLowerCase() !== 'all') {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  // Further filter by Search Query if it exists
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Header & Stats Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <nav className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                Shop / {activeCategory || 'All Collections'}
              </nav>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight capitalize">
                {searchQuery ? `Search: ${searchQuery}` : (activeCategory || "Product Listing")}
              </h1>
            </div>

            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60 h-fit">
              <div className="px-4 py-1.5 border-r border-slate-100 flex items-center gap-2">
                <LayoutGrid size={16} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-700">
                  {filteredProducts.length} Items
                </span>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-600">
                <ListFilter size={18} />
              </button>
            </div>
          </div>
          
          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
              <div className="bg-slate-50 p-6 rounded-full mb-4 text-slate-200">
                <LayoutGrid size={48} />
              </div>
              <p className="text-xl text-slate-400 font-semibold tracking-tight">
                No products found matching your criteria.
              </p>
              <a href="/" className="mt-4 text-blue-600 font-bold hover:underline cursor-pointer">
                Clear all filters
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="h-20" />
        </main>
      </div>
    </div>
  );
}