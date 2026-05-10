import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
  const { login } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-base)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: '24px',
            margin: '0 auto 16px'
          }}>T</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Traveloop Admin</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--red)', 
              padding: '12px', 
              borderRadius: '8px', 
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@traveloop.com"
                style={{
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '12px 12px 12px 40px',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '12px 12px 12px 40px',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            type="submit" 
            style={{ padding: '14px', marginTop: '8px', opacity: isLoading ? 0.7 : 1 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Signing In...</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <strong style={{ color: 'var(--text-secondary)' }}>Backend Auth (when server is running):</strong><br/>
            Email: <span style={{ color: 'var(--text-primary)' }}>admin@traveloop.com</span> / Pass: <span style={{ color: 'var(--text-primary)' }}>demo123</span>
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-secondary)' }}>Offline/Demo Mode:</strong><br/>
            ID: <span style={{ color: 'var(--text-primary)' }}>admin</span> / Pass: <span style={{ color: 'var(--text-primary)' }}>password123</span><br/>
            ID: <span style={{ color: 'var(--text-primary)' }}>super</span> / Pass: <span style={{ color: 'var(--text-primary)' }}>superpassword</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
