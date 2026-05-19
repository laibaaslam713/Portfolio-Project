import { useEffect, useRef } from 'react';

const STATS = [
  { num: '6+',  label: 'Projects Built' },
  { num: '15+', label: 'Technologies' },
  { num: '3',   label: 'Domains' },
  { num: '∞',   label: 'Curiosity' },
];

const TAGS = [
  'Web Development', 'Android Dev', 'Data Science',
  'UI/UX Design', 'Machine Learning', 'Open to Work',
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ref.current.classList.add('animate-fade-up');
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative z-10 py-24 px-4">
      <div className="max-w-5xl mx-auto" ref={ref} style={{ opacity: 0 }}>
        <h2 className="section-title mb-12">About Me</h2>

        <div className="glass p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          <div className="flex flex-col gap-4">
            <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: 1.85 }}>
              Hi! I'm a <strong style={{ color: 'var(--pink)' }}>Frontend Developer & IT Graduate</strong> with
              hands-on experience across multiple domains — from crafting pixel-perfect UIs to building
              ML models that solve real-world problems.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              My toolkit spans web development, Android, and data science. I love bridging the
              gap between elegant design and robust engineering.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              I'm passionate about building creative solutions and always eager to learn.
              Currently seeking opportunities where I can grow, contribute meaningfully, and make a real impact.
            </p>

           
            <div className="flex flex-wrap gap-2 mt-2">
              {TAGS.map(t => (
                <span
                  key={t}
                  className="skill-pill"
                  style={{ fontSize: '0.75rem' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map(s => (
              <div
                key={s.label}
                className="glass flex flex-col items-center justify-center py-6 px-4 rounded-2xl text-center"
                style={{
                  background: 'rgba(255,20,147,0.05)',
                  border: '1px solid rgba(255,20,147,0.18)',
                }}
              >
                <span
                  className="font-cinzel"
                  style={{ fontSize: '2.2rem', color: 'var(--pink)', textShadow: 'var(--glow-soft)' }}
                >
                  {s.num}
                </span>
                <span
                  className="font-raleway mt-1"
                  style={{ fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
