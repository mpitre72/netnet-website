import { useScrollAnimation } from '../hooks/useScrollAnimation'

function FlowMeter() {
  const sectionRef = useScrollAnimation((el, gsap) => {
    // Headline fade in
    gsap.from(el.querySelector('.fm-headline'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' },
    })

    // Flow Meter needle scrub animation
    gsap.fromTo(
      el.querySelector('.needle'),
      { left: '8%' },
      {
        left: '85%',
        ease: 'none',
        scrollTrigger: {
          trigger: el.querySelector('.meter-container'),
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    )

    // Status text appears after needle moves
    gsap.from(el.querySelector('.status-text'), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.querySelector('.meter-container'),
        start: 'center 50%',
      },
    })

    // Metric cards stagger in
    gsap.from(el.querySelectorAll('.metric-card'), {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.querySelector('.metrics'),
        start: 'top 85%',
      },
    })

    // App screens stagger in
    gsap.from(el.querySelectorAll('.app-screen'), {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.querySelector('.screens'),
        start: 'top 85%',
      },
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative bg-deep-violet py-24 md:py-40 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-sm text-goldenrod mb-6 tracking-wider uppercase">
          The product
        </p>

        <h2 className="fm-headline text-cream text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          <span className="font-serif italic text-netnet-purple">"Can I take this day off?"</span>
          <br />
          Yeah, you could.
        </h2>

        <p className="text-cream/60 text-lg mb-16 max-w-2xl">
          Performance is not a report you run at the end of the month. It is a pulse you check in the flow of work. Drift signals. Effort variance. Team health. Calm, early, and actionable.
        </p>

        {/* Flow Meter */}
        <div className="meter-container mb-12">
          {/* Labels */}
          <div className="flex justify-between mb-3 px-2">
            <span className="font-mono text-xs text-burnt-sienna uppercase tracking-wider">Drifting</span>
            <span className="font-mono text-xs text-goldenrod uppercase tracking-wider">Watchlist</span>
            <span className="font-mono text-xs text-green uppercase tracking-wider">In Flow</span>
          </div>

          {/* Meter bar */}
          <div className="relative h-4 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="flex-1 bg-burnt-sienna rounded-l-full" />
              <div className="flex-1 bg-goldenrod" />
              <div className="flex-1 bg-green rounded-r-full" />
            </div>

            {/* Needle */}
            <div className="needle absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: '8%' }}>
              <div className="w-6 h-6 rounded-full bg-white shadow-lg shadow-white/30 border-2 border-deep-violet" />
            </div>
          </div>

          {/* Status text */}
          <div className="status-text mt-6 text-center">
            <p className="text-cream text-lg">You're in a steady flow right now.</p>
            <p className="text-cream/50 text-sm mt-1 font-mono">Driven by: jobs in drift.</p>
          </div>
        </div>

        {/* Metric cards */}
        <div className="metrics grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          <div className="metric-card bg-white/[0.05] border border-white/[0.08] rounded-xl p-6 text-center">
            <p className="font-mono text-xs text-green uppercase tracking-wider mb-2">Momentum</p>
            <p className="text-3xl font-bold text-cream">100%</p>
            <p className="text-cream/50 text-sm mt-1">On Pace</p>
          </div>
          <div className="metric-card bg-white/[0.05] border border-white/[0.08] rounded-xl p-6 text-center">
            <p className="font-mono text-xs text-goldenrod uppercase tracking-wider mb-2">Jobs in Drift</p>
            <p className="text-3xl font-bold text-cream">1</p>
            <p className="text-cream/50 text-sm mt-1">Need a touch</p>
          </div>
          <div className="metric-card bg-white/[0.05] border border-white/[0.08] rounded-xl p-6 text-center">
            <p className="font-mono text-xs text-teal uppercase tracking-wider mb-2">Capacity Outlook</p>
            <p className="text-3xl font-bold text-cream">28%</p>
            <p className="text-cream/50 text-sm mt-1">Used</p>
          </div>
        </div>

        {/* App Screens */}
        <div className="screens grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Performance / Pulse */}
          <div className="app-screen">
            <div className="rounded-xl overflow-hidden border border-white/[0.1] bg-[#13112E]">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.05] border-b border-white/[0.08]">
                <div className="w-2.5 h-2.5 rounded-full bg-burnt-sienna/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-goldenrod/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green/60" />
                <span className="ml-2 font-mono text-[10px] text-cream/40">Performance / Pulse</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="h-2 rounded-full bg-gradient-to-r from-burnt-sienna via-goldenrod to-green" />
                <div className="flex justify-between text-[10px] font-mono text-cream/30">
                  <span>Drifting</span><span>In Flow</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-3/4 rounded bg-white/[0.06]" />
                  <div className="h-2 w-1/2 rounded bg-white/[0.06]" />
                  <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
                </div>
                <p className="text-cream/30 text-[10px] font-mono mt-3 italic">"Can I take this day off?"</p>
              </div>
            </div>
          </div>

          {/* Job Tasks */}
          <div className="app-screen">
            <div className="rounded-xl overflow-hidden border border-white/[0.1] bg-[#13112E]">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.05] border-b border-white/[0.08]">
                <div className="w-2.5 h-2.5 rounded-full bg-burnt-sienna/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-goldenrod/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green/60" />
                <span className="ml-2 font-mono text-[10px] text-cream/40">Job Tasks</span>
              </div>
              <div className="p-5 space-y-3">
                {['Homepage Design', 'Content Strategy', 'Dev Sprint 1'].map((task, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-cream/60 text-xs">{task}</p>
                      <div className="mt-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${i === 2 ? 'bg-burnt-sienna' : 'bg-green'}`}
                          style={{ width: `${[65, 80, 110][i]}%` }}
                        />
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] ${i === 2 ? 'text-burnt-sienna' : 'text-green'}`}>
                      {['Active', 'Review', 'Over'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Capacity Outlook */}
          <div className="app-screen">
            <div className="rounded-xl overflow-hidden border border-white/[0.1] bg-[#13112E]">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.05] border-b border-white/[0.08]">
                <div className="w-2.5 h-2.5 rounded-full bg-burnt-sienna/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-goldenrod/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green/60" />
                <span className="ml-2 font-mono text-[10px] text-cream/40">Capacity Outlook</span>
              </div>
              <div className="p-5 space-y-3">
                {['Design', 'Development', 'PM'].map((dept, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-cream/60">{dept}</span>
                      <span className="font-mono text-cream/40">{[42, 28, 65][i]}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${[65, 28, 42][i] > 60 ? 'bg-goldenrod' : 'bg-teal'}`}
                        style={{ width: `${[42, 28, 65][i]}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-white/[0.08]">
                  <p className="font-mono text-[10px] text-cream/40">Team available: 58h this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlowMeter
