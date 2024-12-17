import React from "react";
import { MenuItem } from "../types/menu";
import { PencilIcon, TrashIcon, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

interface MenuItemCardProps {
  item: MenuItem;
  isOwner?: boolean;
  onEdit?: (item: MenuItem) => void;
  onDelete?: (id: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  isOwner = false,
  onEdit,
  onDelete,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <span className="text-lg font-bold text-amber-600">
            Rs.{item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{item.category}</span>
          {isOwner ? (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit?.(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <PencilIcon size={20} />
              </button>
              <button
                onClick={() => onDelete?.(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <TrashIcon size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 active:bg-amber-800 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
