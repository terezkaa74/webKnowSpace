import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { language, t } = useLanguage();

  useEffect(() => {
    fetchArticles();
  }, [filter, language]);

  const fetchArticles = async () => {
    setLoading(true);
    let query = supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('language', language)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('difficulty_level', filter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setArticles(data);
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
      <h1 style={styles.title}>Články o Vesmíru</h1>
      <p style={styles.subtitle}>
        Objevuj zajímavé informace o planetách, hvězdách a vesmírných jevech
      </p>

      <div style={styles.filterContainer}>
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          Všechny
        </button>
        <button
          onClick={() => setFilter('easy')}
          className={filter === 'easy' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          Snadné
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={filter === 'medium' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          Střední
        </button>
        <button
          onClick={() => setFilter('hard')}
          className={filter === 'hard' ? 'btn btn-primary' : 'btn btn-outline'}
          style={styles.filterBtn}
        >
          Pokročilé
        </button>
      </div>

      {articles.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>Zatím zde nejsou žádné články</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/clanek/${article.slug}`}
              className="card"
              style={styles.card}
            >
              {article.cover_image && (
                <img
                  src={article.cover_image}
                  alt={article.title}
                  style={styles.image}
                />
              )}
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{article.title}</h3>
                <p style={styles.excerpt}>{article.excerpt}</p>
                <div style={styles.meta}>
                  <span style={styles.badge}>
                    {article.difficulty_level === 'easy' && 'Snadné'}
                    {article.difficulty_level === 'medium' && 'Střední'}
                    {article.difficulty_level === 'hard' && 'Pokročilé'}
                  </span>
                  <span style={styles.readTime}>
                    {article.reading_time} min
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
  '@media (max-width: 768px)': {
    grid: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: 'calc(var(--spacing) * 3)',
    },
  },
  '@media (max-width: 480px)': {
    grid: {
      gridTemplateColumns: '1fr',
    },
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
  excerpt: {
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
  readTime: {
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
