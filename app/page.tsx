'use client'

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
import { MainScene } from '@/components/three/scene-manager'
import { useEffect, useState } from 'react'

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted && <MainScene />}
      <main className="relative z-20">
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
    </>
  )
}
