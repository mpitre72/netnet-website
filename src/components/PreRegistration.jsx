import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function PreRegistration() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useScrollAnimation((el, gsap) => {
    // Environmental text
    gsap.to(el.querySelector('.env-text'), {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Dramatic slow fade
    gsap.from(el.querySelector('.cta-content'), {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 70%' },
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative bg-deep-violet py-24 md:py-40 px-6 overflow-hidden"
    >
      {/* Environmental text - TRUTH returns */}
      <div className="env-text absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[30vw] font-serif font-bold italic text-netnet-purple/[0.08] leading-none">
          TRUTH
        </span>
      </div>

      <div className="cta-content relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-cream text-5xl md:text-7xl font-bold leading-none mb-6">
          Be first.
        </h2>
        <p className="text-cream/70 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          Net Net launches July 1, 2026. Join the waitlist and get early access.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-white/[0.06] border border-white/[0.1] text-cream placeholder-cream/30 focus:outline-none focus:border-netnet-purple focus:ring-1 focus:ring-netnet-purple transition-colors"
            />
            <input
              type="email"
              placeholder="your@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-white/[0.06] border border-white/[0.1] text-cream placeholder-cream/30 focus:outline-none focus:border-netnet-purple focus:ring-1 focus:ring-netnet-purple transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-netnet-purple hover:bg-netnet-purple/90 text-white font-medium text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              See It In Action
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-netnet-purple/20 mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16L14 22L24 10" stroke="#6B5CE7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-cream text-xl font-bold mb-2">You're on the list.</p>
            <p className="text-cream/50">We'll reach out before launch with early access details.</p>
          </div>
        )}

        <p className="mt-8 font-mono text-xs text-cream/30">
          Early access. No pitch deck. Just the product.
        </p>
      </div>
    </section>
  )
}

export default PreRegistration
