import { THEMES } from '@/lib/themes';
import type { ThemeId } from '@/types/theme';

interface ThemeSwitcherProps {
  theme: ThemeId;
  onChange: (next: ThemeId) => void;
}

export function ThemeSwitcher({ theme, onChange }: ThemeSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex items-center gap-1 rounded-xl border border-border bg-surface p-1"
    >
      {THEMES.map((option) => {
        const isActive = option.id === theme;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            title={`${option.label} theme`}
            className={
              isActive
                ? 'flex items-center gap-1.5 rounded-lg bg-accent px-2 py-1.5 text-xs font-semibold text-accent-contrast'
                : 'flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-strong hover:text-text'
            }
          >
            <span
              aria-hidden="true"
              className="block h-3.5 w-3.5 shrink-0 rounded-full border border-border"
              style={{
                background: `linear-gradient(135deg, ${option.swatch[0]} 50%, ${option.swatch[1]} 50%)`,
              }}
            />
            <span className="hidden sm:inline">{option.label}</span>
            <span className="sr-only sm:hidden">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
