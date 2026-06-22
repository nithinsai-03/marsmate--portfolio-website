'use client'

import { motion } from 'framer-motion'
import {
  Globe2,
  Layers,
  ShieldCheck,
  Infinity as InfinityIcon,
} from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/reveal'

const METRICS = [
  { label: 'Serviceable market', value: '$1.4T', sub: 'global startup economy' },
  { label: 'Annual new ventures', value: '150M+', sub: 'addressable founders' },
  { label: 'Gross margin', value: '82%', sub: 'platform economics' },
  { label: 'Net revenue retention', value: '141%', sub: 'expansion driven' },
]

const PILLARS = [
  {
    icon: Globe2,
    title: 'Market Opportunity',
    body: 'A structurally underserved global market where intelligence, not capital, is the bottleneck to building.',
  },
  {
    icon: Layers,
    title: 'Business Model',
    body: 'Recurring platform subscriptions layered with marketplace and capital-matching network effects.',
  },
  {
    icon: ShieldCheck,
    title: 'Competitive Advantage',
    body: 'Proprietary validation data compounds with every venture, widening an ever-deepening intelligence moat.',
  },
  {
    icon: InfinityIcon,
    title: 'Scalability',
    body: 'AI-native infrastructure scales to millions of founders with near-zero marginal cost.',
  },
]

const GROWTH = [28, 41, 55, 72, 88, 100]

export function Investors() {
  return (
    <section id="investors" className="relative px-4 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="For Investors"
          title={
            <>
              A category-defining{' '}
              <span className="text-gradient-flame">intelligence platform</span>
            </>
          }
          description="MarsMate sits at the intersection of AI, capital, and venture creation, with compounding data advantages and durable economics."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <div className="rounded-2xl glass p-6">
                <div className="font-heading text-3xl font-semibold text-gradient-cyan">
                  {m.value}
                </div>
                <div className="mt-2 text-sm font-medium">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* growth chart */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl glass p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold">
                  Projected platform growth
                </h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  ARR index
                </span>
              </div>
              <div className="mt-8 flex h-56 items-end justify-between gap-3">
                {GROWTH.map((h, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
                      className="w-full origin-bottom rounded-t-md bg-gradient-to-t from-flame/40 via-ember to-cyan glow-flame"
                      style={{ height: `${h}%`, minHeight: 10 }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      Y{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* pillars */}
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl glass p-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <p.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
