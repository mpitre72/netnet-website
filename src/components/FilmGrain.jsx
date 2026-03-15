function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]">
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}

export default FilmGrain
