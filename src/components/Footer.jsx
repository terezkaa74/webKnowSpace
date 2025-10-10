export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <p style={styles.text}>
          © {new Date().getFullYear()} KnowSpace - Objevuj Vesmír
        </p>
        <p style={styles.description}>
          Vzdělávací platforma o vesmíru pro děti
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-primary)',
    padding: 'calc(var(--spacing) * 5) 0',
    marginTop: 'calc(var(--spacing) * 10)',
    borderTop: '1px solid var(--border-color)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  container: {
    textAlign: 'center',
  },
  text: {
    fontSize: '1rem',
    marginBottom: 'calc(var(--spacing) * 1)',
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
  },
};
