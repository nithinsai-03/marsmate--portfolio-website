'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/reveal'

type Project = {
  id: string
  name: string
  category: string
  image: string
  summary: string
  tech: string[]
  results: { label: string; value: string }[]
  impact: string
}

const PROJECTS: Project[] = [
  {
    id: 'fintech',
    name: 'Nova Capital',
    category: 'Fintech Intelligence',
    image: '/projects/fintech.png',
    summary:
      'An AI underwriting and analytics platform that validated product-market fit and matched a $14M Series A in record time.',
    tech: ['MarsMate OS', 'Validation Engine', 'Capital Graph'],
    results: [
      { label: 'Time to launch', value: '31 days' },
      { label: 'Capital raised', value: '$14M' },
      { label: 'Risk reduced', value: '64%' },
    ],
    impact:
      'Nova entered the market with institutional conviction, skipping 18 months of guesswork.',
  },
  {
    id: 'health',
    name: 'Helix Health',
    category: 'AI Healthcare',
    image: '/projects/health.png',
    summary:
      'A diagnostics startup that used MarsMate to map a defensible niche and align with strategic clinical investors.',
    tech: ['Validation Engine', 'Strategic Mind Mapping', 'AI Launch Advisor'],
    results: [
      { label: 'Markets analyzed', value: '46' },
      { label: 'Investor matches', value: '22' },
      { label: 'Launch speed', value: '3.2x' },
    ],
    impact:
      'Helix found a high-conviction wedge and reached pilot deployments within a quarter.',
  },
  {
    id: 'climate',
    name: 'Terra Grid',
    category: 'Climate Tech',
    image: '/projects/climate.png',
    summary:
      'A grid-optimization venture that modeled global demand and assembled a launch-ready technology stack.',
    tech: ['MarsMate OS', 'Technology Marketplace', 'Growth Acceleration'],
    results: [
      { label: 'TAM mapped', value: '$1.2T' },
      { label: 'Cost saved', value: '57%' },
      { label: 'Pilots signed', value: '9' },
    ],
    impact:
      'Terra Grid scaled from concept to multi-region pilots without expanding headcount.',
  },
]

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio"
          title={<>Ventures launched through the platform</>}
          description="Real companies that compressed years of risk into weeks of intelligence. Open a capsule to explore the outcome."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.button
                layoutId={`card-${p.id}`}
                onClick={() => setSelected(p)}
                whileHover={{ y: -8 }}
                className="group relative block w-full overflow-hidden rounded-3xl glass text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    layoutId={`img-${p.id}`}
                    src={p.image}
                    alt={`${p.name} — ${p.category}`}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    {p.category}
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold">
                      {p.name}
                    </h3>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <motion.div
              layoutId={`card-${selected.id}`}
              className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass-strong"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <motion.img
                  layoutId={`img-${selected.id}`}
                  src={selected.image}
                  alt={`${selected.name} — ${selected.category}`}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 grid size-9 place-items-center rounded-full glass-strong"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  {selected.category}
                </span>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                  {selected.name}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {selected.summary}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {selected.results.map((r) => (
                    <div key={r.label} className="rounded-2xl glass p-4 text-center">
                      <div className="font-heading text-xl font-semibold text-gradient-flame">
                        {r.value}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full glass px-3 py-1.5 text-xs text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <p className="text-sm leading-relaxed">{selected.impact}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
