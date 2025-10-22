import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError('Neplatné přihlašovací údaje');
    } else {
      navigate('/admin');
    }

    setLoading(false);
  };

  return (
    <div className="container" style={styles.container}>
      <div style={styles.wrapper}>
        <div className="card" style={styles.card}>
          <h1 style={styles.title}>Admin Přihlášení</h1>
          <p style={styles.subtitle}>
            Přihlaste se do administračního panelu
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@knowspace.cz"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Heslo</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary"
              style={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Přihlašování...' : 'Přihlásit se'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: 'calc(var(--spacing) * 10)',
    paddingBottom: 'calc(var(--spacing) * 10)',
  },
  wrapper: {
    maxWidth: '450px',
    margin: '0 auto',
  },
  card: {
    padding: 'calc(var(--spacing) * 5)',
  },
  title: {
    textAlign: 'center',
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  subtitle: {
    textAlign: 'center',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  form: {
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
  },
  toggleBtn: {
    width: '100%',
    marginTop: 'calc(var(--spacing) * 2)',
    color: 'var(--primary)',
    background: 'none',
    border: 'none',
    fontSize: '0.875rem',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};
