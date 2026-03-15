import { useScrollAnimation } from '../hooks/useScrollAnimation'

const traits = [
  'Creative agencies, dev shops, consultancies, marketing firms.',
  'Under 10 people. Maybe a few contractors.',
  'Billing by the job, the sprint, or the retainer.',
  'The owner is selling, managing, and delivering.',
  'No one has time for tools that create more work.',
]

function ForWho() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    // Environmental text parallax
    gsap.to(el.querySelector('.env-text'), {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.from(el.querySelector('h2'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    gsap.from(el.querySelectorAll('.trait'), {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.traits'), start: 'top 80%' },
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative bg-deep-violet py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Environmental text */}
      <div className="env-text absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[30vw] font-serif font-bold italic text-teal/[0.05] leading-none">
          CLARITY
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="font-mono text-sm text-goldenrod mb-6 tracking-wider uppercase">
          Who it's for
        </p>

        <h2 className="text-cream text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Built for small creative and technical service firms.
        </h2>
        <p className="text-cream/60 text-lg mb-16 max-w-2xl">
          Under 10 people. Billing by the job. Running on instinct and good intentions. Until now.
        </p>

        <div className="traits space-y-4 max-w-2xl">
          {traits.map((trait, i) => (
            <div key={i} className="trait flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-netnet-purple shrink-0" />
              <p className="text-cream/80 text-lg">{trait}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] max-w-2xl">
          <p className="text-cream/90 text-lg leading-relaxed">
            If you've ever said{' '}
            <span className="font-serif italic text-netnet-purple">"I thought we were fine on that job"</span>
            {' '}and then discovered you weren't, Net Net was built for you.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ForWho
