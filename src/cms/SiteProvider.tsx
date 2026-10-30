import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { getClient } from "./client"
import { defaultSections, mergeSections, type Sections } from "./defaults"

type SiteState = {
  sections: Sections
  ready: boolean
  fromDatabase: boolean
  error: string | null
  reload: () => Promise<void>
}

const SiteContext = createContext<SiteState | null>(null)

function patchStaleSections(sections: Sections): Sections {
  let next = sections

  let hero = next.hero
  if (hero.accent === "Dialer" && String(hero.before).trim().startsWith("Our")) {
    hero = defaultSections.hero
  } else if (hero.sub?.includes("Stop dialing one number at a time")) {
    hero = { ...hero, sub: "" }
  }
  if (hero !== next.hero) next = { ...next, hero }

  const about = next.aboutHome
  if (
    about.headline?.includes("One caller used to wait") ||
    about.fade === "Hundreds of calls in one shift." ||
    (about.headline?.includes("Phone Hustlers —") && !about.headline?.includes("Stop dialing one number"))
  ) {
    next = { ...next, aboutHome: defaultSections.aboutHome }
  }

  const why = next.why
  if (
    why.title === "Why companies choose our dialer" ||
    why.body?.includes("VICIdial keeps every caller") ||
    !("subtitle" in why) ||
    why.photoRight?.includes("unsplash.com") ||
    why.photoRight === "/jay-benz.jpg"
  ) {
    next = { ...next, why: defaultSections.why }
  }

  const whySignName = next.why.signName?.trim()
  const whySignRole = next.why.signRole?.trim()
  if (!whySignName || !whySignRole) {
    next = {
      ...next,
      why: {
        ...next.why,
        signName: whySignName || defaultSections.why.signName,
        signRole: whySignRole || defaultSections.why.signRole,
      },
    }
  }

  const industriesSection = next.industries
  const industryItems = industriesSection.items as readonly string[] | undefined
  const staleIndustryLabels = ["Reverse Mortgage", "Walk In Tubs", "Business Loans"]
  if (
    staleIndustryLabels.some((label) => industryItems?.includes(label)) ||
    !industryItems?.includes("Roofing")
  ) {
    next = { ...next, industries: defaultSections.industries }
  }

  const workHome = next.workHome
  if (
    workHome.title === "Our Work" ||
    "buttonTo" in workHome ||
    !("options" in workHome) ||
    !Array.isArray(workHome.options) ||
    workHome.options.length < 4 ||
    workHome.options.some(
      (item) =>
        typeof item.image === "string" &&
        (item.image.includes("1521737710484") ||
          item.image.includes("filipino-call-center.jpg") ||
          item.image.includes("unsplash.com")),
    )
  ) {
    next = { ...next, workHome: defaultSections.workHome }
  }

  let dialer = next.dialer
  const solution = next.solution
  if (
    solution.photo?.includes("photo-1522202176988") ||
    solution.photo?.includes("calling-team.jpg") ||
    (solution.photo?.includes("unsplash.com") && !solution.photo.includes("filipino-call-center"))
  ) {
    next = { ...next, solution: { ...solution, photo: defaultSections.solution.photo } }
  }

  if (dialer.photo?.includes("filipino-call-center")) {
    dialer = { ...dialer, photo: defaultSections.dialer.photo }
  }
  if (
    dialer.title === "It calls multiple numbers at once" ||
    dialer.pitch === "Multiple numbers ring together. The first hello goes straight to a caller." ||
    dialer.points?.[0] === "Multiple numbers at once" ||
    dialer.pitch?.includes("only hears “hello”")
  ) {
    dialer = defaultSections.dialer
  }
  if (dialer !== next.dialer) next = { ...next, dialer }

  const processSection = next.process
  if (
    processSection.title === "How the dialer job works" ||
    processSection.body?.includes("VICIdial does the ringing")
  ) {
    next = { ...next, process: defaultSections.process }
  }

  let faqItems = next.faq.items
  if (faqItems?.some((item) => item.q === "What is VICIdial?")) {
    faqItems = faqItems.filter((item) => item.q !== "What is VICIdial?")
  }
  const callsFaq = faqItems?.find((item) => item.q === "How many calls can one person make?")
  if (
    callsFaq &&
    callsFaq.a !== defaultSections.faq.items.find((item) => item.q === "How many calls can one person make?")?.a
  ) {
    faqItems = faqItems!.map((item) =>
      item.q === "How many calls can one person make?"
        ? { ...item, a: defaultSections.faq.items.find((i) => i.q === "How many calls can one person make?")!.a }
        : item,
    )
  }
  if (faqItems && faqItems !== next.faq.items) {
    next = { ...next, faq: { ...next.faq, items: faqItems } }
  }

  let site = next.site
  const staleCta =
    site.ctaTitle === "Your list can get hundreds of calls a shift" ||
    site.ctaTitle === "People are waiting for a call" ||
    site.ctaBody?.includes("We load the names into VICIdial")
  const staleFooterBlurb =
    site.footerBlurb?.includes("We call with VICIdial") ||
    site.footerBlurb?.includes("predictive dialer, so one caller")
  const staleInquiry =
    site.inquiryText?.includes("VICIdial") ||
    site.inquiryText?.includes("Tell us the offer and the list") ||
    /jay|benz|bendebel|founder|ceo at phone/i.test(site.inquiryAside ?? "") ||
    site.inquiryAside?.includes("Monday through")
  if (staleCta || staleFooterBlurb || staleInquiry) {
    site = { ...site }
    if (staleCta) {
      site.ctaTitle = defaultSections.site.ctaTitle
      site.ctaBody = defaultSections.site.ctaBody
    }
    if (staleFooterBlurb) {
      site.footerBlurb = defaultSections.site.footerBlurb
    }
    if (staleInquiry) {
      site.inquiryTitle = defaultSections.site.inquiryTitle
      site.inquiryText = defaultSections.site.inquiryText
      site.inquiryAside = defaultSections.site.inquiryAside
    }
    next = { ...next, site }
  }

  const articlesSection = next.articles
  const staleArticleImages = [
    "photo-1416879595882",
    "photo-1490750967868",
    "photo-1501004318641",
    "photo-1468327768560",
    "photo-1496062031456",
  ]
  if (
    articlesSection.pageTitle?.includes("VICIdial") ||
    articlesSection.items?.some((item) => item.title === "What VICIdial Does") ||
    articlesSection.items?.some(
      (item) => typeof item.image === "string" && staleArticleImages.some((id) => item.image.includes(id)),
    )
  ) {
    next = { ...next, articles: defaultSections.articles }
  }

  const directorOps = (items: { name?: string; role?: string }[] | undefined) =>
    items?.some((m) => m.role === "Director of Operations" && m.name === "Team member")

  if (directorOps(next.teamHome.items)) {
    next = { ...next, teamHome: defaultSections.teamHome }
  }
  if (directorOps(next.aboutPage.team)) {
    next = { ...next, aboutPage: { ...next.aboutPage, team: defaultSections.aboutPage.team } }
  }

  const testimonialItems = next.testimonials.items
  const johnConti = testimonialItems?.find((item) => item.name === "John Conti")
  if (
    testimonialItems?.some((item) => item.name === "David Clarke") ||
    !testimonialItems?.some((item) => item.name === "John Conti" && "videoUrl" in item && item.videoUrl) ||
    (johnConti && johnConti.role !== "Owner, Trade Show Collections")
  ) {
    next = { ...next, testimonials: defaultSections.testimonials }
  }

  return next
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Sections>(defaultSections)
  const [ready, setReady] = useState(false)
  const [fromDatabase, setFromDatabase] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientKey, setClientKey] = useState(0)

  const reload = useCallback(async () => {
    const supabase = getClient()
    if (!supabase) {
      setSections(defaultSections)
      setFromDatabase(false)
      setError(null)
      setReady(true)
      return
    }
    const { data, error: loadError } = await supabase.from("sections").select("id,data")
    if (loadError) {
      setSections(defaultSections)
      setFromDatabase(false)
      setError(loadError.message)
      setReady(true)
      return
    }
    const rows = data ?? []
    const merged = rows.length ? mergeSections(rows) : defaultSections
    setSections(patchStaleSections(merged))
    setFromDatabase(rows.length > 0)
    setError(null)
    setReady(true)
  }, [])

  useEffect(() => {
    void reload()
    const onConfig = () => void reload()
    const onClient = () => setClientKey((key) => key + 1)
    window.addEventListener("ph-supabase-config", onConfig)
    window.addEventListener("ph-supabase-config", onClient)
    return () => {
      window.removeEventListener("ph-supabase-config", onConfig)
      window.removeEventListener("ph-supabase-config", onClient)
    }
  }, [reload])

  useEffect(() => {
    const supabase = getClient()
    if (!supabase) return
    const channel = supabase
      .channel("sections-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "sections" }, () => {
        void reload()
      })
      .subscribe()
    return () => {
      void supabase.removeChannel(channel)
    }
  }, [reload, clientKey])

  useEffect(() => {
    document.title = sections.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute("content", sections.meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", sections.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", sections.meta.description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", sections.meta.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", sections.meta.description)
    const imageUrl = `${window.location.origin}/og.jpg`
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", imageUrl)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", imageUrl)
  }, [sections.meta])

  const value = useMemo(
    () => ({ sections, ready, fromDatabase, error, reload }),
    [sections, ready, fromDatabase, error, reload],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const value = useContext(SiteContext)
  if (!value) throw new Error("useSite must be used inside SiteProvider")
  return value
}
