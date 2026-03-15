import logoReverse from '../assets/logo/logo-reverse.svg?raw'

function Footer() {
  return (
    <footer className="bg-[#15112E] pt-16 pb-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo + tagline */}
          <div>
            <div
              className="w-32 mb-4"
              dangerouslySetInnerHTML={{ __html: logoReverse }}
            />
            <p className="text-cream/50 text-sm">
              The operating system for small agencies.
            </p>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-xs text-cream/30 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'How It Works', 'Pricing'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-cream/50 hover:text-netnet-purple text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs text-cream/30 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={link === 'Blog' ? '/blog' : '#'} className="text-cream/50 hover:text-netnet-purple text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* System status */}
          <div className="md:text-right">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="font-mono text-xs text-cream/50">System Operational</span>
            </div>
            <p className="text-cream/30 text-xs font-mono">
              Net Net, LLC<br />
              South Carolina
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-cream/20">
              &copy; {new Date().getFullYear()} Net Net, LLC. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <a key={link} href="#" className="font-mono text-xs text-cream/20 hover:text-cream/40 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
