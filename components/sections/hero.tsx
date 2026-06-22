'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const IntelligenceCore = dynamic(
  () => import('@/components/three/intelligence-core'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center">
        <div className="size-40 animate-pulse rounded-full bg-primary/20 blur-3xl" />
      </div>
    ),
  },
)

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-28"
    >
      {/* 3D scene */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <IntelligenceCore />
      </div>

      {/* ambient gradients */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 size-[120vw] max-w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.10),transparent_55%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(5,5,5,0.78),rgba(5,5,5,0.35)_45%,transparent_70%)]" />
        <motion.div
          variants={item}
          className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground"
        >
          <Sparkles className="size-3.5 text-accent" />
          AI-Powered Startup Intelligence Platform
        </motion.div>

        <motion.h1
          variants={item}
          className="font-heading text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
        >
          Build ideas that{' '}
          <span className="text-gradient-flame">actually work</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Transform startup ideas into validated businesses using AI-powered
          intelligence, market analysis, strategic guidance, and launch-ready
          technology.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] glow-flame"
          >
            Start Building
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#intelligence"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
          >
            Explore Intelligence Engine
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="grid size-8 place-items-center rounded-full glass">
              <Play className="size-3.5 fill-current" />
            </span>
            Watch Platform Demo
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4"
        >
          {[
            { v: '12K+', l: 'Ideas validated' },
            { v: '$840M', l: 'Capital matched' },
            { v: '38 days', l: 'Avg. to launch' },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl glass px-3 py-4">
              <div className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="size-1.5 rounded-full bg-foreground/70"
          />
        </div>
      </div>
    </section>
  )
}
