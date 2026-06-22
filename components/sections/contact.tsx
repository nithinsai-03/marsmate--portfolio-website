'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, CheckCircle2, Terminal } from 'lucide-react'
import { SectionHeading } from '@/components/reveal'

type FieldKey =
  | 'name'
  | 'company'
  | 'email'
  | 'project'
  | 'interest'
  | 'message'

const TIPS: Record<FieldKey | 'idle', string> = {
  idle: 'Initializing secure channel… tell me about what you are building.',
  name: 'Great to meet you. What should I call you?',
  company: 'Which company or venture are you representing?',
  email: 'I will route our intelligence team to this address.',
  project: 'Describe your idea in a sentence — I will map it instantly.',
  interest: 'Are you exploring as a founder, enterprise, or investor?',
  message: 'Anything else I should know before I brief the team?',
}

const INTERESTS = ['Founder', 'Enterprise', 'Investor', 'Partner']

export function Contact() {
  const [focused, setFocused] = useState<FieldKey | 'idle'>('idle')
  const [interest, setInterest] = useState('Founder')
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title={<>Open a channel to the future</>}
          description="Step into the MarsMate terminal. Our AI assistant will guide you and route your request to the right team."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* AI assistant */}
          <div className="rounded-3xl glass p-7">
            <div className="flex items-center gap-3">
              <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-flame to-magenta text-primary-foreground">
                <Bot className="size-6" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-accent" />
              </span>
              <div>
                <div className="font-heading font-semibold">MATE</div>
                <div className="text-xs text-accent">AI Concierge · Online</div>
              </div>
            </div>

            <div className="mt-6 min-h-28 rounded-2xl bg-background/60 p-4 font-mono text-sm">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Terminal className="size-3.5" />
                marsmate://assistant
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={focused}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 leading-relaxed text-foreground/90"
                >
                  {TIPS[focused]}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-accent"
                  />
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>· Avg. response time under 6 hours</p>
              <p>· NDA-ready conversations</p>
              <p>· Direct line to founders & strategists</p>
            </div>
          </div>

          {/* terminal form */}
          <div className="relative rounded-3xl glass-strong p-7">
            <div className="pointer-events-none absolute inset-0 grid-fade rounded-3xl opacity-40" />
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary glow-flame">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-semibold">
                    Transmission received
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                    MATE has logged your request and briefed our team. Expect a
                    response in your inbox shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full glass px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative grid gap-4 sm:grid-cols-2"
                >
                  <Field
                    label="Name"
                    name="name"
                    placeholder="Ada Lovelace"
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('idle')}
                  />
                  <Field
                    label="Company"
                    name="company"
                    placeholder="Analytical Engines Inc."
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused('idle')}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('idle')}
                  />
                  <Field
                    label="Project"
                    name="project"
                    placeholder="AI underwriting platform"
                    onFocus={() => setFocused('project')}
                    onBlur={() => setFocused('idle')}
                  />

                  <div className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Investment interest
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setInterest(opt)
                            setFocused('interest')
                          }}
                          className={`rounded-full px-4 py-2 text-sm transition-all ${
                            interest === opt
                              ? 'bg-primary text-primary-foreground'
                              : 'glass text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('idle')}
                      placeholder="Tell us what you are building…"
                      className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] glow-flame"
                  >
                    Transmit to MarsMate
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  onFocus,
  onBlur,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  onFocus: () => void
  onBlur: () => void
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
      />
    </div>
  )
}
