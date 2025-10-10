import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <section style={styles.hero}>
        <canvas ref={canvasRef} style={styles.starsCanvas}></canvas>
        <div className="container" style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Objevuj Tajemství Vesmíru! 🌌
          </h1>
          <p style={styles.heroDescription}>
            Vydej se s námi na dobrodružnou cestu po planetách, hvězdách a galaxiích.
            Naučíš se zajímavé věci o vesmíru zábavnou formou.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/clanky" className="btn btn-primary" style={styles.heroBtn}>
              Prozkoumat Články
            </Link>
            <Link to="/hry" className="btn btn-secondary" style={styles.heroBtn}>
              Hrát Hry
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.features}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Co tě čeká?</h2>
          <div style={styles.featureGrid}>
            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>📚</div>
              <h3 style={styles.featureTitle}>Zajímavé Články</h3>
              <p style={styles.featureText}>
                Čti jednoduché a zajímavé články o planetách, hvězdách a vesmíru
              </p>
            </div>

            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>🎮</div>
              <h3 style={styles.featureTitle}>Zábavné Hry</h3>
              <p style={styles.featureText}>
                Hraj simulace a kvízy, které tě naučí mnoho nového o vesmíru
              </p>
            </div>

            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>🚀</div>
              <h3 style={styles.featureTitle}>Vesmírná Dobrodružství</h3>
              <p style={styles.featureText}>
                Prozkoumej sluneční soustavu a dozvíš se o raketách a astronautech
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.cta}>
        <div className="container" style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Připraven na start?</h2>
          <p style={styles.ctaText}>
            Začni objevovat vesmír již dnes!
          </p>
          <Link to="/clanky" className="btn btn-primary" style={styles.ctaBtn}>
            Začít Objevovat
          </Link>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0891b2 100%)',
    color: 'var(--white)',
    padding: 'calc(var(--spacing) * 15) 0',
    textAlign: 'center',
    overflow: 'hidden',
  },
  starsCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: 'calc(var(--spacing) * 3)',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  heroDescription: {
    fontSize: '1.25rem',
    lineHeight: 1.8,
    marginBottom: 'calc(var(--spacing) * 5)',
    opacity: 0.95,
  },
  heroButtons: {
    display: 'flex',
    gap: 'calc(var(--spacing) * 2)',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  heroBtn: {
    fontSize: '1.125rem',
    padding: 'calc(var(--spacing) * 2) calc(var(--spacing) * 4)',
  },
  features: {
    padding: 'calc(var(--spacing) * 10) 0',
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 'calc(var(--spacing) * 6)',
    color: 'var(--dark)',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'calc(var(--spacing) * 4)',
  },
  featureCard: {
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '4rem',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  featureTitle: {
    color: 'var(--primary)',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  featureText: {
    color: 'var(--gray)',
    lineHeight: 1.6,
  },
  cta: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'var(--white)',
    padding: 'calc(var(--spacing) * 10) 0',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    marginBottom: 'calc(var(--spacing) * 2)',
  },
  ctaText: {
    fontSize: '1.25rem',
    marginBottom: 'calc(var(--spacing) * 4)',
    opacity: 0.95,
  },
  ctaBtn: {
    fontSize: '1.125rem',
    padding: 'calc(var(--spacing) * 2) calc(var(--spacing) * 4)',
  },
};
