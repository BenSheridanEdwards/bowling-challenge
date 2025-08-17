import { useAppStore } from '@/store/appStore';
import { lightTheme, darkTheme } from '@/styles/theme';

export function useTheme() {
  const { theme, toggleTheme } = useAppStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return {
    theme: currentTheme,
    themeMode: theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}