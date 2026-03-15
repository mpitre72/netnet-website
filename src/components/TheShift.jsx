import { useScrollAnimation } from '../hooks/useScrollAnimation'

const painPoints = [
  'You estimate from instinct, not evidence.',
  'Scope drifts before anyone notices.',
  'Performance reviews happen once a quarter, too late to act.',
  'You manage by assumption because assumption is all you have.',
]

const resolutions = [
  'You estimate from what the last job actually took.',
  'Drift is detected in real time, early enough to act.',
  'Performance lives inside the work, visible every day.',
  'You manage by what is actually true.',
]

function TheShift() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    // Headline
    gsap.from(el.querySelector('h2'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    // Left column fades in first
    gsap.from(el.querySelectorAll('.without-item'), {
      opacity: 0,
      x: -30,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.comparison'), start: 'top 80%' },
    })

    // Right column slides in from the right
    gsap.from(el.querySelectorAll('.with-item'), {
      opacity: 0,
      x: 60,
      stagger: 0.12,
      duration: 0.7,
      delay: 0.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.comparison'), start: 'top 80%' },
    })

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
  })

  return (
    <section
      ref={sectionRef}
      className="relative bg-parchment py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Environmental text */}
      <div className="env-text absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[25vw] font-serif font-bold italic text-teal/[0.05] leading-none">
          CLARITY
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-sm text-teal mb-6 tracking-wider uppercase">
          The shift
        </p>

        <h2 className="text-espresso text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Net Net surfaces what's actually happening.{' '}
          <span className="font-serif italic text-netnet-purple">Before it becomes a crisis.</span>
        </h2>

        <p className="text-espresso/60 text-lg mb-16 max-w-2xl">
          Most tools add features. Net Net adds clarity. When you can see where work goes, why jobs drift, and what to do about it, you stop flying blind.
        </p>

        <div className="comparison grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Without Net Net */}
          <div>
            <h3 className="font-mono text-sm text-burnt-sienna mb-6 uppercase tracking-wider">
              Without Net Net
            </h3>
            <div className="space-y-4">
              {painPoints.map((point, i) => (
                <div
                  key={i}
                  className="without-item flex items-start gap-3 p-4 rounded-lg bg-burnt-sienna/[0.07]"
                >
                  <span className="text-burnt-sienna mt-0.5 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <p className="text-espresso/80">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With Net Net */}
          <div>
            <h3 className="font-mono text-sm text-green mb-6 uppercase tracking-wider">
              With Net Net
            </h3>
            <div className="space-y-4">
              {resolutions.map((point, i) => (
                <div
                  key={i}
                  className="with-item flex items-start gap-3 p-4 rounded-lg bg-green/[0.07]"
                >
                  <span className="text-green mt-0.5 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <p className="text-espresso/80">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheShift
