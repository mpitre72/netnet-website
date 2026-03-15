import { useScrollAnimation } from '../hooks/useScrollAnimation'
import logoReverse from '../assets/logo/logo-reverse.svg?raw'

function Hero() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    gsap.from(el.querySelector('.hero-logo'), {
      opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out',
    })
    gsap.from(el.querySelectorAll('.hero-stagger'), {
      opacity: 0, y: 30, stagger: 0.15, duration: 0.8, delay: 0.6, ease: 'power3.out',
    })
    gsap.to(el.querySelector('.hero-content'), {
      y: -80, opacity: 0.3, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 },
    })
  })

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center bg-deep-violet overflow-hidden px-6">
      <div className="hero-content relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
        <div className="hero-logo w-48 md:w-56 mb-12" dangerouslySetInnerHTML={{ __html: logoReverse }} />
        <h1 className="hero-stagger text-cream font-bold text-3xl md:text-5xl lg:text-[3.5rem] leading-tight tracking-tight mb-6">
          Your agency has a pulse.<br />
          <span className="text-netnet-purple">Do you know what it&rsquo;s saying?</span>
        </h1>
        <p className="hero-stagger text-cream/70 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          Net Net gives small service firms real-time visibility into where their hours are going and whether their jobs are on track — before things go sideways.
        </p>
        <a href="#waitlist" className="hero-stagger inline-flex items-center gap-2 bg-netnet-purple hover:bg-netnet-purple/90 text-white font-semibold text-base px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
          Join the Waitlist &rarr; July 1, 2026
        </a>
      </div>
    </section>
  )
}

export default Hero
