import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ToggleReveal from './ToggleReveal'

function EstimationTruth() {
  const numberRef = useRef(null)

  const sectionRef = useScrollAnimation((el, gsap) => {
    // Number morph: 10 → 40 tied to scroll
    const numEl = numberRef.current
    gsap.to({}, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const val = Math.round(10 + self.progress * 30)
          if (numEl) numEl.textContent = val + ' hrs'
        },
      },
    })

    // Headline fade driven by scroll
    gsap.fromTo(el.querySelector('.est-headline'), { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, ease: 'none',
      scrollTrigger: { trigger: el, start: '30% bottom', end: '50% center', scrub: 1 },
    })
  })

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden bg-netnet-purple">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Giant number display */}
        <div ref={numberRef} className="text-[20vw] md:text-[16vw] font-extrabold text-cream leading-none tracking-tighter mb-8">
          10 hrs
        </div>

        <h2 className="est-headline text-cream text-xl md:text-3xl font-bold leading-tight mb-2 max-w-3xl mx-auto">
          The estimate said 10 hours. The job took 40. Nobody caught it in time.
        </h2>

        <ToggleReveal>
          <p className="text-cream/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Most agencies don&rsquo;t have bad people. They have no system for seeing scope creep as it happens. By the time the numbers show up, the damage is done.
          </p>
        </ToggleReveal>
      </div>

      {/* Scalloped / wavy SVG divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z" fill="#1F194C" />
        </svg>
      </div>
    </section>
  )
}

export default EstimationTruth
