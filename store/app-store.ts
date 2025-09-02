import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "customer" | "admin" | null;

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
      logout: () => set({ role: null }),
    }),
    {
      name: "app-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
