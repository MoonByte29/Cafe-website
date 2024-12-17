import React, { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { MenuItemCard } from '../components/MenuItemCard';
import { MenuItemForm } from '../components/MenuItemForm';
import { MenuItem } from '../types/menu';
import { PlusIcon } from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const { menuItems, categories, deleteMenuItem } = useMenuStore();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>();

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          <PlusIcon size={20} />
          Add New Item
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingItem ? 'Edit' : 'Add'} Menu Item
            </h2>
            <MenuItemForm
              item={editingItem}
              onSubmit={handleFormClose}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}

      <div className="space-y-8">
        {Array.from(categories).map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    isOwner={true}
                    onEdit={handleEdit}
                    onDelete={deleteMenuItem}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};