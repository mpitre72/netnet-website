import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ToggleReveal from './ToggleReveal'

function ForWho() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    gsap.fromTo(el.querySelector('.who-headline'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 40%', scrub: 1 },
      }
    )
  })

  return (
    <section ref={sectionRef} className="relative bg-deep-violet py-28 md:py-40 px-6 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="who-headline text-cream text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
          Built for small firms. Under 10 people. Billing by the job.
        </h2>
        <ToggleReveal>
          <p className="text-cream/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            You know your work is good. Net Net makes sure your operation matches it.
          </p>
        </ToggleReveal>
      </div>
    </section>
  )
}

export default ForWho
