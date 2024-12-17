import React, { useState } from "react";
import { CartButton } from "../components/CartButton";
import { CartModal } from "../components/CartModal";
import Hero from "../components/hero/Hero";
import { MenuItemCard } from "../components/MenuItemCard";
import { useMenuStore } from "../store/menuStore";
import { categoryIcons } from "../utils/categoryIcons";
import { Footer } from "../components/layout/Footer";

export const CustomerMenu: React.FC = () => {
  const { menuItems, categories } = useMenuStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Our Menu</h1>
        <div className="space-y-12">
          {Array.from(categories).map((category) => {
            const Icon = categoryIcons[category] || categoryIcons.default; // Fallback to default icon

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-6">
                  <Icon className="w-6 h-6 text-amber-600" />{" "}
                  {/* Render the icon */}
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer/>
      {/* Cart Button Fixed at Bottom Right */}
      <div
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 opacity-0.5 cursor-pointer bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600"
      >
        <CartButton />
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
