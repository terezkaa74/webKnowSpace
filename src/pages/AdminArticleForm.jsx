import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const AdminArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    reading_time: 5,
    difficulty_level: 'easy',
    published: false,
    language: 'cs',
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      setFormData(data);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'title' && !isEdit) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const articleData = {
      ...formData,
      created_by: user.id,
    };

    let result;
    if (isEdit) {
      result = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', id);
    } else {
      result = await supabase.from('articles').insert([articleData]);
    }

    if (result.error) {
      setError('Chyba při ukládání článku: ' + result.error.message);
    } else {
      navigate('/admin/clanky');
    }

    setLoading(false);
  };

  return (
    <div className="container" style={styles.container}>
      <Link to="/admin/clanky" style={styles.backLink}>
        ← Zpět na články
      </Link>

      <h1 style={styles.title}>
        {isEdit ? 'Upravit Článek' : 'Nový Článek'}
      </h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="input-group">
          <label htmlFor="title">Název článku *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Např. Sluneční soustava"
          />
        </div>

        <div className="input-group">
          <label htmlFor="slug">URL (slug) *</label>
          <input
            id="slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="slunecni-soustava"
          />
        </div>

        <div className="input-group">
          <label htmlFor="excerpt">Krátký popis *</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Stručný popis článku..."
          />
        </div>

        <div className="input-group">
          <label htmlFor="content">Obsah článku *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="15"
            placeholder="Zde napište obsah článku..."
          />
        </div>

        <div className="input-group">
          <label htmlFor="cover_image">URL titulního obrázku</label>
          <input
            id="cover_image"
            name="cover_image"
            type="url"
            value={formData.cover_image}
            onChange={handleChange}
            placeholder="https://images.pexels.com/..."
          />
        </div>

        <div style={styles.row}>
          <div className="input-group" style={styles.halfWidth}>
            <label htmlFor="reading_time">Doba čtení (minuty)</label>
            <input
              id="reading_time"
              name="reading_time"
              type="number"
              value={formData.reading_time}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div className="input-group" style={styles.halfWidth}>
            <label htmlFor="difficulty_level">Obtížnost</label>
            <select
              id="difficulty_level"
              name="difficulty_level"
              value={formData.difficulty_level}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="easy">Snadné</option>
              <option value="medium">Střední</option>
              <option value="hard">Pokročilé</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="language">Jazyk *</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="cs">Čeština</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="input-group">
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Publikovat článek
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <div style={styles.buttons}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Ukládám...' : isEdit ? 'Uložit změny' : 'Vytvořit článek'}
          </button>
          <Link to="/admin/clanky" className="btn btn-outline">
            Zrušit
          </Link>
        </div>
      </form>
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
    display: 'inline-block',
    color: 'var(--primary)',
    fontWeight: 600,
    marginBottom: 'calc(var(--spacing) * 3)',
  },
  title: {
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  form: {
    backgroundColor: 'var(--white)',
    padding: 'calc(var(--spacing) * 4)',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'calc(var(--spacing) * 2)',
  },
  halfWidth: {
    marginBottom: 0,
  },
  select: {
    width: '100%',
    padding: 'calc(var(--spacing) * 1.5)',
    border: '2px solid var(--gray-light)',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--spacing) * 1.5)',
    cursor: 'pointer',
  },
  checkbox: {
    width: 'auto',
    height: '20px',
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    gap: 'calc(var(--spacing) * 2)',
    marginTop: 'calc(var(--spacing) * 3)',
  },
};
