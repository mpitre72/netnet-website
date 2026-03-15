import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function PreRegistration() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useScrollAnimation((el, gsap) => {
    gsap.fromTo(el.querySelector('.cta-inner'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 40%', scrub: 1 },
      }
    )
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Waitlist signup:', { name, email })
    setSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="waitlist" className="relative bg-deep-violet py-28 md:py-40 px-6 overflow-hidden">
      {/* Heavy film grain for this section */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <filter id="grain-cta">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-cta)" />
        </svg>
      </div>

      <div className="cta-inner relative z-10 max-w-lg mx-auto text-center">
        <h2 className="text-cream text-[10vw] md:text-[8vw] lg:text-[6vw] font-extrabold leading-none mb-4">
          Be first.
        </h2>
        <p className="text-cream/70 text-lg md:text-xl mb-10">
          Net Net launches July 1, 2026.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-lg bg-white/[0.06] border border-white/[0.1] text-cream placeholder-cream/30 focus:outline-none focus:border-netnet-purple focus:ring-1 focus:ring-netnet-purple transition-colors"
            />
            <input
              type="email"
              placeholder="your@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-lg bg-white/[0.06] border border-white/[0.1] text-cream placeholder-cream/30 focus:outline-none focus:border-netnet-purple focus:ring-1 focus:ring-netnet-purple transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-netnet-purple hover:bg-netnet-purple/90 text-white font-semibold text-base px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Join the Waitlist
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green/20 mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M7 14L12 19L21 9" stroke="#5FCEA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-cream text-xl font-bold mb-1">You&rsquo;re on the list.</p>
            <p className="text-cream/50 text-sm">We&rsquo;ll be in touch before launch.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PreRegistration
