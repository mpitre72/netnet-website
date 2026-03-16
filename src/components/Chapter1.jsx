import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* =============================================
   SVG PATH DATA — "The Corner Office"
   ViewBox: 900 x 700
   ============================================= */

// WINDOW FRAME — Cream at 60% opacity, stroke-width 2
const WINDOW_FRAME_PATHS = {
  frameLeft: 'M 250 25 L 250 285',
  frameTop: 'M 250 25 L 650 25',
  frameRight: 'M 650 25 L 650 285',
  frameBottom: 'M 250 285 L 650 285',
  dividerH: 'M 250 155 L 650 155',
  dividerV: 'M 450 25 L 450 285',
}

// WINDOW BLINDS — Cream at 25% opacity, stroke-width 0.5
const WINDOW_BLIND_PATHS = {
  blindTL1: 'M 260 58 L 440 58',
  blindTL2: 'M 260 90 L 440 90',
  blindTL3: 'M 260 122 L 440 122',
  blindTR1: 'M 460 58 L 640 58',
  blindTR2: 'M 460 90 L 640 90',
  blindTR3: 'M 460 122 L 640 122',
  blindBL1: 'M 260 188 L 440 188',
  blindBL2: 'M 260 220 L 440 220',
  blindBL3: 'M 260 252 L 440 252',
  blindBR1: 'M 460 188 L 640 188',
  blindBR2: 'M 460 220 L 640 220',
  blindBR3: 'M 460 252 L 640 252',
}

// LIGHT RAYS — Goldenrod, stroke-width 1.5, extend below window
const LIGHT_RAY_PATHS = {
  ray1: 'M 350 25 L 310 400',
  ray2: 'M 400 25 L 380 420',
  ray3: 'M 450 25 L 450 415',
  ray4: 'M 500 25 L 520 420',
  ray5: 'M 550 25 L 590 400',
  ray6: 'M 580 25 L 640 360',
}

// DESK — Goldenrod, stroke-width 2.5 (structure), 1.5 (items)
const DESK_STRUCTURE_PATHS = {
  deskSurface: 'M 150 430 L 750 430',
  deskEdge: 'M 155 430 L 155 442 L 745 442 L 745 430',
  legOuterL: 'M 185 442 L 158 550',
  legInnerL: 'M 220 442 L 226 550',
  legInnerR: 'M 680 442 L 674 550',
  legOuterR: 'M 715 442 L 742 550',
  footL: 'M 150 550 L 234 550',
  footR: 'M 666 550 L 750 550',
}

const DESK_ITEM_PATHS = {
  mugBody: 'M 268 408 L 268 430 L 298 430 L 298 408',
  mugRim: 'M 264 408 L 302 408',
  mugHandle: 'M 298 413 Q 314 420 298 427',
  laptopBase: 'M 548 430 L 548 422 L 632 422 L 632 430',
  laptopScreenL: 'M 550 422 L 542 356',
  laptopScreenT: 'M 542 356 L 638 356',
  laptopScreenR: 'M 638 356 L 630 422',
}

// CHAIR — office chair with wheels, Goldenrod
const CHAIR_STRUCTURE_PATHS = {
  backrest: 'M 380 478 Q 450 452 520 478',
  seatPan: 'M 375 518 Q 450 530 525 518',
  supportL: 'M 392 478 L 387 518',
  supportR: 'M 508 478 L 513 518',
}

const CHAIR_DETAIL_PATHS = {
  stem: 'M 450 530 L 450 588',
  baseLeg1: 'M 450 588 L 392 612',
  baseLeg2: 'M 450 588 L 408 624',
  baseLeg3: 'M 450 588 L 450 630',
  baseLeg4: 'M 450 588 L 492 624',
  baseLeg5: 'M 450 588 L 508 612',
  wheel1: 'M 388 612 A 4 4 0 1 1 396 612 A 4 4 0 1 1 388 612',
  wheel2: 'M 404 624 A 4 4 0 1 1 412 624 A 4 4 0 1 1 404 624',
  wheel3: 'M 446 630 A 4 4 0 1 1 454 630 A 4 4 0 1 1 446 630',
  wheel4: 'M 488 624 A 4 4 0 1 1 496 624 A 4 4 0 1 1 488 624',
  wheel5: 'M 504 612 A 4 4 0 1 1 512 612 A 4 4 0 1 1 504 612',
}

// PLANT — bottom-right, Goldenrod, stroke-width 1.5
const PLANT_PATHS = {
  potTop: 'M 698 558 L 742 558',
  potLeft: 'M 698 558 L 706 604',
  potBottom: 'M 706 604 L 734 604',
  potRight: 'M 742 558 L 734 604',
  leaf1: 'M 720 558 Q 694 502 706 470',
  leaf2: 'M 720 558 Q 726 498 748 478',
  leaf3: 'M 720 558 Q 710 508 696 482',
  leaf4: 'M 720 558 Q 738 512 752 488',
}

/* =============================================
   DRAW GROUPS — timeline positions (0-1)
   ============================================= */
const DRAW_GROUPS = [
  {
    label: 'window',
    paths: [
      ...Object.keys(WINDOW_FRAME_PATHS),
      ...Object.keys(WINDOW_BLIND_PATHS),
      ...Object.keys(LIGHT_RAY_PATHS),
    ],
    start: 0,
    end: 0.20,
  },
  {
    label: 'desk',
    paths: [
      ...Object.keys(DESK_STRUCTURE_PATHS),
      ...Object.keys(DESK_ITEM_PATHS),
    ],
    start: 0.20,
    end: 0.45,
  },
  {
    label: 'chair',
    paths: [
      ...Object.keys(CHAIR_STRUCTURE_PATHS),
      ...Object.keys(CHAIR_DETAIL_PATHS),
    ],
    start: 0.45,
    end: 0.65,
  },
  {
    label: 'plant',
    paths: Object.keys(PLANT_PATHS),
    start: 0.65,
    end: 0.85,
  },
]

/* =============================================
   PATH STYLE LOOKUP
   ============================================= */
function getPathStyle(name) {
  if (name in WINDOW_FRAME_PATHS)
    return { stroke: 'rgba(245,234,219,0.6)', strokeWidth: 2 }
  if (name in WINDOW_BLIND_PATHS)
    return { stroke: 'rgba(245,234,219,0.25)', strokeWidth: 0.5 }
  if (name in LIGHT_RAY_PATHS)
    return { stroke: '#D4A843', strokeWidth: 1.5 }
  if (name in DESK_STRUCTURE_PATHS)
    return { stroke: '#D4A843', strokeWidth: 2.5 }
  if (name in DESK_ITEM_PATHS)
    return { stroke: '#D4A843', strokeWidth: 1.5 }
  if (name in CHAIR_STRUCTURE_PATHS)
    return { stroke: '#D4A843', strokeWidth: 2.5 }
  if (name in CHAIR_DETAIL_PATHS)
    return { stroke: '#D4A843', strokeWidth: 1.5 }
  if (name in PLANT_PATHS)
    return { stroke: '#D4A843', strokeWidth: 1.5 }
  return { stroke: '#D4A843', strokeWidth: 1.5 }
}

// Merge all paths into one flat object for rendering
const ALL_PATHS = {
  ...WINDOW_FRAME_PATHS,
  ...WINDOW_BLIND_PATHS,
  ...LIGHT_RAY_PATHS,
  ...DESK_STRUCTURE_PATHS,
  ...DESK_ITEM_PATHS,
  ...CHAIR_STRUCTURE_PATHS,
  ...CHAIR_DETAIL_PATHS,
  ...PLANT_PATHS,
}

// Rotating words for Line 2
const ROTATING_WORDS = ['creative', 'impactful', 'technical', 'revealing', 'custom']

/* =============================================
   COMPONENT
   ============================================= */
function Chapter1() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const svgWrapRef = useRef(null)
  const textWrapRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const svg = svgRef.current
    const svgWrap = svgWrapRef.current
    const textWrap = textWrapRef.current
    const l1 = line1Ref.current
    const l2 = line2Ref.current
    const l3 = line3Ref.current
    if (!el || !svg || !textWrap || !l1 || !l2 || !l3) return

    const ctx = gsap.context(() => {
      // ===========================================
      // 1. SET UP SVG STROKE DASH
      // ===========================================
      const allPaths = svg.querySelectorAll('path')
      allPaths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })

      // ===========================================
      // 2. SVG OPACITY — start at 0.15
      // ===========================================
      gsap.set(svgWrap, { opacity: 0.15 })

      // ===========================================
      // 3. TEXT — start hidden
      // ===========================================
      gsap.set([l1, l2, l3], { opacity: 0 })

      // ===========================================
      // 4. SINGLE-PIN TIMELINE
      //    One wrapper pinned for 400vh.
      //    All text + SVG draw + SVG reveal on one
      //    timeline with explicit position params.
      // ===========================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textWrap,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1,
        },
      })

      // --- SVG DRAW GROUPS (background animation) ---
      DRAW_GROUPS.forEach((group) => {
        const dur = group.end - group.start
        group.paths.forEach((name) => {
          const p = svg.querySelector(`[data-name="${name}"]`)
          if (!p) return
          tl.to(
            p,
            { strokeDashoffset: 0, duration: dur, ease: 'none' },
            group.start,
          )
        })
      })

      // --- LINE 1: "You built something real." (0% → 30%) ---
      // 0-10%: fade in
      tl.to(l1, { opacity: 1, duration: 0.10, ease: 'none' }, 0)
      // 10-15%: glow in
      tl.to(
        l1,
        {
          textShadow: '0 0 40px rgba(212, 168, 67, 0.25)',
          duration: 0.05,
          ease: 'none',
        },
        0.10,
      )
      // 15-20%: glow out
      tl.to(
        l1,
        {
          textShadow: '0 0 40px rgba(212, 168, 67, 0)',
          duration: 0.05,
          ease: 'none',
        },
        0.15,
      )
      // 20-30%: fade out
      tl.to(l1, { opacity: 0, duration: 0.10, ease: 'none' }, 0.20)

      // --- LINE 2: rotating word paragraph (30% → 65%) ---
      // 30-40%: fade in
      tl.to(l2, { opacity: 1, duration: 0.10, ease: 'none' }, 0.30)
      // 40-55%: hold (word rotation runs via CSS, independent of scroll)
      // 55-65%: fade out
      tl.to(l2, { opacity: 0, duration: 0.10, ease: 'none' }, 0.55)

      // --- LINE 3: "For years, that was the whole system." (65% → 95%) ---
      // 65-75%: fade in
      tl.to(l3, { opacity: 1, duration: 0.10, ease: 'none' }, 0.65)
      // 75-80%: glow in
      tl.to(
        l3,
        {
          textShadow: '0 0 40px rgba(212, 168, 67, 0.25)',
          duration: 0.05,
          ease: 'none',
        },
        0.75,
      )
      // 80-85%: glow out
      tl.to(
        l3,
        {
          textShadow: '0 0 40px rgba(212, 168, 67, 0)',
          duration: 0.05,
          ease: 'none',
        },
        0.80,
      )
      // 85-95%: fade out
      tl.to(l3, { opacity: 0, duration: 0.10, ease: 'none' }, 0.85)

      // --- SVG REVEAL (95% → 100%) ---
      tl.to(
        svgWrap,
        { opacity: 1, duration: 0.05, ease: 'power2.out' },
        0.95,
      )
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
      {/* =========================================== */}
      {/* SVG — sticky, centered in viewport          */}
      {/* =========================================== */}
      <div
        ref={svgWrapRef}
        className="sticky top-0 w-full flex items-center justify-center"
        style={{ zIndex: 1, height: 0, overflow: 'visible' }}
      >
        <div className="h-screen w-full flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 900 700"
            className="w-[78vw] max-w-[1100px]"
            style={{ height: 'auto', maxHeight: '58vh' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {Object.entries(ALL_PATHS).map(([name, d]) => {
              const style = getPathStyle(name)
              return (
                <path
                  key={name}
                  data-name={name}
                  d={d}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              )
            })}
          </svg>
        </div>
      </div>

      {/* =========================================== */}
      {/* TEXT — single 100vh wrapper, pinned for     */}
      {/* 400vh. All 3 lines stacked absolute inside. */}
      {/* =========================================== */}
      <div
        ref={textWrapRef}
        className="relative w-full"
        style={{ height: '100vh', zIndex: 10 }}
      >
        {/* LINE 1 */}
        <div
          ref={line1Ref}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <h1
            className="text-center leading-tight"
            style={{
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 300,
              color: '#F5EADB',
            }}
          >
            You built something real.
          </h1>
        </div>

        {/* LINE 2 — with rotating word */}
        <div
          ref={line2Ref}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <p
            className="text-center leading-relaxed"
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
              fontWeight: 400,
              maxWidth: '700px',
              color: '#F5EADB',
            }}
          >
            You know your craft. You know your clients. You hired people you
            trust. You sell{' '}
            <span
              style={{
                display: 'inline-grid',
                verticalAlign: 'baseline',
              }}
            >
              {ROTATING_WORDS.map((word, i) => (
                <span
                  key={word}
                  style={{
                    gridArea: '1 / 1',
                    color: '#D4A843',
                    fontWeight: 600,
                    opacity: 0,
                    animation: `rotateWord 7.5s linear infinite`,
                    animationDelay: `${i * 1.5}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </span>{' '}
            work and deliver it through grit, instinct, and experience.
          </p>
        </div>

        {/* LINE 3 */}
        <div
          ref={line3Ref}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <p
            className="text-center leading-tight"
            style={{
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 300,
              color: '#F5EADB',
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
