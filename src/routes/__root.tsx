import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const navLinkClass =
  'rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white';

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <span className="text-sm font-semibold tracking-tight text-white">
            Times Table Explorer
          </span>
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={navLinkClass}
              activeProps={{ className: 'bg-white/10 text-white' }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
            <Link
              to="/times-table"
              className={navLinkClass}
              activeProps={{ className: 'bg-white/10 text-white' }}
            >
              Times Table
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-slate-500">
        Practise any times table, instantly.
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <p className="text-lg">This page does not exist.</p>
      <Link to="/" className="text-sm underline underline-offset-4">
        Go to the home page
      </Link>
    </div>
  );
}
