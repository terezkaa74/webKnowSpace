import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Opravdu chcete smazat tento článek?')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (!error) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  const togglePublish = async (article) => {
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id);

    if (!error) {
      setArticles(
        articles.map((a) =>
          a.id === article.id ? { ...a, published: !a.published } : a
        )
      );
    }
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
      <div style={styles.header}>
        <Link to="/admin" style={styles.backLink}>
          ← Zpět do Admin Panelu
        </Link>
        <h1 style={styles.title}>Správa Článků</h1>
        <Link to="/admin/clanky/novy" className="btn btn-primary">
          + Nový Článek
        </Link>
      </div>

      {articles.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>Zatím nebyly vytvořeny žádné články</p>
          <Link to="/admin/clanky/novy" className="btn btn-primary">
            Vytvořit První Článek
          </Link>
        </div>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <div style={styles.colTitle}>Název</div>
            <div style={styles.colStatus}>Stav</div>
            <div style={styles.colViews}>Zobrazení</div>
            <div style={styles.colActions}>Akce</div>
          </div>
          {articles.map((article) => (
            <div key={article.id} style={styles.tableRow}>
              <div style={styles.colTitle}>
                <h3 style={styles.articleTitle}>{article.title}</h3>
                <p style={styles.articleMeta}>
                  {article.difficulty_level === 'easy' && '🟢 Snadné'}
                  {article.difficulty_level === 'medium' && '🟡 Střední'}
                  {article.difficulty_level === 'hard' && '🔴 Pokročilé'}
                  {' • '}
                  {article.reading_time} min
                </p>
              </div>
              <div style={styles.colStatus}>
                <button
                  onClick={() => togglePublish(article)}
                  className="btn btn-outline"
                  style={styles.statusBtn}
                >
                  {article.published ? '✓ Publikováno' : '○ Koncept'}
                </button>
              </div>
              <div style={styles.colViews}>
                <span style={styles.views}>👁️ {article.view_count}</span>
              </div>
              <div style={styles.colActions}>
                <Link
                  to={`/admin/clanky/upravit/${article.id}`}
                  className="btn btn-primary"
                  style={styles.actionBtn}
                >
                  Upravit
                </Link>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="btn btn-outline"
                  style={styles.deleteBtn}
                >
                  Smazat
                </button>
              </div>
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
  header: {
    marginBottom: 'calc(var(--spacing) * 6)',
  },
  backLink: {
    display: 'inline-block',
    color: 'var(--primary)',
    fontWeight: 600,
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  title: {
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  table: {
    backgroundColor: 'var(--white)',
    borderRadius: 'calc(var(--spacing) * 2)',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 2fr',
    gap: 'calc(var(--spacing) * 2)',
    padding: 'calc(var(--spacing) * 2)',
    backgroundColor: 'var(--gray-lighter)',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--dark)',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 2fr',
    gap: 'calc(var(--spacing) * 2)',
    padding: 'calc(var(--spacing) * 3)',
    borderBottom: '1px solid var(--gray-lighter)',
    alignItems: 'center',
  },
  colTitle: {},
  colStatus: {},
  colViews: {},
  colActions: {
    display: 'flex',
    gap: 'calc(var(--spacing) * 1)',
  },
  articleTitle: {
    fontSize: '1rem',
    marginBottom: 'calc(var(--spacing) * 0.5)',
    color: 'var(--dark)',
  },
  articleMeta: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
  },
  statusBtn: {
    fontSize: '0.875rem',
    padding: 'calc(var(--spacing) * 1) calc(var(--spacing) * 2)',
  },
  views: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
  },
  actionBtn: {
    fontSize: '0.875rem',
    padding: 'calc(var(--spacing) * 1) calc(var(--spacing) * 2)',
  },
  deleteBtn: {
    fontSize: '0.875rem',
    padding: 'calc(var(--spacing) * 1) calc(var(--spacing) * 2)',
    color: 'var(--error)',
    borderColor: 'var(--error)',
  },
  empty: {
    textAlign: 'center',
    padding: 'calc(var(--spacing) * 10) 0',
  },
  emptyText: {
    fontSize: '1.125rem',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 4)',
  },
};
