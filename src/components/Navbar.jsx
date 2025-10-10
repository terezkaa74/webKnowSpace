import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { user, adminProfile, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🚀</span>
          <span style={styles.logoText}>KnowSpace</span>
        </Link>

        <div style={styles.menu}>
          <Link to="/" style={styles.link}>Domů</Link>
          <Link to="/clanky" style={styles.link}>Články</Link>
          <Link to="/hry" style={styles.link}>Hry</Link>

          {adminProfile && (
            <Link to="/admin" style={styles.adminLink}>
              Admin Panel
            </Link>
          )}

          {userProfile && (
            <Link to="/muj-profil" style={styles.profileLink}>
              Můj Profil
            </Link>
          )}

          {user ? (
            <button onClick={handleSignOut} className="btn btn-outline" style={styles.authBtn}>
              Odhlásit se
            </button>
          ) : (
            <>
              <Link to="/uzivatel/prihlaseni" className="btn btn-outline" style={styles.authBtn}>
                Přihlásit se
              </Link>
              <Link to="/prihlaseni" style={styles.adminLoginLink}>
                Admin
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'var(--white)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: 'calc(var(--spacing) * 2) 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--spacing) * 1.5)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--primary)',
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--spacing) * 3)',
  },
  link: {
    color: 'var(--dark)',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  adminLink: {
    color: 'var(--secondary)',
    fontWeight: 600,
  },
  profileLink: {
    color: 'var(--primary)',
    fontWeight: 600,
  },
  adminLoginLink: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    textDecoration: 'underline',
  },
  authBtn: {
    marginLeft: 'calc(var(--spacing) * 2)',
  },
};
