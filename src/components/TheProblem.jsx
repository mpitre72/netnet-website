import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ToggleReveal from './ToggleReveal'

function TheProblem() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    // Background color transition: Deep Violet → Net Net Purple
    gsap.fromTo(el,
      { backgroundColor: '#1F194C' },
      { backgroundColor: '#6B5CE7', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 }
      }
    )

    // Diverging lines animation
    const topLines = el.querySelectorAll('.line-top')
    const bottomLines = el.querySelectorAll('.line-bottom')
    topLines.forEach((line, i) => {
      gsap.to(line, {
        y: -(i + 1) * 18, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })
    bottomLines.forEach((line, i) => {
      gsap.to(line, {
        y: (i + 1) * 18, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })

    // Oversized text scrolls horizontally LEFT as user scrolls DOWN
    gsap.to(el.querySelector('.scroll-text'), {
      x: '-40%', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  })

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden" style={{ backgroundColor: '#1F194C' }}>
      {/* Diverging SVG lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full absolute" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`top-${i}`} className="line-top" x1="0" y1={280 - i * 12} x2="1200" y2={280 - i * 12} stroke="rgba(245,234,219,0.06)" strokeWidth="1" />
          ))}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`bottom-${i}`} className="line-bottom" x1="0" y1={320 + i * 12} x2="1200" y2={320 + i * 12} stroke="rgba(245,234,219,0.06)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      {/* Oversized scrolling text */}
      <div className="scroll-text absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none" style={{ transform: 'translateX(10%)' }}>
        <span className="text-[12vw] font-extrabold text-cream/[0.07] leading-none tracking-tight">
          YOU&rsquo;RE RUNNING THE WORK. YOU&rsquo;RE NOT WATCHING IT.
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-cream text-2xl md:text-4xl font-bold leading-tight mb-2">
          You&rsquo;re running the work. You&rsquo;re not watching it.
        </h2>
        <ToggleReveal>
          <p className="text-cream/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Hours get logged late, or not at all. Estimates were guesses dressed up as plans. Jobs drift off schedule and nobody catches it until the client notices or you invoice short.
          </p>
        </ToggleReveal>
      </div>
    </section>
  )
}

export default TheProblem
