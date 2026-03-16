import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function OpeningFrame() {
  const logoRef = useRef(null)
  const scrollTextRef = useRef(null)

  useEffect(() => {
    const logo = logoRef.current
    const scrollText = scrollTextRef.current
    if (!logo || !scrollText) return

    // Measure text width and estimate total stroke perimeter
    const textWidth = logo.getComputedTextLength()
    const perimeterEstimate = textWidth * 5

    // Set up stroke dash for draw-in
    gsap.set(logo, {
      strokeDasharray: perimeterEstimate,
      strokeDashoffset: perimeterEstimate,
    })

    // Draw-in animation (2 seconds)
    const tl = gsap.timeline()
    tl.to(logo, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
    })
    // Breathing glow after draw-in
    tl.to(logo, {
      strokeOpacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // "scroll to begin" — fade in after 1s delay
    gsap.set(scrollText, { opacity: 0 })
    gsap.to(scrollText, { opacity: 0.5, delay: 1, duration: 0.8 })

    // Fade out "scroll to begin" on any scroll
    const handleScroll = () => {
      if (window.scrollY > 10) {
        gsap.to(scrollText, { opacity: 0, duration: 0.3 })
        window.removeEventListener('scroll', handleScroll)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      tl.kill()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(212, 168, 67, 0.04), transparent), var(--deep-violet)',
      }}
    >
      <svg
        width="200"
        height="50"
        viewBox="0 0 200 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          ref={logoRef}
          x="100"
          y="36"
          textAnchor="middle"
          fontFamily="'Open Sans', sans-serif"
          fontWeight="700"
          fontSize="32"
          fill="none"
          stroke="#D4A843"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          net &amp; net
        </text>
      </svg>

      <p
        ref={scrollTextRef}
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 300,
          fontSize: '14px',
          color: '#F5EADB',
          opacity: 0,
          marginTop: '40px',
          animation: 'float 2s ease-in-out infinite',
          letterSpacing: '0.1em',
        }}
      >
        scroll to begin
      </p>
    </section>
  )
}

export default OpeningFrame
