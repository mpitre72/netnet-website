function FixedLogo() {
  return (
    <div className="fixed bottom-6 left-6 z-40 opacity-20 pointer-events-none select-none">
      <svg width="60" height="18" viewBox="0 0 60 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="14"
          fontFamily="'Open Sans', sans-serif"
          fontWeight="600"
          fontSize="14"
          fill="none"
          stroke="var(--goldenrod)"
          strokeWidth="0.5"
        >
          net &amp; net
        </text>
      </svg>
    </div>
  )
}

export default FixedLogo
