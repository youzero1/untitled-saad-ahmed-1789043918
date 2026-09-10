import type { ThemeId, ThemeOption } from '@/types/theme';

export const DEFAULT_THEME: ThemeId = 'light';

export const THEME_STORAGE_KEY = 'times-table:theme';

export const THEMES: ThemeOption[] = [
  { id: 'light', label: 'Light', swatch: ['#f6f7fb', '#4f46e5'] },
  { id: 'dark', label: 'Dark', swatch: ['#141a2e', '#818cf8'] },
  { id: 'ocean', label: 'Ocean', swatch: ['#06304c', '#38bdf8'] },
  { id: 'forest', label: 'Forest', swatch: ['#e3f0e1', '#15803d'] },
  { id: 'sunset', label: 'Sunset', swatch: ['#3d1730', '#fb7185'] },
];

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && THEMES.some((theme) => theme.id === value);
}

export function readStoredTheme(): ThemeId {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: ThemeId): void {
  document.documentElement.setAttribute('data-theme', theme);
}
