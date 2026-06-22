'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ShieldCheck,
  BarChart3,
  Handshake,
  Network,
  Boxes,
  Rocket,
  Store,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/reveal'

const SERVICES = [
  {
    icon: ShieldCheck,
    title: 'AI Startup Validation',
    desc: 'Score feasibility, demand, and risk before you commit a single resource.',
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    desc: 'Live market, customer, and competitive signals distilled into decisions.',
  },
  {
    icon: Handshake,
    title: 'Investor Matching',
    desc: 'Get introduced to aligned capital and mentors at the right stage.',
  },
  {
    icon: Network,
    title: 'Strategic Mind Mapping',
    desc: 'Visualize your venture as an interconnected, evolving system.',
  },
  {
    icon: Boxes,
    title: 'Product Development',
    desc: 'From concept to launch-ready product with intelligent tooling.',
  },
  {
    icon: Rocket,
    title: 'AI Launch Advisor',
    desc: 'A strategic co-pilot guiding every step toward market entry.',
  },
  {
    icon: Store,
    title: 'Technology Marketplace',
    desc: 'Plug-and-play solutions to deploy infrastructure in minutes.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Acceleration',
    desc: 'Compounding playbooks engineered for durable, scalable growth.',
  },
]

function TiltCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof ShieldCheck
  title: string
  desc: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 18,
  })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 18,
  })

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-shadow duration-300 hover:glow-cyan"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.25), transparent 70%)' }}
      />
      <div style={{ transform: 'translateZ(40px)' }} className="flex flex-col">
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-flame/20 to-magenta/10 text-primary">
            <Icon className="size-5" strokeWidth={1.7} />
          </span>
          <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <h3 className="mt-5 font-heading text-lg font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title={<>One platform, end-to-end intelligence</>}
          description="Every capability you need to validate, fund, build, and scale, unified into a single intelligent operating layer."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <TiltCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
