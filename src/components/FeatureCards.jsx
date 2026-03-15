import { useScrollAnimation } from '../hooks/useScrollAnimation'

const features = [
  {
    title: 'Hours Visibility',
    description: 'See exactly where your team\'s time is going. Not reconstructed on Friday afternoon. Captured in the flow of work, tied to actual deliverables.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 8V14L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    envText: 'HOURS',
  },
  {
    title: 'Timeline Tracking',
    description: 'Know which jobs are drifting before they\'re late. Drift is detected early enough to do something about it.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 14L16 18L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8H24V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    envText: 'TIMELINE',
  },
  {
    title: 'Capacity Outlook',
    description: 'Understand what your team can actually take on. Before you overcommit. Before you undersell. Visible across every service type.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="10" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="12" y="6" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="20" y="14" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    envText: 'CAPACITY',
  },
  {
    title: 'My Performance',
    description: 'Every person sees their own truth. No surprises. Individual hours tied to actual deliverables. The conversation changes when the data speaks first.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 24C6 19.5817 9.58172 16 14 16C18.4183 16 22 19.5817 22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    envText: 'TRUTH',
  },
]

function FeatureCards() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    // Section heading
    gsap.from(el.querySelector('h2'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    // Cards stagger in with upward translate
    gsap.from(el.querySelectorAll('.feature-card'), {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.cards-grid'), start: 'top 85%' },
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative bg-parchment py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-sm text-teal mb-6 tracking-wider uppercase">
          Core capabilities
        </p>

        <h2 className="text-espresso text-3xl md:text-5xl font-bold leading-tight mb-16 max-w-3xl">
          Four ways to see{' '}
          <span className="font-serif italic text-netnet-purple">what's actually true.</span>
        </h2>

        <div className="cards-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card group relative bg-white rounded-2xl p-8 border border-espresso/[0.06] hover:shadow-lg hover:shadow-netnet-purple/[0.06] transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Environmental text */}
              <span className="absolute top-4 right-4 text-[6rem] font-serif font-bold italic text-netnet-purple/[0.04] leading-none select-none pointer-events-none">
                {feature.envText}
              </span>

              <div className="relative z-10">
                <div className="text-netnet-purple mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-espresso text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-espresso/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCards
