import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { IntelligenceFlow } from '@/components/sections/intelligence-flow'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Products } from '@/components/sections/products'
import { Projects } from '@/components/sections/projects'
import { Team } from '@/components/sections/team'
import { Investors } from '@/components/sections/investors'
import { WhyMarsMate } from '@/components/sections/why-marsmate'
import { Vision } from '@/components/sections/vision'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <SiteNav />
      <Hero />
      <IntelligenceFlow />
      <About />
      <Services />
      <Products />
      <Projects />
      <Team />
      <Investors />
      <WhyMarsMate />
      <Vision />
      <Contact />
      <Footer />
    </main>
  )
}
