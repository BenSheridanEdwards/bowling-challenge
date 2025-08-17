import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState, User, ButtonClickEvent } from '@/types';

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  addButtonClick: (buttonId: string) => void;
  clearButtonClicks: () => void;
  
  // Computed values
  getButtonClickCount: (buttonId: string) => number;
  getTotalClickCount: () => number;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isLoading: false,
        theme: 'light',
        buttonClicks: [],

        // Actions
        setUser: (user) => set({ user }, false, 'setUser'),
        
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
        
        toggleTheme: () =>
          set(
            (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
            false,
            'toggleTheme'
          ),
        
        addButtonClick: (buttonId) =>
          set(
            (state) => ({
              buttonClicks: [
                ...state.buttonClicks,
                {
                  buttonId,
                  timestamp: Date.now(),
                  userId: state.user?.id,
                },
              ],
            }),
            false,
            'addButtonClick'
          ),
        
        clearButtonClicks: () =>
          set({ buttonClicks: [] }, false, 'clearButtonClicks'),

        // Computed values
        getButtonClickCount: (buttonId) => {
          const { buttonClicks } = get();
          return buttonClicks.filter((click) => click.buttonId === buttonId).length;
        },
        
        getTotalClickCount: () => {
          const { buttonClicks } = get();
          return buttonClicks.length;
        },
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          theme: state.theme,
          buttonClicks: state.buttonClicks,
          user: state.user,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
);