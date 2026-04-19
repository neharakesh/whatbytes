// Replace the brand imports with these generic ones
import { Share2, Globe, MessageCircle, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#003d80] text-white mt-12 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h3 className="font-bold text-lg mb-4">Filters</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/?category=all" className="hover:underline">All Products</Link></li>
            <li><Link href="/?category=electronics" className="hover:underline">Electronics</Link></li>
            <li><Link href="/?category=clothing" className="hover:underline">Clothing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="#" className="hover:underline">About Us</Link></li>
            <li><Link href="#" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            {/* Using generic icons that are guaranteed to exist in your lucide version */}
            <Link href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-600">
              <Share2 size={20} />
            </Link>
            <Link href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-600">
              <Globe size={20} />
            </Link>
            <Link href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-600">
              <MessageCircle size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-blue-400 mt-10 pt-6 text-center text-sm opacity-60">
        <p>© 2024 American</p>
      </div>
    </footer>
  );
}