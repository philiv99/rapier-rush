import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../theme/global.css';

export function RegisterScreen() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  async function handleSubmit(_e: React.FormEvent<HTMLFormElement>) {
    setError('');
    setIsLoading(true);

    try {
      await register({
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        password: 'password123',
      });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--color-cream)' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-pop)' }}>Register</h1>

        {error && <p style={{ color: 'var(--color-pop)', marginBottom: 'var(--spacing-md)' }}>{error}</p>}

        {['username', 'email', 'displayName', 'password', 'confirmPassword'].map((field) => (
          <div key={field} style={{ marginBottom: 'var(--spacing-md)' }}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              id={field}
              type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
              value={eval(field)}
              onChange={(_evt) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}(_evt.target.value)`)}
              required
              style={{ width: '100%' }}
            />
          </div>
        ))}

        <button type="submit" disabled={isLoading} style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
