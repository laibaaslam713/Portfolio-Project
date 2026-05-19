import { useState, useEffect, useRef } from 'react';

const TABS = [
  { key: 'all',      label: 'All' },
  { key: 'AI',       label: 'AI / ML' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'Web Dev',  label: 'Web Dev' },
];

const CATEGORY_COLOR = {
  'AI / ML':         { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', text: '#c084fc' },
  'AI & Automation': { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', text: '#c084fc' },
  'Frontend':        { bg: 'rgba(255,20,147,0.10)', border: 'rgba(255,156,220,0.35)', text: 'var(--pink-hot)' },
  'Web Dev':      { bg: 'rgba(20,200,147,0.10)', border: 'rgba(20,200,147,0.35)',  text: '#34d399' },
};

function ProjectCard({ project }) {
  const cat = CATEGORY_COLOR[project.category] ?? CATEGORY_COLOR['Frontend'];

  return (
    <div
      className="project-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        background: 'var(--card-bg, rgba(255,255,255,0.04))',
        border: '1px solid var(--white-border)',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(255,20,147,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Project Image */}
      <div style={{ width: '100%', height: 180, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', flexShrink: 0 }}>
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div
            style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', opacity: 0.18,
              background: 'linear-gradient(135deg, rgba(255,20,147,0.08), rgba(139,92,246,0.08))',
            }}
          >
            🖼️
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '0 1.1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>

        {/* Category badge */}
        <span
          style={{
            display: 'inline-block',
            width: 'fit-content',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            padding: '0.2rem 0.65rem',
            borderRadius: 20,
            background: cat.bg,
            border: `1px solid ${cat.border}`,
            color: cat.text,
          }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3
          className="font-cinzel"
          style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.35, margin: 0 }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: 'var(--text-dim)',
            fontSize: '0.85rem',
            lineHeight: 1.75,
            margin: 0,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {(project.technologies ?? []).map(tech => (
            <span
              key={tech}
              className="skill-pill"
              style={{ fontSize: '0.65rem', padding: '0.18rem 0.65rem' }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.25rem', position: 'relative', zIndex: 10 }}>
          {project.live_demo_link && (
            <a
              href={project.live_demo_link}
              target="_blank"
              rel="noreferrer"
              style={btnStyle('#ff1493', 'rgba(255,20,147,0.15)')}
              onMouseEnter={e => applyHover(e, '#ff1493')}
              onMouseLeave={e => removeHover(e, '#ff1493', 'rgba(255,20,147,0.15)')}
            >
              🔗 Live Demo
            </a>
          )}
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noreferrer"
              style={btnStyle('rgba(255,156,220,0.6)', 'rgba(255,156,220,0.08)')}
              onMouseEnter={e => applyHover(e, 'rgba(255,156,220,0.9)')}
              onMouseLeave={e => removeHover(e, 'rgba(255,156,220,0.6)', 'rgba(255,156,220,0.08)')}
            >
              💻 View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function btnStyle(borderColor, bg) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.42rem 1rem',
    borderRadius: 20,
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 600,
    border: `1px solid ${borderColor}`,
    background: bg,
    color: 'var(--text)',
    textDecoration: 'none',
    transition: 'all 0.25s',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',
    zIndex: 10,
  };
}

function applyHover(e, borderColor) {
  e.currentTarget.style.borderColor = borderColor;
  e.currentTarget.style.transform = 'scale(1.04)';
  e.currentTarget.style.boxShadow = `0 4px 16px rgba(255,20,147,0.18)`;
}

function removeHover(e, borderColor, bg) {
  e.currentTarget.style.borderColor = borderColor;
  e.currentTarget.style.background = bg;
  e.currentTarget.style.transform = 'scale(1)';
  e.currentTarget.style.boxShadow = 'none';
}

function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--white-border)',
        background: 'var(--card-bg, rgba(255,255,255,0.04))',
        animation: 'pulse 1.6s ease-in-out infinite',
      }}
    >
      <div style={{ height: 180, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ padding: '1rem 1.1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <div style={{ height: 14, width: '40%', borderRadius: 8, background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ height: 18, width: '80%', borderRadius: 8, background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ height: 12, width: '100%', borderRadius: 8, background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ height: 12, width: '75%',  borderRadius: 8, background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[60, 50, 70].map(w => (
            <div key={w} style={{ height: 20, width: w, borderRadius: 20, background: 'rgba(255,255,255,0.06)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ height: 28, width: 90, borderRadius: 20, background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ height: 28, width: 90, borderRadius: 20, background: 'rgba(255,255,255,0.07)' }} />
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [active,   setActive]   = useState('all');
  const ref = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const url = `${import.meta.env.BASE_URL}data/projects.json`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('animate-fade-up'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
      active === 'all'
        ? projects
        : projects.filter(p => {
          if (active === 'AI')       return p.category === 'AI / ML' && p.category === 'AI & Automation';
          if (active === 'Web Dev')      return p.category === 'Web Dev';
          if (active === 'frontend') return p.category === 'Frontend';
          return false;
        });

  return (
    <section id="projects" className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <h2 className="section-title mb-10">My Projects</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto">
          <div
            className="flex"
            style={{ border: '1px solid var(--white-border)', borderRadius: 30, overflow: 'hidden', width: 'fit-content' }}
          >
            {TABS.map(t => (
              <button
                key={t.key}
                className={`tab-btn${active === t.key ? ' tab-active' : ''}`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div
            style={{
              textAlign: 'center', padding: '2rem',
              color: '#f87171', background: 'rgba(248,113,113,0.08)',
              borderRadius: 12, border: '1px solid rgba(248,113,113,0.2)',
              marginBottom: '2rem',
            }}
          >
            <p style={{ fontWeight: 600 }}>⚠️ Could not load projects</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', opacity: 0.75 }}>{error}</p>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Project grid */}
        {!loading && !error && filtered.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--text-dim)' }}>
            <p className="text-lg mb-2">🚧 Coming Soon</p>
            <p style={{ fontSize: '0.9rem' }}>No projects in this category yet — check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}