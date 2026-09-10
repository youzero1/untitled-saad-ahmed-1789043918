import type { TableRow } from '@/types/multiplication';

/** Supported range for the multiplicand — keeps products well inside safe integers. */
export const MIN_BASE = -1000;
export const MAX_BASE = 1000;

export const DEFAULT_BASE = 22;
export const DEFAULT_ROW_COUNT = 20;

/** Clamp a number into the supported multiplicand range. */
export function clampBase(value: number, min: number = MIN_BASE, max: number = MAX_BASE): number {
  if (!Number.isFinite(value)) return DEFAULT_BASE;
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

/**
 * Turn raw input text into a safe integer.
 * Returns `null` for empty, partial (`-`, `.`, `1e`) or non-numeric input so the
 * caller can keep the previous valid value instead of rendering NaN.
 */
export function parseBaseInput(
  raw: string,
  min: number = MIN_BASE,
  max: number = MAX_BASE,
): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(trimmed)) return null;

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return null;

  return clampBase(parsed, min, max);
}

/** Build the rows of a times table for `base`, from `× 1` up to `× rowCount`. */
export function buildTimesTable(base: number, rowCount: number = DEFAULT_ROW_COUNT): TableRow[] {
  const safeBase = clampBase(base);
  const safeRowCount = Number.isFinite(rowCount) ? Math.min(200, Math.max(1, Math.trunc(rowCount))) : DEFAULT_ROW_COUNT;

  return Array.from({ length: safeRowCount }, (_, index) => {
    const multiplier = index + 1;
    return { multiplier, product: safeBase * multiplier };
  });
}

/** Locale-formatted number for display (thousands separators, minus sign preserved). */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}
