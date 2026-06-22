'use client'

import { motion } from 'framer-motion'
import { SectionHeading, Reveal } from '@/components/reveal'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const TEAM = [
  {
    name: 'Arjun Mehra',
    role: 'Founder & CEO',
    expertise: 'Venture strategy, AI systems',
    image: '/team/founder.png',
    bio: 'Built and scaled three ventures before founding MarsMate to systematize how companies are born.',
  },
  {
    name: 'Mei Tanaka',
    role: 'Chief Technology Officer',
    expertise: 'Applied ML, data infrastructure',
    image: '/team/cto.png',
    bio: 'Leads the intelligence engine, turning frontier research into reliable decision systems.',
  },
  {
    name: 'David Okoye',
    role: 'Head of Strategy',
    expertise: 'Market intelligence, GTM',
    image: '/team/strategy.png',
    bio: 'Architects the frameworks that translate raw signal into defensible market positioning.',
  },
  {
    name: 'Lucia Ramos',
    role: 'Head of Product Design',
    expertise: 'Spatial UX, design systems',
    image: '/team/design.png',
    bio: 'Designs the immersive interfaces that make complex intelligence feel effortless.',
  },
]

export function Team() {
  return (
    <section id="team" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Command Center"
          title={<>The people behind the intelligence</>}
          description="A team of operators, engineers, and strategists building the platform we wished existed."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <motion.div
                whileHover="hover"
                className="group relative overflow-hidden rounded-3xl glass"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* AI scan line */}
                  <motion.div
                    variants={{
                      hover: { top: ['0%', '100%'], opacity: [0, 1, 0] },
                    }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="pointer-events-none absolute left-0 right-0 h-px bg-accent/80 shadow-[0_0_12px_var(--cyan-glow)]"
                    style={{ top: '0%', opacity: 0 }}
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-3 rounded-2xl border border-accent/30" />
                    <span className="absolute left-4 top-4 text-[10px] font-mono uppercase tracking-widest text-accent">
                      Scanning
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-base font-semibold">
                        {m.name}
                      </h3>
                      <p className="text-sm text-primary">{m.role}</p>
                    </div>
                    <a
                      href="#"
                      aria-label={`${m.name} on LinkedIn`}
                      className="grid size-8 shrink-0 place-items-center rounded-lg glass text-muted-foreground transition-colors hover:text-accent"
                    >
                      <LinkedInIcon className="size-4" />
                    </a>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {m.expertise}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
                    {m.bio}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
