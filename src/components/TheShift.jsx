import { useScrollAnimation } from '../hooks/useScrollAnimation'

const words = ['Net Net', 'shows you', "what's actually happening.", 'Right now.']

function TheShift() {
  const sectionRef = useScrollAnimation((el, gsap, ScrollTrigger) => {
    const wordEls = el.querySelectorAll('.reveal-word')
    const pinWrap = el.querySelector('.pin-wrap')

    // Pin the section
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${window.innerHeight * 2}`,
      pin: pinWrap,
      pinSpacing: true,
    })

    // Each word scales in one at a time, scrubbed
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: `+=${window.innerHeight * 2}`,
        scrub: 1,
      },
    })

    wordEls.forEach((word, i) => {
      tl.fromTo(word,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
        i * 0.8
      )
    })
  })

  return (
    <section ref={sectionRef} className="relative bg-deep-violet overflow-hidden">
      <div className="pin-wrap min-h-screen flex flex-col items-center justify-center px-6">
        {/* Pinned word reveals */}
        <div className="text-center mb-16">
          {words.map((word, i) => (
            <span key={i} className="reveal-word inline-block text-cream text-3xl md:text-5xl lg:text-6xl font-bold mx-2 opacity-0">
              {word}
            </span>
          ))}
        </div>

        {/* Always-visible product promise */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="text-cream text-xl md:text-2xl lg:text-3xl font-semibold leading-snug">
            Where your team&rsquo;s hours are actually going.
          </p>
          <p className="text-cream text-xl md:text-2xl lg:text-3xl font-semibold leading-snug">
            Whether your jobs are on track or drifting.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TheShift
