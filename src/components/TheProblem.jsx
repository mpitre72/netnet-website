import { useScrollAnimation } from '../hooks/useScrollAnimation'

function TheProblem() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    // DRIFT environmental text materializes
    gsap.fromTo(
      el.querySelector('.env-text'),
      { opacity: 0, scale: 0.95 },
      {
        opacity: 0.06,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      }
    )

    // Parallax on environmental text
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

    // Headline fade in
    gsap.from(el.querySelector('h2'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    // Subhead fade in
    gsap.from(el.querySelector('.subhead'), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    // Pain points stagger in
    gsap.from(el.querySelectorAll('.pain-point'), {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.pain-points'), start: 'top 80%' },
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative bg-deep-violet py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Environmental background text */}
      <div className="env-text absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-0">
        <span className="text-[30vw] font-serif font-bold italic text-burnt-sienna leading-none tracking-tight">
          DRIFT
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section label */}
        <p className="font-mono text-sm text-burnt-sienna mb-6 tracking-wider uppercase">
          The reality
        </p>

        <h2 className="text-cream text-3xl md:text-5xl font-bold leading-tight mb-4">
          Jobs drift. You find out when it's already too late.
        </h2>
        <p className="subhead text-cream/60 text-lg md:text-xl mb-16 max-w-2xl">
          Hours go untracked. Timelines slip. The owner is always the last to know.
        </p>

        <div className="pain-points space-y-8 max-w-3xl">
          <div className="pain-point border-l-2 border-burnt-sienna pl-6">
            <p className="text-cream/90 text-lg leading-relaxed">
              <span className="font-serif italic text-netnet-purple text-xl">"Scope creep."</span>{' '}
              It doesn't announce itself. It shows up in hours you can't account for and jobs that were "fine" until they weren't.
            </p>
          </div>

          <div className="pain-point border-l-2 border-burnt-sienna pl-6">
            <p className="text-cream/90 text-lg leading-relaxed">
              <span className="font-serif italic text-netnet-purple text-xl">"The team's busy."</span>{' '}
              But are they productive or just occupied? There's a difference you've never been able to see.
            </p>
          </div>

          <div className="pain-point border-l-2 border-burnt-sienna pl-6">
            <p className="text-cream/90 text-lg leading-relaxed">
              <span className="font-serif italic text-netnet-purple text-xl">"Jobs drift."</span>{' '}
              You find out when it's already too late. The timeline slipped. The hours followed. Nobody told you.
            </p>
          </div>

          <div className="pain-point border-l-2 border-burnt-sienna pl-6">
            <p className="text-cream/90 text-lg leading-relaxed">
              <span className="font-serif italic text-netnet-purple text-xl">"You're the glue."</span>{' '}
              Chasing updates. Translating asks. Cleaning up. What would you do with that time back?
            </p>
          </div>
        </div>

        <p className="mt-12 text-cream/40 font-mono text-sm max-w-xl">
          Most agency principals say they are the only person with a complete picture of their team's current workload. Net Net changes that.
        </p>
      </div>
    </section>
  )
}

export default TheProblem
