import logoReverse from '../assets/logo/logo-reverse.svg?raw'

function Footer() {
  return (
    <footer className="bg-[#12102a] py-14 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo + tagline */}
          <div>
            <div className="w-28 mb-3" dangerouslySetInnerHTML={{ __html: logoReverse }} />
            <p className="text-cream/40 text-sm">The operating system for small agencies.</p>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-cream/25 text-xs font-bold uppercase tracking-widest mb-3">Product</h4>
              <ul className="space-y-2">
                {['Features', 'How It Works', 'Pricing'].map(l => (
                  <li key={l}><a href="#" className="text-cream/50 hover:text-netnet-purple text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-cream/25 text-xs font-bold uppercase tracking-widest mb-3">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Contact'].map(l => (
                  <li key={l}><a href={l === 'Blog' ? '/blog' : '#'} className="text-cream/50 hover:text-netnet-purple text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Status */}
          <div className="md:text-right">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="text-cream/40 text-xs font-medium">System Operational</span>
            </div>
            <p className="text-cream/20 text-xs">Net Net, LLC &middot; South Carolina</p>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-cream/15 text-xs">&copy; {new Date().getFullYear()} Net Net, LLC. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-cream/15 hover:text-cream/30 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
