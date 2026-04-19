"use client"
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-300 text-center">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 size={48} className="text-green-600 animate-bounce" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-8">
          Thank you for shopping with us. Your items are on the way!
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              router.push('/');
            }}
            className="w-full bg-[#0056b3] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}