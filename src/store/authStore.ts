import { create } from 'zustand';
import { User, LoginCredentials } from '../types/auth';

interface AuthStore {
  user: User;
  login: (credentials: LoginCredentials) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    username: '',
    isAuthenticated: false,
  },
  login: (credentials) => {
    const isValid = 
      credentials.username === import.meta.env.VITE_OWNER_USERNAME &&
      credentials.password === import.meta.env.VITE_OWNER_PASSWORD;

    if (isValid) {
      set({ user: { username: credentials.username, isAuthenticated: true } });
    }
    return isValid;
  },
  logout: () => {
    set({ user: { username: '', isAuthenticated: false } });
  },
}));