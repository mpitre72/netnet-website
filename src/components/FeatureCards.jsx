import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ToggleReveal from './ToggleReveal'

const features = [
  {
    headline: "See exactly where your team's time is going.",
    label: 'Hours Visibility',
    toggle: "Net Net shows you where every hour went — by person, by job, by deliverable. No more guessing. No more surprises at invoice time.",
    screen: 'https://mpitre72.github.io/netnetv2-mockups/#/app/me/tasks',
  },
  {
    headline: "Know which jobs are drifting before they're late.",
    label: 'Timeline Tracking',
    toggle: "Every job has a health signal. Green means on track. Red means you need to act. You see it in real time, not in a retrospective.",
    screen: 'https://mpitre72.github.io/netnetv2-mockups/#/app/jobs',
  },
  {
    headline: 'Understand what your team can actually take on.',
    label: 'Capacity Outlook',
    toggle: "Before you say yes to the next job, Net Net shows you whether your team has the capacity to deliver it on time.",
    screen: 'https://mpitre72.github.io/netnetv2-mockups/#/app/performance',
  },
  {
    headline: 'Every person sees their own truth. No surprises.',
    label: 'My Performance',
    toggle: "Each team member has their own performance view. They know how they're tracking before you do. The conversation starts from data, not from a feeling.",
    screen: 'https://mpitre72.github.io/netnetv2-mockups/#/app/me/tasks',
  },
]

function FeatureCards() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    const cards = el.querySelectorAll('.feat-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      )
    })
  })

  return (
    <section ref={sectionRef} className="relative bg-deep-violet py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-20 md:space-y-28">
        {features.map((feat, i) => (
          <div key={i} className="feat-card grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text side */}
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <p className="text-goldenrod text-xs font-bold uppercase tracking-widest mb-3">{feat.label}</p>
              <h3 className="text-cream text-2xl md:text-3xl font-bold leading-tight mb-1">
                {feat.headline}
              </h3>
              <ToggleReveal>
                <p className="text-cream/60 text-base leading-relaxed">{feat.toggle}</p>
              </ToggleReveal>
            </div>

            {/* App screen */}
            <div className={i % 2 === 1 ? 'md:order-1' : ''}>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#13112E]">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
                  <div className="w-2 h-2 rounded-full bg-burnt-sienna/50" />
                  <div className="w-2 h-2 rounded-full bg-goldenrod/50" />
                  <div className="w-2 h-2 rounded-full bg-green/50" />
                  <span className="ml-2 text-[10px] text-cream/30 font-medium">{feat.label}</span>
                </div>
                <div className="aspect-video bg-[#0d0b22]">
                  <iframe
                    src={feat.screen}
                    className="w-full h-full border-0 pointer-events-none"
                    title={feat.label}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeatureCards
