'use client'

import { useState } from 'react'
import { CVProvider } from '@/lib/cv-context'
import { HeroSection } from '@/components/hero-section'
import { CVBuilderPage } from '@/components/cv-builder-page'

export default function Home() {
  const [isBuilding, setIsBuilding] = useState(false)

  return (
    <CVProvider>
      {isBuilding ? (
        <CVBuilderPage onBack={() => setIsBuilding(false)} />
      ) : (
        <HeroSection onGetStarted={() => setIsBuilding(true)} />
      )}
    </CVProvider>
  )
}
