import { useScrollAnimation } from '../hooks/useScrollAnimation'

const quotes = [
  "We thought we knew what things took. Net Net showed us we were wrong on almost every deliverable type we sold. We repriced. We stopped guessing.",
  "Our estimates weren't informed by data. They were informed by hope. Net Net ended that.",
  "The first time an owner sees individual hours tied to actual deliverables, something changes. Not just the data — the conversation.",
]

function SocialProof() {
  const sectionRef = useScrollAnimation((el, gsap, ScrollTrigger) => {
    const slides = el.querySelectorAll('.proof-slide')

    // Pin the section, cycle through quotes
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: `+=${window.innerHeight * (quotes.length + 0.5)}`,
        scrub: 1,
        pin: el.querySelector('.proof-pin'),
        pinSpacing: true,
      },
    })

    slides.forEach((slide, i) => {
      if (i === 0) {
        tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      }
      if (i > 0) {
        tl.fromTo(slides[i - 1], { opacity: 1 }, { opacity: 0, duration: 0.3 }, `>${0.5}`)
        tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '<0.1')
      }
      if (i === slides.length - 1) {
        tl.to(slide, { opacity: 1, duration: 0.5 })
        tl.to(slide, { opacity: 0, duration: 0.3 })
      }
    })
  })

  return (
    <section ref={sectionRef} className="relative bg-cream overflow-hidden light-section">
      <div className="proof-pin min-h-screen flex items-center justify-center px-6">
        <div className="relative max-w-3xl mx-auto text-center" style={{ minHeight: '200px' }}>
          {quotes.map((quote, i) => (
            <div
              key={i}
              className="proof-slide absolute inset-0 flex items-center justify-center opacity-0"
            >
              <p className="text-deep-violet text-xl md:text-3xl lg:text-4xl font-bold leading-snug">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof
