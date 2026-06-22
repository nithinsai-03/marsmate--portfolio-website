const COLUMNS = [
  {
    title: 'Platform',
    links: ['Intelligence Engine', 'Validation', 'Market Analysis', 'Investor Matching'],
  },
  {
    title: 'Company',
    links: ['About', 'Vision', 'Careers', 'Press'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Case Studies', 'Security', 'Contact'],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-8 items-center justify-center rounded-lg bg-primary glow-flame">
                <span className="size-2.5 rounded-full bg-primary-foreground" />
              </span>
              <span className="font-heading text-lg font-semibold tracking-tight">
                Mars<span className="text-gradient-flame">Mate</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The operating system for human innovation. Turning ideas into
              validated, fundable, scalable businesses.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MarsMate Business Intelligence Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
