import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// SVG path data for "The Corner Office" line art
const PATHS = {
  // 1. Window frame — tall rectangle (~1:2.5 aspect) with light rays
  windowLeft: 'M 230 30 L 230 270',
  windowTop: 'M 230 30 L 370 30',
  windowRight: 'M 370 30 L 370 270',
  windowBottom: 'M 230 270 L 370 270',
  windowSill: 'M 220 270 L 380 270',
  lightRay1: 'M 265 30 L 245 150',
  lightRay2: 'M 285 30 L 275 170',
  lightRay3: 'M 310 30 L 305 165',
  lightRay4: 'M 335 30 L 340 155',
  lightRay5: 'M 355 30 L 365 140',

  // 2. Desk — clean horizontal surface with angled tapered legs
  deskSurface: 'M 140 330 L 460 330',
  deskEdgeFront: 'M 145 330 L 145 338 L 455 338 L 455 330',
  deskLegFL: 'M 170 338 L 155 425',
  deskLegFR: 'M 430 338 L 445 425',
  deskFootL: 'M 148 425 L 170 425',
  deskFootR: 'M 430 425 L 452 425',

  // 3. Chair — curved back, seat, four legs
  chairBack: 'M 262 365 Q 300 348 338 365',
  chairSpindleL: 'M 262 365 L 262 392',
  chairSpindleR: 'M 338 365 L 338 392',
  chairSeat: 'M 255 392 L 345 392',
  chairLeg1: 'M 260 392 L 252 440',
  chairLeg2: 'M 270 392 L 274 438',
  chairLeg3: 'M 330 392 L 326 438',
  chairLeg4: 'M 340 392 L 348 440',

  // 4. Coffee cup on desk (right side)
  cupBody: 'M 388 316 L 388 330 L 406 330 L 406 316',
  cupRim: 'M 386 316 L 408 316',
  cupHandle: 'M 406 319 Q 416 323 406 327',

  // 5. Pen (angled line) and notepad (small rectangle)
  pen: 'M 195 322 L 245 318',
  penTip: 'M 245 318 L 249 317',
  notepadTop: 'M 170 316 L 195 316',
  notepadRight: 'M 195 316 L 195 330',
  notepadBottom: 'M 195 330 L 170 330',
  notepadLeft: 'M 170 330 L 170 316',
  notepadLine1: 'M 174 320 L 191 320',
  notepadLine2: 'M 174 324 L 188 324',

  // 6. Plant in the bottom-right corner
  potTop: 'M 428 430 L 468 430',
  potLeft: 'M 428 430 L 434 462',
  potBottom: 'M 434 462 L 462 462',
  potRight: 'M 468 430 L 462 462',
  leaf1: 'M 448 430 Q 438 400 448 385',
  leaf2: 'M 448 430 Q 455 395 465 383',
  leaf3: 'M 448 430 Q 448 405 440 388',
  leaf4: 'M 448 430 Q 460 408 470 395',
}

// 6 groups, each takes ~1/6 of scroll distance
const DRAW_GROUPS = [
  {
    label: 'window',
    paths: ['windowLeft', 'windowTop', 'windowRight', 'windowBottom', 'windowSill',
            'lightRay1', 'lightRay2', 'lightRay3', 'lightRay4', 'lightRay5'],
    startPct: 0,
    endPct: 0.17,
  },
  {
    label: 'desk',
    paths: ['deskSurface', 'deskEdgeFront', 'deskLegFL', 'deskLegFR', 'deskFootL', 'deskFootR'],
    startPct: 0.17,
    endPct: 0.34,
  },
  {
    label: 'chair',
    paths: ['chairBack', 'chairSpindleL', 'chairSpindleR', 'chairSeat',
            'chairLeg1', 'chairLeg2', 'chairLeg3', 'chairLeg4'],
    startPct: 0.34,
    endPct: 0.51,
  },
  {
    label: 'coffee',
    paths: ['cupBody', 'cupRim', 'cupHandle'],
    startPct: 0.51,
    endPct: 0.65,
  },
  {
    label: 'pen-notepad',
    paths: ['pen', 'penTip', 'notepadTop', 'notepadRight', 'notepadBottom', 'notepadLeft',
            'notepadLine1', 'notepadLine2'],
    startPct: 0.65,
    endPct: 0.80,
  },
  {
    label: 'plant',
    paths: ['potTop', 'potLeft', 'potBottom', 'potRight',
            'leaf1', 'leaf2', 'leaf3', 'leaf4'],
    startPct: 0.80,
    endPct: 0.95,
  },
]

function Chapter1() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return

    const ctx = gsap.context(() => {
      const el = sectionRef.current
      const svg = svgRef.current

      // Text animations — scrubbed to scroll position
      gsap.fromTo(el.querySelector('.line-2'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: '15% top', end: '30% top', scrub: 1 }
        }
      )

      gsap.fromTo(el.querySelector('.line-3'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: '42% top', end: '55% top', scrub: 1 }
        }
      )

      // Initialize all SVG paths — fully hidden via dashoffset
      const allPaths = svg.querySelectorAll('path')
      allPaths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      // Animate each draw group — scrub: 1 ties to scroll
      DRAW_GROUPS.forEach((group) => {
        group.paths.forEach((name) => {
          const p = svg.querySelector(`[data-name="${name}"]`)
          if (!p) return
          gsap.to(p, {
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
      {/* Subtle warm gradient — hint of Goldenrod at 3% opacity, radial, top-center */}
      <div
        className="absolute top-0 left-0 w-full h-[60vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(212,168,67,0.03) 0%, transparent 70%)',
        }}
      />

      {/* SVG Line Art — sticky behind text, centered, 65vw */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <svg
          ref={svgRef}
          viewBox="0 0 600 480"
          className="w-[65vw] max-w-[750px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ mixBlendMode: 'screen' }}
        >
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

      {/* Text overlay — absolute positioned over the sticky SVG */}
      <div className="absolute top-0 left-0 w-full" style={{ minHeight: '300vh' }}>
        {/* Line 1 — visible immediately */}
        <div className="h-screen flex items-center justify-center px-6">
          <h1
            className="line-1 text-center leading-tight"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 300,
              color: 'var(--cream)',
            }}
          >
            You built something real.
          </h1>
        </div>

        {/* Line 2 — fades in on scroll */}
        <div className="h-[80vh] flex items-center justify-center px-6">
          <p
            className="line-2 text-center leading-relaxed max-w-[700px] opacity-0"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: 'rgba(245,234,219,0.8)',
            }}
          >
            You know your craft. You know your clients. You hired people you trust. You sell custom work and deliver it through grit, instinct, and experience.
          </p>
        </div>

        {/* Line 3 — fades in on further scroll */}
        <div className="h-[80vh] flex items-center justify-center px-6">
          <p
            className="line-3 text-center leading-relaxed max-w-[600px] opacity-0"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: 'rgba(245,234,219,0.8)',
            }}
          >
            For years, that was the whole system.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Chapter1
