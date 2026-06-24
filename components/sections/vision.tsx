'use client'

import { motion } from 'framer-motion'
import { Reveal } from '@/components/reveal'
import { AnimatedSectionWrapper } from '@/components/animated-section-wrapper'

export function Vision() {

  return (
    <section
      id="vision"
      className="relative px-4 py-24 sm:py-32"
    >
      <motion.div className="absolute inset-0 z-0">
        <img
          src="/vision/earth-network.png"
          alt="Earth transformed into a connected global innovation network"
          className="size-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_85%)]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The Vision
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-balance font-heading text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            Building the operating system for{' '}
            <span className="text-gradient-flame">human innovation</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            We imagine a world where every founder, in every city, has access to
            institutional intelligence. Where ideas connect to capital, talent,
            and technology instantly. Where the next era of human progress is
            built on a single, living network of innovation.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href="#contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] glow-flame"
          >
            Join the ecosystem
          </a>
        </Reveal>
      </div>
    </section>
  )
}
