import { Share2, Globe, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg font-black text-xl">
                WB
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                Whatbytes
              </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-70">
              Elevating your shopping experience with premium products and seamless service. Your one-stop shop for everything electronics and lifestyle.
            </p>
            <div className="flex gap-4">
              {[Share2, Globe, MessageCircle].map((Icon, i) => (
                <Link key={i} href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Categories</h3>
            <ul className="space-y-4 text-sm">
              {['Electronics', 'Clothing', 'Home', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link href={`/?category=${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="h-1 w-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              {['About Us', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>ex@example.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest opacity-50">
          <p>© 2024 AMERICAN & WHATBYTES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white">Cookies</Link>
            <Link href="#" className="hover:text-white">Security</Link>
            <Link href="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}