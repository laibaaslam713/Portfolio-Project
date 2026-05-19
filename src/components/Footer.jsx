export default function Footer() {
  return (
    <footer
      className="relative z-10 text-center py-8 px-4"
      style={{
        borderTop: '1px solid var(--white-border)',
        color: 'var(--text-dim)',
        fontSize: '0.82rem',
        letterSpacing: '0.08em',
      }}
    >
      <p className="font-fira">
        ./laiba.aslam{' '}
        <span style={{ color: 'var(--pink)' }}>©</span>{' '}
        {new Date().getFullYear()}
        <span style={{ color: 'var(--white-border)', margin: '0 0.6rem' }}>·</span>
        Built with{' '}
        <span style={{ color: 'var(--pink-hot)' }}>♥</span>{' '}
        in React + Tailwind
        
      </p>
    </footer>
  );
}
