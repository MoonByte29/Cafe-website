import React from 'react';
import { useCartStore } from '../store/cartStore';
import { X as CloseIcon, Minus, Plus, Send } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  if (!isOpen) return null;

  const handleWhatsAppOrder = () => {
    const orderText = `*New Order*\n\n${cart.items
      .map((item) => `${item.quantity}- ${item.name} = Rs.${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')}\n\n*Total: Rs.${cart.total.toFixed(2)}*`;

    const whatsappUrl = `https://wa.me/8696403065?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="p-2">
            <CloseIcon size={20} />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <p className="text-center text-gray-500 my-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${cart.total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Order via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};