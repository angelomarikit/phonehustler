import { createContext, useContext, useEffect, useId, useState, type FormEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { getClient } from "../cms/client"
import { useSite } from "../cms/SiteProvider"

const InquiryContext = createContext<(() => void) | null>(null)

export function useInquiry() {
  const open = useContext(InquiryContext)
  if (!open) throw new Error("useInquiry must be used inside InquiryProvider")
  return open
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <InquiryContext.Provider value={() => setOpen(true)}>
      {children}
      <InquiryModal open={open} onClose={() => setOpen(false)} />
    </InquiryContext.Provider>
  )
}

function InquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { sections } = useSite()
  const site = sections.site
  const hero = sections.hero
  const industries = sections.industries.items
  const formId = useId()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [industry, setIndustry] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  function reset() {
    setName("")
    setPhone("")
    setEmail("")
    setCompany("")
    setIndustry("")
    setMessage("")
    setError("")
    setDone(false)
    setSending(false)
  }

  function close() {
    onClose()
    window.setTimeout(reset, 250)
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError("")
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Add your name, phone, and email so we can call you back.")
      return
    }
    setSending(true)
    const note = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      company: company.trim(),
      industry,
      message: message.trim(),
    }
    const supabase = getClient()
    if (supabase) {
      const { error: saveError } = await supabase.from("inquiries").insert(note)
      if (!saveError) {
        setSending(false)
        setDone(true)
        return
      }
    }
    const body = [
      `Name: ${note.name}`,
      `Phone: ${note.phone}`,
      `Email: ${note.email}`,
      `Company: ${note.company || "—"}`,
      `Industry: ${note.industry || "—"}`,
      "",
      note.message || "Please call me back.",
    ].join("\n")
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Talk to us — " + note.name)}&body=${encodeURIComponent(body)}`
    setSending(false)
    setDone(true)
  }

  const field = "w-full rounded-2xl border border-black/10 bg-paper px-4 py-3 text-sm text-brand-deep outline-none transition focus:border-brand focus:bg-white"

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-brand-deep/70 backdrop-blur-md" aria-label="Close" onClick={close} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${formId}-title`}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[min(920px,calc(100svh-1.5rem))] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-[0_30px_80px_rgba(2,26,63,0.35)] md:grid-cols-[0.82fr_1.18fr]"
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brand-deep shadow-sm"
              aria-label="Close"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <aside className="relative overflow-hidden bg-brand-deep px-7 py-8 text-white md:px-8 md:py-10">
              <img
                src="/logo-light.png?v=3"
                alt="Phone Hustlers"
                width={922}
                height={300}
                className="block h-11 w-auto max-w-[min(100%,220px)] object-contain object-left md:h-12"
              />
              <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em]" id={`${formId}-title`}>
                {site.inquiryTitle}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">{site.inquiryText}</p>
              <p className="mt-6 text-sm text-white/60">{hero.name}</p>
              <p className="text-xs text-white/45">{hero.role}</p>
              <div className="mt-8 space-y-3 text-sm">
                <a href={`tel:${site.phoneTel}`} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/15">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
                    <PhoneIcon />
                  </span>
                  <span>
                    <span className="block text-[11px] text-white/55">Call us</span>
                    <span className="font-medium">{site.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/15">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                    <MailIcon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] text-white/55">Email us</span>
                    <span className="block truncate font-medium">{site.email}</span>
                  </span>
                </a>
              </div>
            </aside>
            <div className="px-6 py-8 md:px-8 md:py-10">
              {done ? (
                <div className="flex h-full min-h-[320px] flex-col justify-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
                    <svg viewBox="0 0 16 16" className="h-6 w-6" fill="none">
                      <path d="M3 8.2 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-brand-deep">{site.inquiryThanks}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-body">
                    You can also call {site.phone} or email {site.email}.
                  </p>
                  <button type="button" onClick={close} className="mt-8 w-fit rounded-full bg-brand-deep px-5 py-3 text-sm font-medium text-white">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={(event) => void submit(event)} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-medium text-mute">
                      Your name
                      <input required value={name} onChange={(event) => setName(event.target.value)} className={`${field} mt-1.5`} placeholder="Jane Cruz" />
                    </label>
                    <label className="block text-xs font-medium text-mute">
                      Phone
                      <input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={`${field} mt-1.5`} placeholder="09xx xxx xxxx" />
                    </label>
                  </div>
                  <label className="block text-xs font-medium text-mute">
                    Email
                    <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${field} mt-1.5`} placeholder="you@company.com" />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-medium text-mute">
                      Company
                      <input value={company} onChange={(event) => setCompany(event.target.value)} className={`${field} mt-1.5`} placeholder="Optional" />
                    </label>
                    <label className="block text-xs font-medium text-mute">
                      Industry
                      <select value={industry} onChange={(event) => setIndustry(event.target.value)} className={`${field} mt-1.5`}>
                        <option value="">Choose one</option>
                        {industries.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block text-xs font-medium text-mute">
                    What do you need?
                    <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} className={`${field} mt-1.5 resize-none`} placeholder="Tell us the offer and who we should call." />
                  </label>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button type="submit" disabled={sending} className="mt-2 w-full rounded-full bg-brand py-3.5 text-sm font-medium text-white transition hover:bg-brand-deep disabled:opacity-60">
                    {sending ? "Sending…" : site.inquiryButton}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M3.5 2.5h2.2l1 2.4-1.3 1a8 8 0 0 0 3.7 3.7l1-1.3 2.4 1v2.2A1.2 1.2 0 0 1 11.3 13 10.5 10.5 0 0 1 3 4.7a1.2 1.2 0 0 1 .5-2.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M2.5 4.5h11v7h-11v-7Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="m3 5 5 4 5-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}
