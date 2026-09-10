export type ThemeId = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  /** Small preview swatches: [surface/background, accent]. */
  swatch: [string, string];
}
