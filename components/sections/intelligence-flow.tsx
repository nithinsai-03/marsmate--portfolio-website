'use client'

import { motion } from 'framer-motion'
import {
  Lightbulb,
  ShieldCheck,
  LineChart,
  Handshake,
  Cpu,
  Rocket,
} from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/reveal'

const STAGES = [
  {
    icon: Lightbulb,
    title: 'Idea Input',
    desc: 'Describe your concept in plain language.',
    color: 'var(--ember)',
  },
  {
    icon: ShieldCheck,
    title: 'AI Validation',
    desc: 'Feasibility, demand and risk scoring in seconds.',
    color: 'var(--flame)',
  },
  {
    icon: LineChart,
    title: 'Market Analysis',
    desc: 'TAM, competitors and positioning intelligence.',
    color: 'var(--cyan-glow)',
  },
  {
    icon: Handshake,
    title: 'Investor Matching',
    desc: 'Connect with aligned capital and mentors.',
    color: 'var(--indigo-glow)',
  },
  {
    icon: Cpu,
    title: 'Tech Deployment',
    desc: 'Plug-and-play, launch-ready architecture.',
    color: 'var(--magenta-glow)',
  },
  {
    icon: Rocket,
    title: 'Business Launch',
    desc: 'Go to market with a validated playbook.',
    color: 'var(--ember)',
  },
]

export function IntelligenceFlow() {
  return (
    <section id="intelligence" className="relative px-4 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Intelligence Engine"
          title={<>From spark to scale, fully orchestrated</>}
          description="A continuous AI ecosystem that moves your idea through every critical stage of validation and growth, in real time."
        />

        <div className="mt-16">
          {/* connecting line */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left' }}
              className="absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-flame via-cyan to-magenta lg:block"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
              {STAGES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="group flex flex-col items-center text-center">
                    <div
                      className="relative grid size-[88px] place-items-center rounded-2xl glass transition-transform duration-300 group-hover:-translate-y-1.5"
                      style={{ boxShadow: `0 0 30px -12px ${s.color}` }}
                    >
                      <span
                        className="absolute inset-0 rounded-2xl opacity-40"
                        style={{
                          background: `radial-gradient(circle at 50% 30%, ${s.color}33, transparent 70%)`,
                        }}
                      />
                      <s.icon
                        className="size-7"
                        style={{ color: s.color }}
                        strokeWidth={1.6}
                      />
                      <span className="absolute -top-2 right-1 rounded-full bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-sm font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
