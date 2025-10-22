import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();

  useEffect(() => {
    fetchGames();
  }, [filter]);

  const fetchGames = async () => {
    setLoading(true);
    let query = supabase
      .from('games')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('game_type', filter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setGames(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>{t('gamesPageTitle')}</h1>
      <p style={styles.subtitle}>
        {t('gamesPageSubtitle')}
      </p>

      <div style={styles.filterContainer}>
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          {t('all')}
        </button>
        <button
          onClick={() => setFilter('quiz')}
          className={filter === 'quiz' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          {t('quiz')}
        </button>
        <button
          onClick={() => setFilter('simulation')}
          className={filter === 'simulation' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          {t('simulation')}
        </button>
        <button
          onClick={() => setFilter('puzzle')}
          className={filter === 'puzzle' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          {t('puzzle')}
        </button>
        <button
          onClick={() => setFilter('memory')}
          className={filter === 'memory' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          {t('memory')}
        </button>
      </div>

      {games.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>{t('noGames')}</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/hra/${game.slug}`}
              className="card"
              style={styles.card}
            >
              {game.thumbnail && (
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  style={styles.image}
                />
              )}
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{game.title}</h3>
                <p style={styles.description}>{game.description}</p>
                <div style={styles.meta}>
                  <span style={styles.badge}>
                    {game.game_type === 'quiz' && t('quiz')}
                    {game.game_type === 'simulation' && t('simulation')}
                    {game.game_type === 'puzzle' && t('puzzle')}
                    {game.game_type === 'memory' && t('memory')}
                  </span>
                  <span style={styles.playCount}>
                    {game.play_count}
                  </span>
                </div>
              </div>
            </Link>
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
  },
  subtitle: {
    textAlign: 'center',
    color: 'var(--gray)',
    fontSize: '1.125rem',
    marginBottom: 'calc(var(--spacing) * 6)',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'calc(var(--spacing) * 2)',
    marginBottom: 'calc(var(--spacing) * 6)',
    flexWrap: 'wrap',
  },
  filterBtn: {
    minWidth: '120px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 'calc(var(--spacing) * 4)',
  },
  card: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '6px 6px 0 0',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  description: {
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 2)',
    lineHeight: 1.6,
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem',
  },
  badge: {
    fontWeight: 600,
  },
  playCount: {
    color: 'var(--gray)',
  },
  empty: {
    textAlign: 'center',
    padding: 'calc(var(--spacing) * 10) 0',
  },
  emptyText: {
    fontSize: '1.25rem',
    color: 'var(--gray)',
  },
};
