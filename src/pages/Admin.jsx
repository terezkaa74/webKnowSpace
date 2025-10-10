import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const Admin = () => {
  const { adminProfile } = useAuth();
  const [stats, setStats] = useState({
    articles: 0,
    games: 0,
    publishedArticles: 0,
    publishedGames: 0,
    users: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [articlesResult, gamesResult, usersResult] = await Promise.all([
      supabase.from('articles').select('id, published'),
      supabase.from('games').select('id, published'),
      supabase.from('user_profiles').select('id'),
    ]);

    setStats({
      articles: articlesResult.data?.length || 0,
      games: gamesResult.data?.length || 0,
      publishedArticles:
        articlesResult.data?.filter((a) => a.published).length || 0,
      publishedGames:
        gamesResult.data?.filter((g) => g.published).length || 0,
      users: usersResult.data?.length || 0,
    });
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Admin Panel 🎛️</h1>
      <p style={styles.welcome}>
        Vítejte, <strong>{adminProfile?.full_name}</strong>!
      </p>

      <div style={styles.statsGrid}>
        <div className="card" style={styles.statCard}>
          <div style={styles.statIcon}>📚</div>
          <h3 style={styles.statNumber}>{stats.articles}</h3>
          <p style={styles.statLabel}>Celkem článků</p>
          <p style={styles.statDetail}>
            {stats.publishedArticles} publikovaných
          </p>
        </div>

        <div className="card" style={styles.statCard}>
          <div style={styles.statIcon}>🎮</div>
          <h3 style={styles.statNumber}>{stats.games}</h3>
          <p style={styles.statLabel}>Celkem her</p>
          <p style={styles.statDetail}>
            {stats.publishedGames} publikovaných
          </p>
        </div>

        <div className="card" style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <h3 style={styles.statNumber}>{stats.users}</h3>
          <p style={styles.statLabel}>Registrovaní uživatelé</p>
          <p style={styles.statDetail}>
            Sledují své pokroky
          </p>
        </div>
      </div>

      <div style={styles.actionsGrid}>
        <Link to="/admin/clanky" className="card" style={styles.actionCard}>
          <div style={styles.actionIcon}>📝</div>
          <h3 style={styles.actionTitle}>Správa Článků</h3>
          <p style={styles.actionDescription}>
            Vytvářejte, upravujte a publikujte články o vesmíru
          </p>
        </Link>

        <Link to="/admin/hry" className="card" style={styles.actionCard}>
          <div style={styles.actionIcon}>🎯</div>
          <h3 style={styles.actionTitle}>Správa Her</h3>
          <p style={styles.actionDescription}>
            Vytvářejte a spravujte interaktivní hry a kvízy
          </p>
        </Link>

        <Link to="/admin/tagy" className="card" style={styles.actionCard}>
          <div style={styles.actionIcon}>🏷️</div>
          <h3 style={styles.actionTitle}>Správa Tagů</h3>
          <p style={styles.actionDescription}>
            Organizujte obsah pomocí kategorií a tagů
          </p>
        </Link>

        <Link to="/admin/uzivatele" className="card" style={styles.actionCard}>
          <div style={styles.actionIcon}>👥</div>
          <h3 style={styles.actionTitle}>Registrovaní Uživatelé</h3>
          <p style={styles.actionDescription}>
            Prohlížejte uživatele a jejich pokroky ve čtení
          </p>
        </Link>

        {adminProfile?.role === 'super_admin' && (
          <Link to="/admin/admini" className="card" style={styles.actionCard}>
            <div style={styles.actionIcon}>🔐</div>
            <h3 style={styles.actionTitle}>Správa Adminů</h3>
            <p style={styles.actionDescription}>
              Spravujte administrátorské účty a oprávnění
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: 'calc(var(--spacing) * 6)',
    paddingBottom: 'calc(var(--spacing) * 10)',
  },
  title: {
    textAlign: 'center',
    color: 'var(--dark)',
  },
  welcome: {
    textAlign: 'center',
    fontSize: '1.125rem',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 6)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'calc(var(--spacing) * 4)',
    marginBottom: 'calc(var(--spacing) * 6)',
  },
  statCard: {
    textAlign: 'center',
  },
  statIcon: {
    fontSize: '3rem',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  statNumber: {
    fontSize: '2.5rem',
    color: 'var(--primary)',
    marginBottom: 'calc(var(--spacing) * 1)',
  },
  statLabel: {
    fontSize: '1rem',
    color: 'var(--dark)',
    fontWeight: 600,
    marginBottom: 'calc(var(--spacing) * 1)',
  },
  statDetail: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'calc(var(--spacing) * 4)',
  },
  actionCard: {
    textAlign: 'center',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  actionIcon: {
    fontSize: '3rem',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  actionTitle: {
    color: 'var(--primary)',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  actionDescription: {
    color: 'var(--gray)',
    lineHeight: 1.6,
  },
};
