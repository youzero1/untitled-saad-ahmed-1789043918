import { useEffect, useState } from 'react';
import { clampBase, MAX_BASE, MIN_BASE, parseBaseInput } from '@/lib/multiplication';

interface NumberPickerProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  presets?: number[];
}

const DEFAULT_PRESETS = [2, 5, 9, 12, 22];

export function NumberPicker({
  value,
  onChange,
  min = MIN_BASE,
  max = MAX_BASE,
  presets = DEFAULT_PRESETS,
}: NumberPickerProps) {
  // Raw text is held locally so the field may be temporarily empty while typing.
  const [raw, setRaw] = useState<string>(String(value));

  // Keep the field in sync when the value changes from outside (steppers, presets).
  useEffect(() => {
    setRaw(String(value));
  }, [value]);

  function handleInput(next: string) {
    setRaw(next);
    const parsed = parseBaseInput(next, min, max);
    if (parsed !== null && parsed !== value) {
      onChange(parsed);
    }
  }

  function handleBlur() {
    const parsed = parseBaseInput(raw, min, max);
    // Invalid or empty on blur: restore the last valid value.
    setRaw(String(parsed ?? value));
    if (parsed !== null && parsed !== value) onChange(parsed);
  }

  function step(delta: number) {
    const next = clampBase(value + delta, min, max);
    if (next !== value) onChange(next);
    setRaw(String(next));
  }

  const stepperClass =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-strong text-lg font-semibold text-text transition-colors hover:bg-accent hover:text-accent-contrast disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface-strong disabled:hover:text-text';

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <label
        htmlFor="times-table-base"
        className="block text-xs font-semibold uppercase tracking-wider text-muted"
      >
        Times table for
      </label>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={value <= min}
            aria-label="Decrease number"
            className={stepperClass}
          >
            −
          </button>
          <input
            id="times-table-base"
            type="number"
            inputMode="numeric"
            value={raw}
            min={min}
            max={max}
            onChange={(event) => handleInput(event.target.value)}
            onBlur={handleBlur}
            className="h-11 w-full min-w-0 rounded-xl border border-border bg-bg px-4 text-center text-lg font-semibold text-text tabular-nums outline-none transition-colors focus:border-accent sm:w-32"
          />
          <button
            type="button"
            onClick={() => step(1)}
            disabled={value >= max}
            aria-label="Increase number"
            className={stepperClass}
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 sm:ml-auto">
          {presets.map((preset) => {
            const isActive = preset === value;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => onChange(clampBase(preset, min, max))}
                aria-pressed={isActive}
                className={
                  isActive
                    ? 'rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-contrast tabular-nums'
                    : 'rounded-lg border border-border bg-surface-strong px-3 py-1.5 text-sm font-medium text-muted tabular-nums transition-colors hover:text-text'
                }
              >
                {preset}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        Any whole number from {min.toLocaleString('en-US')} to {max.toLocaleString('en-US')}.
      </p>
    </div>
  );
}
