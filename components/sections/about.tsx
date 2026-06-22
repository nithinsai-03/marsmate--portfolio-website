'use client'

import { motion } from 'framer-motion'
import { Compass, Eye, Brain, Orbit } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/reveal'

const PILLARS = [
  {
    icon: Compass,
    tag: 'Mission',
    title: 'Make great companies inevitable',
    body: 'We compress years of trial and error into days of intelligence, giving every founder an institutional-grade advantage from day one.',
  },
  {
    icon: Eye,
    tag: 'Vision',
    title: 'An operating system for innovation',
    body: 'A single, intelligent layer where ideas are validated, capitalized, built, and launched without friction or guesswork.',
  },
  {
    icon: Brain,
    tag: 'Philosophy',
    title: 'Intelligence over intuition',
    body: 'Conviction should be earned with data. We pair machine reasoning with human ambition to turn instinct into evidence.',
  },
  {
    icon: Orbit,
    tag: 'Future',
    title: 'A connected innovation economy',
    body: 'Millions of founders, investors, and enterprises operating as one living network, building the next era of human progress.',
  },
]

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About MarsMate"
          title={
            <>
              We are building the{' '}
              <span className="text-gradient-cyan">infrastructure</span> of
              ambition
            </>
          }
          description="MarsMate Business Intelligence exists to remove the distance between a bold idea and a scalable, fundable, real-world business."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl glass p-7"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl glass text-accent">
                    <p.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
