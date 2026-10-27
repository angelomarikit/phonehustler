import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useSite } from "../cms/SiteProvider"
import { InquiryProvider, useInquiry } from "./InquiryModal"
import { Button, Faces, Logo } from "./ui"

function linkIsActive(to: string, pathname: string, hash: string) {
  const [path, fragment] = to.split("#")
  if (fragment) return pathname === path && hash === `#${fragment}`
  if (path !== "/" && pathname.startsWith(path)) return true
  return pathname === path
}

function NavLinkItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  const { pathname, hash } = useLocation()
  const active = linkIsActive(to, pathname, hash)
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`text-sm transition-colors ${active ? "text-brand" : "text-brand-deep/70 hover:text-brand-deep"}`}
    >
      {label}
    </Link>
  )
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? window.scrollY / height : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div className="h-full origin-left bg-brand" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const site = useSite().sections.site
  const openInquiry = useInquiry()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 md:px-6">
        <div className="flex w-full max-w-[1080px] items-center justify-between gap-4 rounded-full border border-white/80 bg-white/92 px-3 py-1.5 text-brand-deep shadow-[0_14px_40px_rgba(2,26,63,0.18)] backdrop-blur-xl">
          <Logo size="lg" />
          <nav className="hidden items-center gap-6 md:flex">
            {site.nav.map((link) => (
              <NavLinkItem key={link.label} {...link} />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${site.phoneTel}`} className="hidden text-sm font-semibold tracking-[-0.02em] text-brand-deep lg:inline">
              {site.phone}
            </a>
            <div className="hidden md:block">
              <Button onClick={openInquiry}>{site.navButton}</Button>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-4 py-2.5 text-sm font-medium text-white md:hidden"
              aria-label={open ? site.menuClose : site.menuOpen}
              onClick={() => setOpen((value) => !value)}
            >
              <span>{open ? site.menuClose : site.menuOpen}</span>
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-0.5 w-4 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-4 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-paper px-6 pb-10 pt-28 text-brand-deep"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <nav className="flex flex-col gap-5">
              {site.nav.map((link, index) => (
                <motion.div key={link.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
                  <Link to={link.to} className="font-display text-4xl font-semibold tracking-[-0.04em]" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 space-y-3 text-sm">
              <a href={`tel:${site.phoneTel}`} className="block font-semibold">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block text-brand-deep/70">
                {site.email}
              </a>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => {
                  setOpen(false)
                  openInquiry()
                }}
                variant="secondary"
              >
                {site.navButton}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function CtaBand() {
  const { sections } = useSite()
  const site = sections.site
  const openInquiry = useInquiry()
  return (
    <section className="px-4 pt-24 text-center md:px-6 md:pt-32">
      <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-[-0.045em] text-balance text-ink md:text-6xl md:leading-[1.05]">
        {site.ctaTitle}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-body leading-relaxed">{site.ctaBody}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <span className="text-sm text-mute">{site.ctaPeople}</span>
        <Faces images={sections.aboutHome.faces} size="sm" />
        <Button onClick={openInquiry} variant="ink">
          {site.ctaButton}
        </Button>
      </div>
    </section>
  )
}

function FooterLink({ to, label, external }: { to: string; label: string; external?: boolean }) {
  const { pathname, hash } = useLocation()
  const active = !external && !to.startsWith("http") && linkIsActive(to, pathname, hash)
  const className = `text-sm transition hover:text-brand ${active ? "text-brand" : "text-white/75"}`
  if (external || to.startsWith("http")) {
    return (
      <a href={to} className={className} target="_blank" rel="noreferrer">
        {label}
      </a>
    )
  }
  return (
    <Link to={to} aria-current={active ? "page" : undefined} className={className}>
      {label}
    </Link>
  )
}

export function Footer() {
  const site = useSite().sections.site
  return (
    <footer className="px-4 pt-12 pb-8 text-white md:px-6">
      <div className="mx-auto max-w-[1120px] rounded-[28px] bg-ink px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" size="lg" />
            <p className="mt-6 max-w-xs text-white/80">{site.footerBlurb}</p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:${site.phoneTel}`} className="block font-medium text-white">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block text-white/75">
                {site.email}
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-white/45">{site.exploreLabel}</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {site.footerLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-white/45">{site.socialsLabel}</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {site.socials.map((link) => (
                <FooterLink key={link.label} to={link.to} label={link.label} external />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <p>{site.credit}</p>
        </div>
      </div>
    </footer>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <InquiryProvider>
      <div className="min-h-screen bg-paper">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <div className="bg-[linear-gradient(180deg,#f3f5f7_0%,#d7ebff_42%,#8ec8ff_100%)]">
          <CtaBand />
          <Footer />
        </div>
      </div>
    </InquiryProvider>
  )
}
