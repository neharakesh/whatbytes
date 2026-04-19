import Sidebar from '@/components/sidebar';
import ProductCard from '@/components/productCard';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      {/* Left Sidebar */}
      <aside className="w-1/4 hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Product Listing</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}