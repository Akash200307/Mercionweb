import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AUTH_PROVIDERS } from '../config/authProviders';
import './SignIn.css';

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login({ email: formData.email, password: formData.password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Sign in failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb"></div>
      <div className="auth-bg-orb auth-bg-orb2"></div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in with email to manage your Mercion account</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signin-email">Email Address</label>
              <input
                id="signin-email"
                className="form-input"
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                className="form-input"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="auth-form-options">
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className="auth-submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <span>authentication providers</span>
          </div>

          <ul className="auth-provider-list">
            {AUTH_PROVIDERS.map((provider) => (
              <li key={provider.id} className={`auth-provider-item status-${provider.status}`}>
                <div>
                  <strong>{provider.name}</strong>
                  <p>{provider.description}</p>
                </div>
                <span className="auth-provider-badge">
                  {provider.status === 'active' ? 'Active' : provider.status === 'coming_soon' ? 'Soon' : 'Planned'}
                </span>
              </li>
            ))}
          </ul>

          <div className="auth-social">
            <button type="button" className="auth-social-btn" disabled title="Coming soon">
              Google
            </button>
            <button type="button" className="auth-social-btn" disabled title="Coming soon">
              GitHub
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="auth-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
