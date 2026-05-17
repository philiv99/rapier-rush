import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../theme/global.css';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--color-cream)' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-pop)', fontFamily: 'var(--font-headline)' }}>Rapier Rush</h1>

        {error && <p style={{ color: 'var(--color-pop)', marginBottom: 'var(--spacing-md)' }}>{error}</p>}

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%' }}
            placeholder="Enter username"
          />
        </div>

        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%' }}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" disabled={isLoading} style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}
