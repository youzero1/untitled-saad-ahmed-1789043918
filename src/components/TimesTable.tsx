import { buildTimesTable, DEFAULT_ROW_COUNT, formatNumber } from '@/lib/multiplication';

interface TimesTableProps {
  base: number;
  rowCount?: number;
}

export function TimesTable({ base, rowCount = DEFAULT_ROW_COUNT }: TimesTableProps) {
  const rows = buildTimesTable(base, rowCount);
  const baseLabel = formatNumber(base);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="border-b border-white/10 px-4 py-4 text-left text-base font-semibold text-white sm:px-6">
            The {baseLabel} times table
            <span className="ml-2 text-sm font-normal text-slate-400">
              {rows.length} rows
            </span>
          </caption>
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-400">
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                Row
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium sm:px-6">
                Working
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium sm:px-6">
                Answer
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.multiplier}
                className={
                  index % 2 === 1
                    ? 'border-t border-white/5 bg-white/[0.03]'
                    : 'border-t border-white/5'
                }
              >
                <th
                  scope="row"
                  className="px-4 py-3 text-sm font-normal text-slate-500 tabular-nums sm:px-6"
                >
                  {row.multiplier}
                </th>
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-slate-300 tabular-nums sm:px-6 sm:text-base">
                  {baseLabel} × {row.multiplier} =
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-semibold text-white tabular-nums sm:px-6 sm:text-base">
                  {formatNumber(row.product)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
