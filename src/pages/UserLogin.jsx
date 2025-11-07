import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signInUser, signUpUser, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (user && !isAdmin) {
    return <Navigate to="/muj-profil" replace />;
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignUp) {
      const { error: signUpError } = await signUpUser(email, password, fullName);
      if (signUpError) {
        setError('Chyba při registraci: ' + signUpError.message);
      } else {
        navigate('/muj-profil');
      }
    } else {
      const isAdminLogin = email === 'tereza.gorgolova@gmail.com' && password === 'IsMathReal74Anicka74';

      if (isAdminLogin) {
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError('Neplatné přihlašovací údaje');
        } else {
          navigate('/admin');
        }
      } else {
        const { error: signInError } = await signInUser(email, password);
        if (signInError) {
          setError('Neplatné přihlašovací údaje');
        } else {
          navigate('/muj-profil');
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="container" style={styles.container}>
      <div style={styles.wrapper}>
        <div className="card" style={styles.card}>
          <h1 style={styles.title}>
            {isSignUp ? 'Registrace' : 'Přihlášení'}
          </h1>
          <p style={styles.subtitle}>
            {isSignUp
              ? 'Vytvořte si účet a sledujte svůj pokrok'
              : 'Přihlaste se a pokračujte ve čtení'}
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {isSignUp && (
              <div className="input-group">
                <label htmlFor="fullName">Celé jméno</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Jméno a příjmení"
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vas@email.cz"
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
              {loading
                ? isSignUp
                  ? 'Registrování...'
                  : 'Přihlašování...'
                : isSignUp
                ? 'Registrovat se'
                : 'Přihlásit se'}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              style={styles.toggleBtn}
            >
              {isSignUp
                ? 'Již máte účet? Přihlaste se'
                : 'Nemáte účet? Zaregistrujte se'}
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
