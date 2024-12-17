export const STORAGE_KEYS = {
  MENU_ITEMS: 'restaurant_menu_items',
};

export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error loading data from storage for key ${key}:`, error);
    return null;
  }
};

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to storage for key ${key}:`, error);
  }
};