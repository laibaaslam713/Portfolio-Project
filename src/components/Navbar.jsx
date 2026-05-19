import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'About',    id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills',   id: 'skills' },
  { label: 'Contact',  id: 'contact' },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
        style={{
          height: 64,
          background: scrolled
            ? 'rgba(1,1,20,0.85)'
            : 'rgba(1,1,20,0.55)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid var(--white-border)',
          transition: 'background 0.3s',
        }}
      >
        <span
          className="font-cinzel text-xl md:text-2xl cursor-default select-none"
          style={{ color: 'var(--pink)', textShadow: 'var(--glow-pink)', letterSpacing: '0.07em', fontWeight: 'bold' }}
        >
          L.A.
        </span>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_ITEMS.map(n => (
            <li
              key={n.id}
              onClick={() => handleNav(n.id)}
              className="cursor-pointer text-xs uppercase tracking-widest transition-all duration-200"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={e => { e.target.style.color = 'var(--pink)'; e.target.style.textShadow = 'var(--glow-pink)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-dim)'; e.target.style.textShadow = 'none'; }}
            >
              {n.label}
            </li>
          ))}
          <li>
            <a
              href="https://github.com/laibaaslam713"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline text-xs py-2 px-4"
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1 bg-transparent border-none"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block h-0.5 w-6 rounded-sm transition-all duration-300"
            style={{
              background: 'var(--pink)',
              transform: open ? 'rotate(45deg) translateY(7px)' : 'none',
            }}
          />
          <span
            className="block h-0.5 w-6 rounded-sm transition-all duration-300"
            style={{ background: 'var(--pink)', opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-0.5 w-6 rounded-sm transition-all duration-300"
            style={{
              background: 'var(--pink)',
              transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}
          />
        </button>
      </nav>

      <div
        className="fixed top-16 left-0 right-0 z-40 overflow-hidden transition-all duration-300 md:hidden"
        style={{
          maxHeight: open ? 320 : 0,
          background: 'rgba(1,1,20,0.97)',
          borderBottom: open ? '1px solid var(--white-border)' : 'none',
        }}
      >
        <ul className="list-none flex flex-col gap-5 px-6 py-6">
          {NAV_ITEMS.map(n => (
            <li
              key={n.id}
              onClick={() => handleNav(n.id)}
              className="cursor-pointer text-sm uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={e => (e.target.style.color = 'var(--pink)')}
              onMouseLeave={e => (e.target.style.color = 'var(--text-dim)')}
            >
              {n.label}
            </li>
          ))}
          <li>
            <a
              href="https://github.com/laibaaslam713"
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--pink)' }}
              onClick={() => setOpen(false)}
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
