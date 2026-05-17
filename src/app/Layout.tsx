import type { ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-cream)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'var(--color-mint)', padding: 'var(--spacing-md) var(--spacing-lg)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.5rem', color: 'var(--color-ink)', margin: 0 }}>
            ⚔️ Rapier Rush
          </h1>
          <div style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
            {user && <span style={{ color: 'var(--color-ink)' }}>Welcome, {user.displayName}!</span>}
            {user && (
              <button
                onClick={logout}
                className="secondary"
                style={{ padding: 'var(--spacing-sm) var(--spacing-md)', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 'var(--spacing-lg)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--color-paper)', padding: 'var(--spacing-lg)', textAlign: 'center', borderTop: '2px solid var(--color-ink)', marginTop: 'auto' }}>
        <p style={{ margin: 0, color: 'var(--color-ink)', fontSize: '0.9rem' }}>
          © 2026 Rapier Rush - Built with React & TypeScript
        </p>
      </footer>
    </div>
  );
}
