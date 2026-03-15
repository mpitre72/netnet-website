import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ToggleReveal from './ToggleReveal'

const screens = [
  { label: 'Job Tasks', url: 'https://mpitre72.github.io/netnetv2-mockups/#/app/jobs' },
  { label: 'Job Performance', url: 'https://mpitre72.github.io/netnetv2-mockups/#/app/performance' },
  { label: 'Performance / Pulse', url: 'https://mpitre72.github.io/netnetv2-mockups/#/app/me/tasks' },
]

function FlowMeter() {
  const needleRef = useRef(null)
  const answerRef = useRef(null)

  const sectionRef = useScrollAnimation((el, gsap, ScrollTrigger) => {
    const pinWrap = el.querySelector('.fm-pin')

    // Pin section for long scroll
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${window.innerHeight * 3}`,
      pin: pinWrap,
      pinSpacing: true,
    })

    // Needle scrubs from Drifting to In Flow
    gsap.fromTo(needleRef.current,
      { left: '5%' },
      { left: '90%', ease: 'none',
        scrollTrigger: {
          trigger: el, start: 'top top', end: `+=${window.innerHeight * 3}`, scrub: 1,
        },
      }
    )

    // "Yeah, you could." fades in at end of scroll
    gsap.fromTo(answerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: {
          trigger: el, start: `+=${window.innerHeight * 2}`, end: `+=${window.innerHeight * 3}`, scrub: 1,
        },
      }
    )

    // Screen panels stagger in
    const panels = el.querySelectorAll('.screen-panel')
    panels.forEach((panel, i) => {
      gsap.fromTo(panel,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: `+=${window.innerHeight * (0.5 + i * 0.8)}`,
            end: `+=${window.innerHeight * (1 + i * 0.8)}`,
            scrub: 1,
          },
        }
      )
    })
  })

  return (
    <section ref={sectionRef} className="relative bg-deep-violet overflow-hidden">
      <div className="fm-pin min-h-screen flex flex-col justify-center px-6 py-16">
        <div className="max-w-5xl mx-auto w-full">
          {/* Headline */}
          <h2 className="text-cream text-3xl md:text-5xl font-bold text-center mb-2">
            Can I take this day off?
          </h2>
          <p ref={answerRef} className="text-green text-2xl md:text-4xl font-bold text-center mb-12 opacity-0">
            Yeah, you could.
          </p>

          {/* Flow Meter bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-xs font-semibold tracking-wider uppercase">
              <span className="text-burnt-sienna">Drifting</span>
              <span className="text-goldenrod">Watchlist</span>
              <span className="text-green">In Flow</span>
            </div>
            <div className="relative h-5 rounded-full overflow-visible">
              <div className="absolute inset-0 flex rounded-full overflow-hidden">
                <div className="flex-1 bg-burnt-sienna" />
                <div className="flex-1 bg-goldenrod" />
                <div className="flex-1 bg-green" />
              </div>
              {/* Needle */}
              <div
                ref={needleRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                style={{ left: '5%' }}
              >
                <div className="w-7 h-7 rounded-full bg-white shadow-lg shadow-white/20 border-[3px] border-deep-violet" />
              </div>
            </div>
          </div>

          {/* Toggle */}
          <div className="text-center">
            <ToggleReveal>
              <p className="text-cream/60 text-base leading-relaxed max-w-2xl mx-auto">
                The Flow Meter shows your agency&rsquo;s real-time operational health. Drifting means jobs are slipping. In Flow means you have control of your time and your delivery.
              </p>
            </ToggleReveal>
          </div>

          {/* App screen panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {screens.map((screen, i) => (
              <div key={i} className="screen-panel opacity-0">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#13112E]">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
                    <div className="w-2 h-2 rounded-full bg-burnt-sienna/50" />
                    <div className="w-2 h-2 rounded-full bg-goldenrod/50" />
                    <div className="w-2 h-2 rounded-full bg-green/50" />
                    <span className="ml-2 text-[10px] text-cream/30 font-medium">{screen.label}</span>
                  </div>
                  <div className="aspect-video bg-[#0d0b22] flex items-center justify-center">
                    <iframe
                      src={screen.url}
                      className="w-full h-full border-0 pointer-events-none"
                      title={screen.label}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlowMeter
