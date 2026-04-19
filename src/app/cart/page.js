"use client"
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/components/successModal.js';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart } = useCartStore(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Price Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10.00 : 0;
  const total = subtotal + shipping;

  // CRITICAL FIX: Only show the empty state if the cart is empty AND the modal is closed.
  // This keeps the UI visible behind the modal during checkout.
  if (cart.length === 0 && !isModalOpen) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/" className="mt-8 bg-[#0056b3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Shopping
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    setIsModalOpen(true); // Open "Sunder" Modal first
    clearCart();          // Clear store (UI stays because of the check above)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: Product List */}
        <div className="lg:col-span-2 space-y-4">
          {/* We use a fallback empty array if cart was cleared but modal is open */}
          {(cart.length > 0 ? cart : []).map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-blue-600 font-semibold uppercase mb-1">{item.category}</p>
                <p className="text-lg font-bold text-gray-900">${item.price}</p>
              </div>

              <div className="flex items-center gap-2 md:gap-4 bg-gray-50 rounded-lg p-1 px-2 border border-gray-200">
                <button 
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={item.quantity <= 1}
                  className="p-1 disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-gray-800 w-5 text-center">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="p-1">
                  <Plus size={16} />
                </button>
              </div>

              <div className="hidden md:block text-right px-4">
                <p className="text-sm text-gray-400">Total</p>
                <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {/* If cart was just cleared (checkout), show a placeholder or keep it empty */}
          {cart.length === 0 && isModalOpen && (
             <div className="text-center py-10 text-gray-400 italic">Processing your order...</div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="font-semibold text-gray-800">${shipping.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-6 mb-8 flex justify-between items-end">
            <div>
              <p className="text-gray-500 text-sm">Total Amount</p>
              <p className="text-3xl font-extrabold text-[#0056b3]">${total.toFixed(2)}</p>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-[#0056b3] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98] disabled:bg-gray-400"
          >
            Checkout Now
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 uppercase">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Secure encrypted checkout
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}