import { useRef, useState } from 'react'
import { gsap } from 'gsap'

function ToggleReveal({ children }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  const toggle = () => {
    if (!open) {
      gsap.set(contentRef.current, { height: 'auto' })
      const h = contentRef.current.offsetHeight
      gsap.fromTo(contentRef.current, { height: 0 }, { height: h, duration: 0.5, ease: 'power2.inOut' })
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power2.inOut' })
    }
    setOpen(!open)
  }

  return (
    <div className="mt-4">
      <button onClick={toggle} className={`toggle-btn ${open ? 'open' : ''}`} aria-label="Show more">
        +
      </button>
      <div ref={contentRef} className="toggle-content">
        <div className="pt-4 pb-2">{children}</div>
      </div>
    </div>
  )
}

export default ToggleReveal
