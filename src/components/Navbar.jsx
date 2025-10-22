import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar = () => {
  const { user, adminProfile, userProfile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>KnowSpace</span>
        </Link>

        <div style={styles.menu}>
          <Link to="/" style={styles.link}>{t('home')}</Link>
          <Link to="/clanky" style={styles.link}>{t('articles')}</Link>
          <Link to="/hry" style={styles.link}>{t('games')}</Link>

          {adminProfile && (
            <Link to="/admin" style={styles.adminLink}>
              {t('adminPanel')}
            </Link>
          )}

          {userProfile && (
            <Link to="/muj-profil" style={styles.profileLink}>
              {t('myProfile')}
            </Link>
          )}

          <button
            onClick={toggleLanguage}
            style={styles.languageToggle}
            aria-label="Toggle language"
          >
            {language === 'cs' ? 'EN' : 'CS'}
          </button>

          <button
            onClick={toggleTheme}
            style={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <button onClick={handleSignOut} className="btn btn-outline" style={styles.authBtn}>
              {t('signOut')}
            </button>
          ) : (
            <>
              <Link to="/uzivatel/prihlaseni" className="btn btn-outline" style={styles.authBtn}>
                {t('signIn')}
              </Link>
              <Link to="/prihlaseni" style={styles.adminLoginLink}>
                {t('admin')}
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
    backgroundColor: 'var(--card-bg)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: 'calc(var(--spacing) * 1) 0',
    transition: 'background-color 0.3s ease',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'calc(var(--spacing) * 2)',
    flexWrap: 'wrap',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--spacing) * 1.5)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--primary)',
    textDecoration: 'none',
    flexShrink: 0,
    marginLeft: 0,
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
    flexWrap: 'wrap',
  },
  link: {
    color: 'var(--dark)',
    fontWeight: 500,
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
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
  themeToggle: {
    fontSize: '1.5rem',
    padding: 'calc(var(--spacing) * 1)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  languageToggle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    padding: 'calc(var(--spacing) * 1) calc(var(--spacing) * 1.5)',
    background: 'transparent',
    border: '2px solid var(--border-color)',
    color: 'var(--dark)',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.2s',
  },
  authBtn: {
    marginLeft: 'calc(var(--spacing) * 2)',
  },
};
