import { create } from 'zustand';
import { CartItem, Cart } from '../types/cart';

interface CartStore {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: {
    items: [],
    total: 0,
  },

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.items.find((i) => i.id === item.id);
      let newItems;

      if (existingItem) {
        newItems = state.cart.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.cart.items, { ...item, quantity: 1 }];
      }

      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { cart: { items: newItems, total } };
    });
  },

  removeFromCart: (id) => {
    set((state) => {
      const newItems = state.cart.items.filter((i) => i.id !== id);
      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { cart: { items: newItems, total } };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity < 1) {
        const newItems = state.cart.items.filter((i) => i.id !== id);
        const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        return { cart: { items: newItems, total } };
      }

      const newItems = state.cart.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { cart: { items: newItems, total } };
    });
  },

  clearCart: () => {
    set({ cart: { items: [], total: 0 } });
  },
}));