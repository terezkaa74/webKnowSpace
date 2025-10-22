import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const GamePlay = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    fetchGame();
  }, [slug]);

  const fetchGame = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (!error && data) {
      setGame(data);
      incrementPlayCount(data.id);
    }

    setLoading(false);
  };

  const incrementPlayCount = async (gameId) => {
    await supabase
      .from('games')
      .update({ play_count: (game?.play_count || 0) + 1 })
      .eq('id', gameId);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container" style={styles.container}>
        <div style={styles.notFound}>
          <h1 style={styles.notFoundTitle}>Hra nenalezena</h1>
          <p style={styles.notFoundText}>
            Tato hra neexistuje nebo ještě nebyla publikována.
          </p>
          <Link to="/hry" className="btn btn-primary">
            Zpět na hry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <Link to="/hry" style={styles.backLink}>
        ← Zpět na hry
      </Link>

      <div style={styles.gameWrapper}>
        <h1 style={styles.title}>{game.title}</h1>
        <p style={styles.description}>{game.description}</p>

        <div style={styles.gameBadges}>
          <span style={styles.badge}>
            {game.game_type === 'quiz' && 'Kvíz'}
            {game.game_type === 'simulation' && 'Simulace'}
            {game.game_type === 'puzzle' && 'Puzzle'}
            {game.game_type === 'memory' && 'Pexeso'}
          </span>
          <span style={styles.difficulty}>
            {game.difficulty_level === 'easy' && 'Snadné'}
            {game.difficulty_level === 'medium' && 'Střední'}
            {game.difficulty_level === 'hard' && 'Těžké'}
          </span>
        </div>

        <div className="card" style={styles.gameArea}>
          {game.game_data?.external_url ? (
            <iframe
              src={game.game_data.external_url}
              style={styles.iframe}
              title={game.title}
              allowFullScreen
            />
          ) : (
            <>
              <p style={styles.comingSoon}>
                Hra se načítá...
              </p>
              <p style={styles.hint}>
                Interaktivní herní obsah bude zde zobrazen pomocí game_data z databáze.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: 'calc(var(--spacing) * 6)',
    paddingBottom: 'calc(var(--spacing) * 10)',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--primary)',
    fontWeight: 600,
    marginBottom: 'calc(var(--spacing) * 4)',
  },
  gameWrapper: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 2)',
    textAlign: 'center',
  },
  description: {
    fontSize: '1.125rem',
    color: 'var(--gray)',
    marginBottom: 'calc(var(--spacing) * 3)',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  gameBadges: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'calc(var(--spacing) * 3)',
    marginBottom: 'calc(var(--spacing) * 4)',
    fontSize: '0.875rem',
  },
  badge: {
    fontWeight: 600,
    color: 'var(--primary)',
  },
  difficulty: {
    fontWeight: 600,
  },
  gameArea: {
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--gray-lighter)',
    padding: 0,
    overflow: 'hidden',
  },
  iframe: {
    width: '100%',
    height: '600px',
    border: 'none',
  },
  comingSoon: {
    fontSize: '1.5rem',
    color: 'var(--dark)',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  hint: {
    color: 'var(--gray)',
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
};
