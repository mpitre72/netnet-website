import logoReverse from '../assets/logo/logo-reverse.svg?raw'

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-deep-violet overflow-hidden px-6">
      {/* Environmental background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[30vw] font-serif font-bold italic text-netnet-purple/[0.08] leading-none">
          TRUTH
        </span>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto text-center">
        {/* Animated Logo */}
        <div
          className="w-48 md:w-64 mb-12"
          dangerouslySetInnerHTML={{ __html: logoReverse }}
        />

        {/* Headline */}
        <h1 className="text-cream font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
          Your agency has a pulse.
          <br />
          <span className="text-netnet-purple">Do you know what it's saying?</span>
        </h1>

        {/* Subheadline */}
        <p className="text-cream/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Net Net surfaces where your team's time actually goes and whether your jobs are on track. So you can act before things slip.
        </p>

        {/* CTA Button */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 bg-netnet-purple hover:bg-netnet-purple/90 text-white font-medium text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Join the Waitlist
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Hero
