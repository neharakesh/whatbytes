"use client"
export default function Sidebar() {
  const categories = ["All", "Electronics", "Clothing", "Home"];

  return (
    <div className="bg-[#0056b3] text-white p-6 rounded-lg h-full">
      <h2 className="font-bold text-xl mb-4">Filters</h2>
      
      <div className="mb-6">
        <p className="font-semibold mb-2">Category</p>
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-2 mb-1">
            <input type="radio" name="category" id={cat} className="accent-white" />
            <label htmlFor={cat} className="text-sm opacity-90">{cat}</label>
          </div>
        ))}
      </div>

      <div>
        <p className="font-semibold mb-2">Price</p>
        <input type="range" min="0" max="1000" className="w-full accent-white" />
        <div className="flex justify-between text-xs mt-1">
          <span>0</span>
          <span>1000</span>
        </div>
      </div>
    </div>
  );
}