import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// SVG path data for "The Corner Office" line art
const PATHS = {
  // 1. Window frame — tall rectangle with light rays
  windowFrame: 'M 220 40 L 220 280 L 380 280 L 380 40 Z',
  windowSill: 'M 210 280 L 390 280',
  lightRay1: 'M 270 40 L 250 160',
  lightRay2: 'M 300 40 L 290 180',
  lightRay3: 'M 330 40 L 320 170',
  lightRay4: 'M 350 40 L 360 150',
  lightRay5: 'M 260 40 L 230 130',

  // 2. Desk — clean horizontal surface with angled legs
  deskTop: 'M 150 340 L 450 340',
  deskFrontEdge: 'M 155 340 L 155 348 L 445 348 L 445 340',
  deskLegLeft: 'M 175 348 L 160 430',
  deskLegRight: 'M 425 348 L 440 430',
  deskLegCrossLeft: 'M 160 430 L 200 430',
  deskLegCrossRight: 'M 400 430 L 440 430',

  // 3. Chair — curved back, seat, four legs
  chairBack: 'M 260 370 Q 300 355 340 370',
  chairBackLeft: 'M 260 370 L 260 400',
  chairBackRight: 'M 340 370 L 340 400',
  chairSeat: 'M 255 400 L 345 400',
  chairLegFrontLeft: 'M 262 400 L 255 450',
  chairLegFrontRight: 'M 338 400 L 345 450',
  chairLegBackLeft: 'M 268 400 L 272 445',
  chairLegBackRight: 'M 332 400 L 328 445',

  // 4. Coffee cup on desk
  coffeeCup: 'M 380 325 A 10 10 0 1 1 400 325',
  coffeeCupBody: 'M 380 325 L 380 340 L 400 340 L 400 325',
  coffeeCupHandle: 'M 400 328 Q 410 332 400 337',

  // 5. Pen on desk
  pen: 'M 200 330 L 250 326',
  penTip: 'M 250 326 L 254 325',
}

// Group drawing order and timing
const DRAW_GROUPS = [
  {
    label: 'window',
    paths: ['windowFrame', 'windowSill', 'lightRay1', 'lightRay2', 'lightRay3', 'lightRay4', 'lightRay5'],
    startPct: 0,
    endPct: 0.3,
  },
  {
    label: 'desk',
    paths: ['deskTop', 'deskFrontEdge', 'deskLegLeft', 'deskLegRight', 'deskLegCrossLeft', 'deskLegCrossRight'],
    startPct: 0.2,
    endPct: 0.5,
  },
  {
    label: 'chair',
    paths: ['chairBack', 'chairBackLeft', 'chairBackRight', 'chairSeat', 'chairLegFrontLeft', 'chairLegFrontRight', 'chairLegBackLeft', 'chairLegBackRight'],
    startPct: 0.4,
    endPct: 0.7,
  },
  {
    label: 'coffee',
    paths: ['coffeeCup', 'coffeeCupBody', 'coffeeCupHandle'],
    startPct: 0.6,
    endPct: 0.8,
  },
  {
    label: 'pen',
    paths: ['pen', 'penTip'],
    startPct: 0.75,
    endPct: 0.9,
  },
]

function Chapter1() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return

    const ctx = gsap.context(() => {
      const el = sectionRef.current

      // Text animations — scrubbed to scroll
      gsap.fromTo(el.querySelector('.line-2'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: '15% top', end: '35% top', scrub: 1 }
        }
      )

      gsap.fromTo(el.querySelector('.line-3'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: '40% top', end: '55% top', scrub: 1 }
        }
      )

      // SVG draw-on-scroll for each group
      const allPathEls = svgRef.current.querySelectorAll('path')

      // Initialize all paths with hidden strokes
      allPathEls.forEach((pathEl) => {
        const length = pathEl.getTotalLength()
        gsap.set(pathEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
      })

      // Animate each group
      DRAW_GROUPS.forEach((group) => {
        group.paths.forEach((pathName) => {
          const pathEl = svgRef.current.querySelector(`[data-name="${pathName}"]`)
          if (!pathEl) return
          const length = pathEl.getTotalLength()

          gsap.to(pathEl, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: `${group.startPct * 100}% top`,
              end: `${group.endPct * 100}% top`,
              scrub: 1,
            },
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-6"
      style={{ minHeight: '300vh' }}
    >
      {/* Subtle warm gradient at top */}
      <div
        className="absolute top-0 left-0 w-full h-[60vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(212,168,67,0.03) 0%, transparent 70%)',
        }}
      />

      {/* SVG Line Art — behind text, centered */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <svg
          ref={svgRef}
          viewBox="0 0 600 480"
          className="w-[65vw] max-w-[700px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ mixBlendMode: 'screen' }}
        >
          {/* Render all paths */}
          {Object.entries(PATHS).map(([name, d]) => (
            <path
              key={name}
              data-name={name}
              d={d}
              stroke="var(--goldenrod)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </svg>
      </div>

      {/* Text overlay — positioned on top of sticky SVG */}
      <div className="absolute top-0 left-0 w-full" style={{ minHeight: '300vh' }}>
        {/* Line 1 — visible at top */}
        <div className="h-screen flex items-center justify-center px-6">
          <h1
            className="line-1 text-cream font-light text-center leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
          >
            You built something real.
          </h1>
        </div>

        {/* Line 2 — fades in on scroll */}
        <div className="h-[80vh] flex items-center justify-center px-6">
          <p
            className="line-2 text-cream/80 text-center leading-relaxed max-w-[700px] opacity-0"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
          >
            You know your craft. You know your clients. You hired people you trust. You sell custom work and deliver it through grit, instinct, and experience.
          </p>
        </div>

        {/* Line 3 — fades in on further scroll */}
        <div className="h-[80vh] flex items-center justify-center px-6">
          <p
            className="line-3 text-cream/80 text-center leading-relaxed max-w-[600px] opacity-0"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
          >
            For years, that was the whole system.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Chapter1
