import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AdminGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGames(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Opravdu chcete smazat tuto hru?')) return;

    const { error } = await supabase.from('games').delete().eq('id', id);

    if (!error) {
      setGames(games.filter((g) => g.id !== id));
    }
  };

  const togglePublish = async (game) => {
    const { error } = await supabase
      .from('games')
      .update({ published: !game.published })
      .eq('id', game.id);

    if (!error) {
      setGames(
        games.map((g) =>
          g.id === game.id ? { ...g, published: !g.published } : g
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
        <h1 style={styles.title}>Správa Her</h1>
        <Link to="/admin/hry/nova" className="btn btn-primary">
          + Nová Hra
        </Link>
      </div>

      {games.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>Zatím nebyly vytvořeny žádné hry</p>
          <Link to="/admin/hry/nova" className="btn btn-primary">
            Vytvořit První Hru
          </Link>
        </div>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <div style={styles.colTitle}>Název</div>
            <div style={styles.colStatus}>Stav</div>
            <div style={styles.colPlays}>Hraní</div>
            <div style={styles.colActions}>Akce</div>
          </div>
          {games.map((game) => (
            <div key={game.id} style={styles.tableRow}>
              <div style={styles.colTitle}>
                <h3 style={styles.gameTitle}>{game.title}</h3>
                <p style={styles.gameMeta}>
                  {game.game_type === 'quiz' && '❓ Kvíz'}
                  {game.game_type === 'simulation' && '🚀 Simulace'}
                  {game.game_type === 'puzzle' && '🧩 Puzzle'}
                  {game.game_type === 'memory' && '🃏 Pexeso'}
                  {' • '}
                  {game.difficulty_level === 'easy' && '🟢 Snadné'}
                  {game.difficulty_level === 'medium' && '🟡 Střední'}
                  {game.difficulty_level === 'hard' && '🔴 Těžké'}
                </p>
              </div>
              <div style={styles.colStatus}>
                <button
                  onClick={() => togglePublish(game)}
                  className="btn btn-outline"
                  style={styles.statusBtn}
                >
                  {game.published ? '✓ Publikováno' : '○ Koncept'}
                </button>
              </div>
              <div style={styles.colPlays}>
                <span style={styles.plays}>🎮 {game.play_count}</span>
              </div>
              <div style={styles.colActions}>
                <Link
                  to={`/admin/hry/upravit/${game.id}`}
                  className="btn btn-primary"
                  style={styles.actionBtn}
                >
                  Upravit
                </Link>
                <button
                  onClick={() => handleDelete(game.id)}
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
  colPlays: {},
  colActions: {
    display: 'flex',
    gap: 'calc(var(--spacing) * 1)',
  },
  gameTitle: {
    fontSize: '1rem',
    marginBottom: 'calc(var(--spacing) * 0.5)',
    color: 'var(--dark)',
  },
  gameMeta: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
  },
  statusBtn: {
    fontSize: '0.875rem',
    padding: 'calc(var(--spacing) * 1) calc(var(--spacing) * 2)',
  },
  plays: {
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
