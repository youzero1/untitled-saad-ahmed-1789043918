import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const navLinkClass =
  'rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-text';

function RootLayout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <header className="sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold tracking-tight text-text">
              Times Table Explorer
            </span>
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className={navLinkClass}
                activeProps={{ className: 'bg-accent text-accent-contrast' }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>
              <Link
                to="/times-table"
                className={navLinkClass}
                activeProps={{ className: 'bg-accent text-accent-contrast' }}
              >
                Times Table
              </Link>
            </nav>
          </div>
          <ThemeSwitcher theme={theme} onChange={setTheme} />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted">
        Practise any times table, instantly.
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <p className="text-lg">This page does not exist.</p>
      <Link to="/" className="text-sm text-accent underline underline-offset-4">
        Go to the home page
      </Link>
    </div>
  );
}
