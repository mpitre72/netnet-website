import { useScrollAnimation } from '../hooks/useScrollAnimation'

const testimonials = [
  {
    quote: 'We thought we knew what things took. Net Net showed us we were wrong on almost every deliverable type we sold. We repriced. We stopped guessing.',
    attribution: 'Agency founder, subscription design program',
  },
  {
    quote: 'Three jobs in, the pattern was impossible to ignore. Our estimates weren\'t informed by data. They were informed by hope. Net Net ended that.',
    attribution: 'Agency principal, 8-person creative firm',
  },
  {
    quote: 'The first time an owner sees individual hours tied to actual deliverables, something changes. Not just the data. The conversation.',
    attribution: 'Operations lead, technical consultancy',
  },
]

function SocialProof() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    gsap.from(el.querySelector('h2'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    gsap.from(el.querySelectorAll('.proof-card'), {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.proofs'), start: 'top 80%' },
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-sm text-burnt-sienna mb-6 tracking-wider uppercase">
          Why it exists
        </p>

        <h2 className="text-espresso text-3xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
          The first users didn't celebrate.{' '}
          <span className="font-serif italic text-netnet-purple">They were uncomfortable.</span>
        </h2>
        <p className="text-espresso/60 text-lg mb-16 max-w-2xl">
          That's the point. You can't fix what you can't see. Net Net shows you what's actually happening. What you do with that truth is yours to own.
        </p>

        <div className="proofs space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="proof-card bg-white rounded-2xl p-8 md:p-10 border-l-4 border-goldenrod"
            >
              <p className="font-serif italic text-espresso text-lg md:text-xl leading-relaxed mb-4">
                "{t.quote}"
              </p>
              <p className="font-mono text-xs text-espresso/40 uppercase tracking-wider">
                {t.attribution}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-mono text-sm text-goldenrod text-center">
          59% of agencies have fewer than 10 people. This is exactly who we built it for.
        </p>
      </div>
    </section>
  )
}

export default SocialProof
