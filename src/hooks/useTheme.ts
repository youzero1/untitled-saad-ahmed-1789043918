import { useCallback, useEffect, useState } from 'react';
import { applyTheme, readStoredTheme, THEME_STORAGE_KEY } from '@/lib/themes';
import type { ThemeId } from '@/types/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(() => readStoredTheme());

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage unavailable (private mode, blocked cookies) — theme still applies for this session.
    }
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
  }, []);

  return { theme, setTheme };
}
