import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { MenuItem } from '../types/menu';
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '../utils/storage';

interface MenuStore {
  menuItems: MenuItem[];
  categories: Set<string>;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  getMenuItemsByCategory: (category: string) => MenuItem[];
  initializeStore: () => void;
}

// Load initial state from localStorage
const loadInitialState = () => {
  const storedItems = loadFromStorage<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS) || [];
  const categories = new Set(storedItems.map((item) => item.category));
  return { menuItems: storedItems, categories };
};

export const useMenuStore = create<MenuStore>((set, get) => ({
  ...loadInitialState(),

  initializeStore: () => {
    const initialState = loadInitialState();
    set(initialState);
  },

  addMenuItem: (item) => {
    set((state) => {
      const newItem = { ...item, id: uuidv4() };
      const newMenuItems = [...state.menuItems, newItem];
      const newCategories = new Set(state.categories).add(item.category);
      
      // Save to localStorage
      saveToStorage(STORAGE_KEYS.MENU_ITEMS, newMenuItems);
      
      return {
        menuItems: newMenuItems,
        categories: newCategories,
      };
    });
  },

  updateMenuItem: (updatedItem) => {
    set((state) => {
      const newMenuItems = state.menuItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      const newCategories = new Set(newMenuItems.map((item) => item.category));
      
      // Save to localStorage
      saveToStorage(STORAGE_KEYS.MENU_ITEMS, newMenuItems);
      
      return {
        menuItems: newMenuItems,
        categories: newCategories,
      };
    });
  },

  deleteMenuItem: (id) => {
    set((state) => {
      const newMenuItems = state.menuItems.filter((item) => item.id !== id);
      const newCategories = new Set(newMenuItems.map((item) => item.category));
      
      // Save to localStorage
      saveToStorage(STORAGE_KEYS.MENU_ITEMS, newMenuItems);
      
      return {
        menuItems: newMenuItems,
        categories: newCategories,
      };
    });
  },

  getMenuItemsByCategory: (category) => {
    return get().menuItems.filter((item) => item.category === category);
  },
}));