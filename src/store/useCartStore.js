import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      
      // Add or Increment
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      // Decrement Quantity (Minus Button)
      decreaseQuantity: (id) => set((state) => ({
        cart: state.cart.map(item =>
          item.id === id && item.quantity > 1 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      })),

      // Remove Item Entirely (Trash Button)
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
    }),
    { name: 'cart-storage' }
  )
);