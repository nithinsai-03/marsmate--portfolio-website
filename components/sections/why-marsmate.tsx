'use client'

import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/reveal'
import { AnimatedSectionWrapper } from '@/components/animated-section-wrapper'

const ROWS = [
  { label: 'Time to validated launch', traditional: '12–24 months', marsmate: '4–8 weeks' },
  { label: 'Upfront capital at risk', traditional: 'High & speculative', marsmate: 'Minimized by data' },
  { label: 'Market & competitor insight', traditional: 'Manual, outdated', marsmate: 'Real-time AI' },
  { label: 'Investor access', traditional: 'Cold & random', marsmate: 'Matched & warm' },
  { label: 'Technology stack', traditional: 'Built from scratch', marsmate: 'Plug-and-play' },
  { label: 'Probability of success', traditional: 'Roughly 1 in 10', marsmate: '3–5x improved' },
]

export function WhyMarsMate() {
  return (
    <AnimatedSectionWrapper id="why" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Why MarsMate"
          title={<>The old way, reimagined</>}
          description="The traditional startup journey is slow, expensive, and uncertain. MarsMate rebuilds it as an intelligent, compressed system."
        />

        <Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl glass">
            <div className="grid grid-cols-3 border-b border-white/10 text-sm font-medium">
              <div className="p-5 text-muted-foreground">Dimension</div>
              <div className="p-5 text-muted-foreground">Traditional journey</div>
              <div className="relative p-5">
                <span className="text-gradient-flame font-heading text-base font-semibold">
                  MarsMate Platform
                </span>
                <span className="absolute inset-0 -z-0 bg-primary/5" />
              </div>
            </div>

            {ROWS.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid grid-cols-3 border-b border-white/5 text-sm last:border-0"
              >
                <div className="p-5 font-medium">{r.label}</div>
                <div className="flex items-center gap-2 p-5 text-muted-foreground">
                  <Minus className="size-4 shrink-0 text-muted-foreground/60" />
                  {r.traditional}
                </div>
                <div className="relative flex items-center gap-2 p-5">
                  <span className="absolute inset-0 bg-primary/5" />
                  <Check className="relative size-4 shrink-0 text-primary" />
                  <span className="relative">{r.marsmate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </AnimatedSectionWrapper>
  )
}
