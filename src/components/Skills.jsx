import { useEffect, useRef } from 'react';
import SKILLS from "../../public/data/skills.json";

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('animate-fade-up'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative z-10 py-24 px-4">
      <div className="max-w-5xl mx-auto" ref={ref} style={{ opacity: 0 }}>
        <h2 className="section-title mb-12">Skills & Technologies</h2>

        <div className="glass p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {SKILLS.map(group => (
            <div key={group.group}>
              {/* Group header */}
              <h3
                className="font-cinzel flex items-center gap-2 mb-4"
                style={{ fontSize: '0.95rem', color: 'var(--pink-soft)', letterSpacing: '0.05em' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--pink-hot)',
                    boxShadow: 'var(--glow-pink)',
                    flexShrink: 0,
                  }}
                />
                {group.icon} {group.group}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-6 font-fira"
          style={{ color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.06em' }}
        >
          Always learning · Always building
        </p>
      </div>
    </section>
  );
}
