import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Meal, FilterOptions } from '@/types/meal';

interface AppState {
  // Current state
  currentMeal: Meal | null;
  isSpinning: boolean;
  filters: FilterOptions;
  
  // Favorites
  favorites: Meal[];
  
  // Actions
  setCurrentMeal: (meal: Meal | null) => void;
  setIsSpinning: (spinning: boolean) => void;
  setFilters: (filters: FilterOptions) => void;
  addToFavorites: (meal: Meal) => void;
  removeFromFavorites: (mealId: string) => void;
  clearFavorites: () => void;
  isFavorite: (mealId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentMeal: null,
      isSpinning: false,
      filters: {},
      favorites: [],

      // Actions
      setCurrentMeal: (meal) => set({ currentMeal: meal }),
      
      setIsSpinning: (spinning) => set({ isSpinning: spinning }),
      
      setFilters: (filters) => set({ filters }),
      
      addToFavorites: (meal) => {
        const { favorites } = get();
        if (!favorites.find(f => f.id === meal.id)) {
          set({ favorites: [...favorites, meal] });
        }
      },
      
      removeFromFavorites: (mealId) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(f => f.id !== mealId) });
      },
      
      clearFavorites: () => set({ favorites: [] }),
      
      isFavorite: (mealId) => {
        const { favorites } = get();
        return favorites.some(f => f.id === mealId);
      },
    }),
    {
      name: 'what-to-eat-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
); 