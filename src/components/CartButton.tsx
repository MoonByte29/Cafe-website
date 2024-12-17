import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const CartButton: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="relative p-2">
    <ShoppingCartIcon size={24} />
    {itemCount > 0 && (
      <span className="absolute bottom-6 left-7 transform translate-x-1/2 -translate-y-1/2 bg-red-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {itemCount}
      </span>
    )}
  </button>
  
  );
};