import { useEffect, useState } from 'react'

import {
  AudienceSection,
  BenefitsSection,
  BookingSection,
  FaqSection,
  Hero,
  PainSection,
  ProofSection,
  ServicesSection,
} from './components/Sections'

import {
  ExitModal,
  FloatingActions,
  Footer,
  Header,
} from './components/Layout'

import AdminApp from './admin/AdminApp'

function LandingPage() {
  const [showExit, setShowExit] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBottomBar(window.scrollY > 550)

    const handleMouseLeave = (event: MouseEvent) => {
      const alreadyShown = sessionStorage.getItem('primitivos-exit')

      if (event.clientY <= 0 && window.innerWidth >= 900 && !alreadyShown) {
        setShowExit(true)
        sessionStorage.setItem('primitivos-exit', 'shown')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-primitivo text-hueso">
      <Header />
      <main>
        <Hero />
        <PainSection />
        <ServicesSection />
        <BenefitsSection />
        <ProofSection />
        <AudienceSection />
        <FaqSection />
        <BookingSection />
      </main>
      <Footer />
      <FloatingActions visible={showBottomBar} />
      {showExit && <ExitModal onClose={() => setShowExit(false)} />}
    </div>
  )
}

export default function App() {
  const path = window.location.pathname

  if (path.startsWith('/admin')) {
    return <AdminApp />
  }

  return <LandingPage />
}