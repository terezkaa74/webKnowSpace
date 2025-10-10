import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export const UserProfile = () => {
  const { user, userProfile } = useAuth();
  const [readingProgress, setReadingProgress] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('reading_progress')
      .select(`
        id,
        completed,
        completed_at,
        created_at,
        article_id,
        articles (
          title,
          slug,
          cover_image,
          reading_time
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReadingProgress(data);
      setStats({
        total: data.length,
        completed: data.filter(p => p.completed).length,
        inProgress: data.filter(p => !p.completed).length,
      });
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container" style={styles.container}>
        <p style={styles.loading}>Načítání profilu...</p>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Můj Profil</h1>
        <p style={styles.welcome}>
          Ahoj, <strong>{userProfile?.full_name}</strong>!
        </p>
      </div>

      <div style={styles.statsGrid}>
        <div className="card" style={styles.statCard}>
          <div style={styles.statIcon}>📚</div>
          <h3 style={styles.statNumber}>{stats.total}</h3>
          <p style={styles.statLabel}>Otevřených článků</p>
        </div>

        <div className="card" style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <h3 style={styles.statNumber}>{stats.completed}</h3>
          <p style={styles.statLabel}>Přečtených článků</p>
        </div>

        <div className="card" style={styles.statCard}>
          <div style={styles.statIcon}>📖</div>
          <h3 style={styles.statNumber}>{stats.inProgress}</h3>
          <p style={styles.statLabel}>Rozpracovaných</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Moje četba</h2>

        {readingProgress.length === 0 ? (
          <div className="card" style={styles.emptyCard}>
            <p style={styles.emptyText}>
              Zatím jste nečetli žádné články. Začněte objevovat vesmír!
            </p>
            <Link to="/clanky" className="btn btn-primary" style={styles.exploreBtn}>
              Prozkoumat články
            </Link>
          </div>
        ) : (
          <div style={styles.progressGrid}>
            {readingProgress.map((progress) => (
              <Link
                key={progress.id}
                to={`/clanek/${progress.articles.slug}`}
                className="card"
                style={styles.progressCard}
              >
                {progress.articles.cover_image && (
                  <div
                    style={{
                      ...styles.progressImage,
                      backgroundImage: `url(${progress.articles.cover_image})`,
                    }}
                  />
                )}
                <div style={styles.progressContent}>
                  <h3 style={styles.progressTitle}>{progress.articles.title}</h3>
                  <div style={styles.progressMeta}>
                    <span style={styles.readingTime}>
                      {progress.articles.reading_time} min
                    </span>
                    <span
                      style={{
                        ...styles.badge,
                        ...(progress.completed ? styles.badgeCompleted : styles.badgeInProgress),
                      }}
                    >
                      {progress.completed ? 'Přečteno' : 'Rozpracováno'}
                    </span>
                  </div>
                  {progress.completed && progress.completed_at && (
                    <p style={styles.completedDate}>
                      Dokončeno: {new Date(progress.completed_at).toLocaleDateString('cs-CZ')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
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
  header: {
    textAlign: 'center',
    marginBottom: 'calc(var(--spacing) * 6)',
  },
  title: {
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  welcome: {
    fontSize: '1.25rem',
    color: 'var(--gray)',
  },
  loading: {
    textAlign: 'center',
    color: 'var(--gray)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'calc(var(--spacing) * 4)',
    marginBottom: 'calc(var(--spacing) * 8)',
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
    fontSize: '0.875rem',
    color: 'var(--gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  section: {
    marginBottom: 'calc(var(--spacing) * 8)',
  },
  sectionTitle: {
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  emptyCard: {
    textAlign: 'center',
    padding: 'calc(var(--spacing) * 8)',
  },
  emptyText: {
    color: 'var(--gray)',
    fontSize: '1.125rem',
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  exploreBtn: {
    display: 'inline-flex',
  },
  progressGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'calc(var(--spacing) * 4)',
  },
  progressCard: {
    textDecoration: 'none',
    color: 'inherit',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  progressImage: {
    width: '100%',
    height: '180px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '6px',
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  progressContent: {
    padding: '0 calc(var(--spacing) * 2)',
  },
  progressTitle: {
    color: 'var(--primary)',
    marginBottom: 'calc(var(--spacing) * 2)',
    fontSize: '1.125rem',
  },
  progressMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  readingTime: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
  },
  badge: {
    padding: 'calc(var(--spacing) * 1) calc(var(--spacing) * 2)',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  badgeCompleted: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  badgeInProgress: {
    backgroundColor: '#fff3e0',
    color: '#e65100',
  },
  completedDate: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
  },
};
