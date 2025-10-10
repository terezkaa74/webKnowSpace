import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const ArticleDetail = () => {
  const { slug } = useParams();
  const { user, isAdmin } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (!error && data) {
      setArticle(data);
      incrementViewCount(data.id);
      if (user && !isAdmin) {
        trackReadingProgress(data.id);
        fetchProgress(data.id);
      }
    }

    setLoading(false);
  };

  const incrementViewCount = async (articleId) => {
    await supabase.rpc('increment', {
      row_id: articleId,
      table_name: 'articles',
    }).catch(() => {
      supabase
        .from('articles')
        .update({ view_count: article.view_count + 1 })
        .eq('id', articleId);
    });
  };

  const trackReadingProgress = async (articleId) => {
    const { error } = await supabase
      .from('reading_progress')
      .upsert(
        {
          user_id: user.id,
          article_id: articleId,
          completed: false,
        },
        {
          onConflict: 'user_id,article_id',
          ignoreDuplicates: true,
        }
      );

    if (error) {
      console.error('Error tracking progress:', error);
    }
  };

  const fetchProgress = async (articleId) => {
    const { data } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('article_id', articleId)
      .maybeSingle();

    if (data) {
      setProgress(data);
    }
  };

  const markAsCompleted = async () => {
    if (!user || isAdmin || !article) return;

    const { error } = await supabase
      .from('reading_progress')
      .upsert(
        {
          user_id: user.id,
          article_id: article.id,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,article_id',
        }
      );

    if (!error) {
      setProgress({ ...progress, completed: true });
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container" style={styles.container}>
        <div style={styles.notFound}>
          <h1 style={styles.notFoundTitle}>Článek nenalezen 😢</h1>
          <p style={styles.notFoundText}>
            Tento článek neexistuje nebo ještě nebyl publikován.
          </p>
          <Link to="/clanky" className="btn btn-primary">
            Zpět na články
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <Link to="/clanky" style={styles.backLink}>
        ← Zpět na články
      </Link>

      <article style={styles.article}>
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            style={styles.coverImage}
          />
        )}

        <div style={styles.meta}>
          <span style={styles.badge}>
            {article.difficulty_level === 'easy' && '🟢 Snadné'}
            {article.difficulty_level === 'medium' && '🟡 Střední'}
            {article.difficulty_level === 'hard' && '🔴 Pokročilé'}
          </span>
          <span style={styles.readTime}>
            ⏱️ {article.reading_time} min čtení
          </span>
          <span style={styles.views}>
            👁️ {article.view_count} zobrazení
          </span>
        </div>

        <h1 style={styles.title}>{article.title}</h1>

        <div
          style={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
        />

        {user && !isAdmin && (
          <div style={styles.progressSection}>
            {progress && progress.completed ? (
              <div style={styles.completedBadge}>
                ✅ Článek je označen jako přečtený
              </div>
            ) : (
              <button
                onClick={markAsCompleted}
                className="btn btn-primary"
                style={styles.completeBtn}
              >
                ✓ Označit jako přečtené
              </button>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: 'calc(var(--spacing) * 6)',
    paddingBottom: 'calc(var(--spacing) * 10)',
    maxWidth: '800px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--primary)',
    fontWeight: 600,
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  article: {
    backgroundColor: 'var(--white)',
  },
  coverImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: 'calc(var(--spacing) * 2)',
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  meta: {
    display: 'flex',
    gap: 'calc(var(--spacing) * 3)',
    marginBottom: 'calc(var(--spacing) * 3)',
    flexWrap: 'wrap',
    fontSize: '0.875rem',
  },
  badge: {
    fontWeight: 600,
  },
  readTime: {
    color: 'var(--gray)',
  },
  views: {
    color: 'var(--gray)',
  },
  title: {
    fontSize: '2.5rem',
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 4)',
    lineHeight: 1.3,
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.8,
    color: 'var(--dark-800)',
  },
  notFound: {
    textAlign: 'center',
    padding: 'calc(var(--spacing) * 10) 0',
  },
  notFoundTitle: {
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  notFoundText: {
    fontSize: '1.125rem',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  progressSection: {
    marginTop: 'calc(var(--spacing) * 8)',
    paddingTop: 'calc(var(--spacing) * 6)',
    borderTop: '2px solid var(--light)',
    textAlign: 'center',
  },
  completeBtn: {
    fontSize: '1.125rem',
    padding: 'calc(var(--spacing) * 3) calc(var(--spacing) * 6)',
  },
  completedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'calc(var(--spacing) * 2)',
    padding: 'calc(var(--spacing) * 3) calc(var(--spacing) * 6)',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: 'calc(var(--spacing) * 2)',
    fontSize: '1.125rem',
    fontWeight: 600,
  },
};
