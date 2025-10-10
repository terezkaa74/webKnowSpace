import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        id,
        full_name,
        created_at,
        reading_progress (
          id,
          completed
        )
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const usersWithStats = data.map(user => ({
        ...user,
        totalArticles: user.reading_progress?.length || 0,
        completedArticles: user.reading_progress?.filter(p => p.completed).length || 0,
      }));
      setUsers(usersWithStats);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container" style={styles.container}>
        <p style={styles.loading}>Načítání uživatelů...</p>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Registrovaní Uživatelé</h1>
      <p style={styles.subtitle}>
        Celkem: <strong>{users.length}</strong> uživatelů
      </p>

      {users.length === 0 ? (
        <div className="card" style={styles.emptyCard}>
          <p style={styles.emptyText}>
            Zatím se neregistroval žádný uživatel.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {users.map((user) => (
            <div key={user.id} className="card" style={styles.userCard}>
              <div style={styles.userIcon}>👤</div>
              <h3 style={styles.userName}>{user.full_name}</h3>
              <div style={styles.userStats}>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>{user.completedArticles}</div>
                  <div style={styles.statLabel}>Přečteno článků</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>{user.totalArticles}</div>
                  <div style={styles.statLabel}>Celkem otevřeno</div>
                </div>
              </div>
              <p style={styles.joinDate}>
                Registrován: {new Date(user.created_at).toLocaleDateString('cs-CZ')}
              </p>
            </div>
          ))}
        </div>
      )}
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
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1.125rem',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 6)',
  },
  loading: {
    textAlign: 'center',
    color: 'var(--gray)',
  },
  emptyCard: {
    textAlign: 'center',
    padding: 'calc(var(--spacing) * 6)',
  },
  emptyText: {
    color: 'var(--gray)',
    fontSize: '1.125rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'calc(var(--spacing) * 4)',
  },
  userCard: {
    textAlign: 'center',
    padding: 'calc(var(--spacing) * 4)',
  },
  userIcon: {
    fontSize: '3rem',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  userName: {
    color: 'var(--primary)',
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  userStats: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 'calc(var(--spacing) * 3)',
    paddingTop: 'calc(var(--spacing) * 3)',
    borderTop: '1px solid var(--light)',
  },
  stat: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    color: 'var(--primary)',
    fontWeight: 700,
    marginBottom: 'calc(var(--spacing) * 1)',
  },
  statLabel: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  joinDate: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
  },
};
