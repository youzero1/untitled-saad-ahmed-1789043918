import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { NumberPicker } from '@/components/NumberPicker';
import { TimesTable } from '@/components/TimesTable';
import { DEFAULT_BASE, DEFAULT_ROW_COUNT } from '@/lib/multiplication';

export const Route = createFileRoute('/times-table')({
  component: TimesTablePage,
});

function TimesTablePage() {
  const [base, setBase] = useState<number>(DEFAULT_BASE);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Times table</h1>
      <p className="mt-2 text-sm text-slate-400">
        Pick a number to see its full times table, one row at a time.
      </p>

      <div className="mt-8">
        <NumberPicker value={base} onChange={setBase} />
      </div>

      <div className="mt-8">
        <TimesTable base={base} rowCount={DEFAULT_ROW_COUNT} />
      </div>
    </div>
  );
}
