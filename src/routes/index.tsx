import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
        Multiplication practice
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        The 22 times table — and every other one.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
        See the full working for every row, from 22 × 1 all the way to 22 × 20. Change the
        number and the whole table recalculates instantly.
      </p>
      <Link
        to="/times-table"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
      >
        Open the times table
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
