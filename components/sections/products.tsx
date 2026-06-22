'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Brain, Radar, GitBranch } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/reveal'

const PRODUCTS = [
  {
    id: 'os',
    icon: Brain,
    name: 'MarsMate OS',
    tagline: 'The intelligence layer for your venture',
    accent: 'var(--flame)',
    features: [
      'Unified founder command center',
      'Real-time decision intelligence',
      'Autonomous research agents',
    ],
    benefit: 'Run your entire company from one intelligent surface.',
  },
  {
    id: 'engine',
    icon: Radar,
    name: 'Validation Engine',
    tagline: 'Know if it works before you build it',
    accent: 'var(--cyan-glow)',
    features: [
      'Demand and feasibility scoring',
      'Competitive landscape mapping',
      'Risk simulation modeling',
    ],
    benefit: 'De-risk every bet with evidence, not opinion.',
  },
  {
    id: 'graph',
    icon: GitBranch,
    name: 'Capital Graph',
    tagline: 'Your network, intelligently expanded',
    accent: 'var(--magenta-glow)',
    features: [
      'Investor and mentor matching',
      'Warm-intro pathfinding',
      'Round readiness diagnostics',
    ],
    benefit: 'Reach the right capital at exactly the right moment.',
  },
]

export function Products() {
  const [active, setActive] = useState(PRODUCTS[0].id)
  const current = PRODUCTS.find((p) => p.id === active)!

  return (
    <section id="products" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Products"
          title={<>Digital artifacts from the future of building</>}
          description="Each product is a self-contained intelligence engine, designed to feel like an operating system for the next decade."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* holographic showcase */}
          <Reveal>
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl glass p-8">
              <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full items-center justify-center"
              >
                <div
                  className="absolute size-56 rounded-full blur-3xl"
                  style={{ background: current.accent, opacity: 0.25 }}
                />
                {/* rotating rings */}
                <div className="animate-float-slow">
                  <div
                    className="grid size-44 place-items-center rounded-[2rem] glass-strong"
                    style={{ boxShadow: `0 0 60px -10px ${current.accent}` }}
                  >
                    <current.icon
                      className="size-16"
                      style={{ color: current.accent }}
                      strokeWidth={1.2}
                    />
                  </div>
                </div>
                {[0, 1, 2].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute rounded-full border"
                    style={{
                      width: 220 + r * 70,
                      height: 220 + r * 70,
                      borderColor: `${current.accent}55`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 18 + r * 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* detail + selector */}
          <div>
            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active === p.id
                      ? 'bg-primary text-primary-foreground glow-flame'
                      : 'glass text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-7"
            >
              <h3 className="font-heading text-2xl font-semibold tracking-tight">
                {current.name}
              </h3>
              <p className="mt-2 text-muted-foreground">{current.tagline}</p>

              <ul className="mt-6 space-y-3">
                {current.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span
                      className="grid size-6 place-items-center rounded-full"
                      style={{ background: `${current.accent}22` }}
                    >
                      <Check
                        className="size-3.5"
                        style={{ color: current.accent }}
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl glass p-5">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {current.benefit}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
