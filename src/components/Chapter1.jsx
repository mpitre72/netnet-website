import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// SVG path data for "The Corner Office" — scaled up significantly
// ViewBox: 800x650. Window ~300x400, Desk ~540 wide, Chair ~120 tall
const PATHS = {
  // 1. Window frame — tall rectangle (~300w x 400h) with light rays
  windowLeft: 'M 250 30 L 250 430',
  windowTop: 'M 250 30 L 550 30',
  windowRight: 'M 550 30 L 550 430',
  windowBottom: 'M 250 430 L 550 430',
  windowSill: 'M 235 430 L 565 430',
  lightRay1: 'M 320 30 L 290 250',
  lightRay2: 'M 370 30 L 350 280',
  lightRay3: 'M 400 30 L 400 270',
  lightRay4: 'M 440 30 L 455 260',
  lightRay5: 'M 490 30 L 520 240',

  // 2. Desk — ~540px wide, substantial horizontal surface with tapered legs
  deskSurface: 'M 130 470 L 670 470',
  deskEdgeFront: 'M 135 470 L 135 482 L 665 482 L 665 470',
  deskLegFL: 'M 170 482 L 148 580',
  deskLegFR: 'M 630 482 L 652 580',
  deskFootL: 'M 138 580 L 175 580',
  deskFootR: 'M 625 580 L 662 580',

  // 3. Chair — mid-century curved back, ~120px tall
  chairBack: 'M 330 510 Q 400 485 470 510',
  chairSpindleL: 'M 330 510 L 330 548',
  chairSpindleR: 'M 470 510 L 470 548',
  chairSeat: 'M 318 548 L 482 548',
  chairLeg1: 'M 326 548 L 312 625',
  chairLeg2: 'M 348 548 L 352 620',
  chairLeg3: 'M 452 548 L 448 620',
  chairLeg4: 'M 474 548 L 488 625',

  // 4. Coffee cup on desk (right side, ~30px diameter)
  cupBody: 'M 556 442 L 556 470 L 588 470 L 588 442',
  cupRim: 'M 552 442 L 592 442',
  cupHandle: 'M 588 448 Q 604 456 588 465',

  // 5. Notepad (~50x35) and pen (~60px long) on desk left
  notepadTop: 'M 192 438 L 244 438',
  notepadRight: 'M 244 438 L 244 474',
  notepadBottom: 'M 244 474 L 192 474',
  notepadLeft: 'M 192 474 L 192 438',
  notepadLine1: 'M 198 448 L 238 448',
  notepadLine2: 'M 198 456 L 232 456',
  notepadLine3: 'M 198 464 L 226 464',
  pen: 'M 256 452 L 318 444',
  penTip: 'M 318 444 L 324 442',

  // 6. Plant — trapezoid pot (~45px wide) with 4 curved leaf strokes (~80px tall)
  potTop: 'M 618 588 L 668 588',
  potLeft: 'M 618 588 L 627 632',
  potBottom: 'M 627 632 L 659 632',
  potRight: 'M 668 588 L 659 632',
  leaf1: 'M 643 588 Q 622 538 634 508',
  leaf2: 'M 643 588 Q 648 532 668 512',
  leaf3: 'M 643 588 Q 640 542 628 518',
  leaf4: 'M 643 588 Q 662 548 675 522',
}

// Structural elements get thicker strokes (2.5), details get thinner (1.5)
const STRUCTURAL_PATHS = new Set([
  'windowLeft', 'windowTop', 'windowRight', 'windowBottom', 'windowSill',
  'deskSurface', 'deskEdgeFront', 'deskLegFL', 'deskLegFR', 'deskFootL', 'deskFootR',
  'chairBack', 'chairSpindleL', 'chairSpindleR', 'chairSeat',
  'chairLeg1', 'chairLeg2', 'chairLeg3', 'chairLeg4',
])

// 6 draw groups — compressed to fit within scrollable range
// (pin spacers add extra height, so groups must end by ~75%)
const DRAW_GROUPS = [
  {
    label: 'window',
    paths: ['windowLeft', 'windowTop', 'windowRight', 'windowBottom', 'windowSill',
            'lightRay1', 'lightRay2', 'lightRay3', 'lightRay4', 'lightRay5'],
    startPct: 0,
    endPct: 0.13,
  },
  {
    label: 'desk',
    paths: ['deskSurface', 'deskEdgeFront', 'deskLegFL', 'deskLegFR', 'deskFootL', 'deskFootR'],
    startPct: 0.13,
    endPct: 0.26,
  },
  {
    label: 'chair',
    paths: ['chairBack', 'chairSpindleL', 'chairSpindleR', 'chairSeat',
            'chairLeg1', 'chairLeg2', 'chairLeg3', 'chairLeg4'],
    startPct: 0.26,
    endPct: 0.39,
  },
  {
    label: 'coffee',
    paths: ['cupBody', 'cupRim', 'cupHandle'],
    startPct: 0.39,
    endPct: 0.48,
  },
  {
    label: 'pen-notepad',
    paths: ['pen', 'penTip', 'notepadTop', 'notepadRight', 'notepadBottom', 'notepadLeft',
            'notepadLine1', 'notepadLine2', 'notepadLine3'],
    startPct: 0.48,
    endPct: 0.61,
  },
  {
    label: 'plant',
    paths: ['potTop', 'potLeft', 'potBottom', 'potRight',
            'leaf1', 'leaf2', 'leaf3', 'leaf4'],
    startPct: 0.61,
    endPct: 0.75,
  },
]

function Chapter1() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const svgWrapRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return

    const ctx = gsap.context(() => {
      const el = sectionRef.current
      const svg = svgRef.current
      const svgWrap = svgWrapRef.current

      // =============================================
      // SVG DRAW-ON-SCROLL — independent ScrollTrigger
      // spans the entire 500vh section with scrub: 1
      // =============================================

      // Initialize all paths fully hidden via stroke-dashoffset
      const allPaths = svg.querySelectorAll('path')
      allPaths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      // Each draw group animates within its scroll percentage range
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

      // =============================================
      // SVG OPACITY — starts at 0.15, reveals to 1.0
      // after the final text line releases
      // =============================================
      gsap.set(svgWrap, { opacity: 0.15 })

      // Reveal will be set up after line3 pin is configured (see below)

      // =============================================
      // SCROLL-PINNED TEXT — each line pins in the
      // center of the viewport: fade-in → hold → fade-out
      // Lines 1 & 3 get Goldenrod emphasis glow
      // =============================================

      // LINE 1 — "You built something real." (with glow)
      const l1 = line1Ref.current
      if (l1) {
        gsap.timeline({
          scrollTrigger: {
            trigger: l1,
            start: 'top center',
            end: '+=50vh',
            pin: true,
            scrub: true,
          },
        })
          .fromTo(l1, { opacity: 0 }, { opacity: 1, duration: 0.3 })
          .to(l1, { opacity: 1, duration: 0.4 })
          .to(l1, {
            textShadow: '0 0 40px rgba(212, 168, 67, 0.3)',
            duration: 0.2,
          }, '<')
          .to(l1, {
            textShadow: '0 0 40px rgba(212, 168, 67, 0)',
            duration: 0.2,
          })
          .to(l1, { opacity: 0.15, duration: 0.3 })
      }

      // LINE 2 — "You know your craft..." (no glow)
      const l2 = line2Ref.current
      if (l2) {
        gsap.timeline({
          scrollTrigger: {
            trigger: l2,
            start: 'top center',
            end: '+=50vh',
            pin: true,
            scrub: true,
          },
        })
          .fromTo(l2, { opacity: 0 }, { opacity: 1, duration: 0.3 })
          .to(l2, { opacity: 1, duration: 0.4 })
          .to(l2, { opacity: 0.15, duration: 0.3 })
      }

      // LINE 3 — "For years, that was the whole system." (with glow)
      const l3 = line3Ref.current
      if (l3) {
        gsap.timeline({
          scrollTrigger: {
            trigger: l3,
            start: 'top center',
            end: '+=50vh',
            pin: true,
            scrub: true,
          },
        })
          .fromTo(l3, { opacity: 0 }, { opacity: 1, duration: 0.3 })
          .to(l3, { opacity: 1, duration: 0.4 })
          .to(l3, {
            textShadow: '0 0 40px rgba(212, 168, 67, 0.3)',
            duration: 0.2,
          }, '<')
          .to(l3, {
            textShadow: '0 0 40px rgba(212, 168, 67, 0)',
            duration: 0.2,
          })
          .to(l3, { opacity: 0.15, duration: 0.3 })
      }

      // =============================================
      // SVG FINAL REVEAL — after last text pin releases,
      // SVG fades from 0.15 to 1.0 for the hero moment
      // Uses the trailing spacer div as trigger
      // =============================================
      const revealTrigger = el.querySelector('.svg-reveal-trigger')
      if (revealTrigger) {
        gsap.to(svgWrap, {
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: revealTrigger,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        minHeight: '600vh',
        background:
          'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(212, 168, 67, 0.04), transparent), var(--deep-violet)',
      }}
    >
      {/* ============================================= */}
      {/* SVG Illustration — sticky, stays centered     */}
      {/* in viewport while content scrolls over it     */}
      {/* ============================================= */}
      <div
        ref={svgWrapRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 800 650"
          className="w-[80vw] max-w-[1000px]"
          style={{ height: 'auto', maxHeight: '60vh', mixBlendMode: 'screen' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Object.entries(PATHS).map(([name, d]) => (
            <path
              key={name}
              data-name={name}
              d={d}
              stroke="var(--goldenrod)"
              strokeWidth={STRUCTURAL_PATHS.has(name) ? 2.5 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </svg>
      </div>

      {/* ============================================= */}
      {/* Text overlays — each line gets its own        */}
      {/* ScrollTrigger pin (scroll-stop-breathe-release) */}
      {/* ============================================= */}
      <div className="relative" style={{ zIndex: 10, marginTop: '-100vh' }}>
        {/* Push first line down so it enters viewport naturally */}
        <div style={{ height: '50vh' }} />

        {/* LINE 1 — visible first, pins at center */}
        <div
          ref={line1Ref}
          className="flex items-center justify-center px-6"
          style={{ height: '50vh' }}
        >
          <h1
            className="text-center leading-tight"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 300,
              color: 'var(--cream)',
            }}
          >
            You built something real.
          </h1>
        </div>

        {/* Spacer between lines (~80vh) */}
        <div style={{ height: '80vh' }} />

        {/* LINE 2 — pins at center */}
        <div
          ref={line2Ref}
          className="flex items-center justify-center px-6"
          style={{ height: '50vh' }}
        >
          <p
            className="text-center leading-relaxed max-w-[700px]"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: 'rgba(245,234,219,0.8)',
            }}
          >
            You know your craft. You know your clients. You hired people you
            trust. You sell custom work and deliver it through grit, instinct,
            and experience.
          </p>
        </div>

        {/* Spacer between lines (~80vh) */}
        <div style={{ height: '80vh' }} />

        {/* LINE 3 — pins at center */}
        <div
          ref={line3Ref}
          className="flex items-center justify-center px-6"
          style={{ height: '50vh' }}
        >
          <p
            className="text-center leading-relaxed max-w-[600px]"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: 'rgba(245,234,219,0.8)',
            }}
          >
            For years, that was the whole system.
          </p>
        </div>

        {/* Extra space after final text for the SVG full-opacity reveal */}
        <div className="svg-reveal-trigger" style={{ height: '120vh' }} />
      </div>
    </section>
  )
}

export default Chapter1
