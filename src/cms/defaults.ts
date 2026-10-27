import {
  CAL,
  articles,
  cases,
  faces,
  faqs,
  featureRowA,
  featureRowB,
  footerExplore,
  img,
  industries,
  logos,
  navLinks,
  pricingFeatures,
  process,
  socials,
  solutions,
  stats,
  team,
  testimonials,
} from "../data/content"

export const sectionOrder = [
  "meta",
  "site",
  "hero",
  "aboutHome",
  "dialer",
  "solution",
  "workHome",
  "cases",
  "why",
  "industries",
  "process",
  "testimonials",
  "pricing",
  "faq",
  "insights",
  "articles",
  "aboutPage",
  "notFound",
] as const

export type SectionId = (typeof sectionOrder)[number]

export const sectionLabels: Record<SectionId, string> = {
  meta: "Site title",
  site: "Menu, footer, and buttons",
  hero: "Home banner",
  aboutHome: "Home about strip",
  dialer: "VICIdial dialer",
  solution: "How we help",
  workHome: "Home work heading",
  cases: "Our work stories",
  why: "Why us",
  industries: "Industries we serve",
  process: "How we work",
  testimonials: "What companies say",
  pricing: "Pricing",
  faq: "Questions",
  insights: "Home notes heading",
  articles: "Articles",
  aboutPage: "About page",
  notFound: "Missing page",
}

export const defaultSections = {
  meta: {
    title: "Phone Hustlers — Call Center",
    description:
      "Phone Hustlers is a call center on VICIdial. Our predictive dialer lets each caller make hundreds of calls in a shift. We explain the offer and book the next step.",
  },
  site: {
    cal: CAL,
    email: "inquires@phonehustler.com",
    emailLabel: "Email Us",
    phone: "+63 945 620 6543",
    phoneTel: "+639456206543",
    inquiryTitle: "Talk to us",
    inquiryText: "Tell us the offer and the list. We will run it on VICIdial and call you back.",
    inquiryButton: "Send my details",
    inquiryThanks: "We got your note. We will call you soon.",
    navButton: "Book a Call",
    menuOpen: "Menu",
    menuClose: "Close",
    exploreLabel: "Explore",
    socialsLabel: "Socials",
    copyright: "©2026 Phone Hustlers.",
    credit: "Built by Apex Technology",
    footerBlurb: "We call with VICIdial. It is a predictive dialer, so one caller can reach hundreds of people in a shift.",
    ctaTitle: "Your list can get hundreds of calls a shift",
    ctaBody: "We load the names into VICIdial. Callers talk only when someone picks up, then book the next step.",
    ctaPeople: "Our callers",
    ctaButton: "Book a Call",
    nav: navLinks.map((link) => ({ label: link.label, to: link.to })),
    footerLinks: footerExplore.map((link) => ({
      label: link.label,
      to: link.to,
      external: "external" in link && Boolean(link.external),
    })),
    socials: socials.map((link) => ({ label: link.label, to: link.to })),
  },
  hero: {
    before: "Our ",
    accent: "Dialer",
    after: " Makes Hundreds of Calls",
    sub: "It is called VICIdial. It calls multiple numbers at once. A caller talks only when someone picks up.",
    button: "Book a Call",
    banner: "/hero.jpg?v=2",
    bannerAlt: "A Phone Hustlers specialist on a headset, lit against a dark office",
    name: "Jay Benz",
    role: "CEO at Phone Hustlers",
    talk: "Talk to us",
    image: faces[0],
  },
  aboutHome: {
    tag: "About Us",
    trusted: "Trusted by the companies we call for",
    stars: "★★★★★",
    headline: "One caller used to wait through every ring. VICIdial does the waiting now.",
    fade: "Hundreds of calls in one shift.",
    button: "Read More",
    buttonTo: "/about-us",
    videoImage: img("photo-1557804506-669a67965ba0", 1400),
    quote: "In a few weeks, people who wanted help started booking time with us. The calls were easy to follow.",
    quoteName: "Alice Miller",
    quoteRole: "Owner, solar company",
    quoteImage: img("photo-1544005313-94ddf0286df2", 120),
    logos: [...logos],
    faces: [...faces],
    stats: stats.map((stat) => ({ ...stat })),
  },
  dialer: {
    tag: "The Dialer",
    title: "It calls multiple numbers at once",
    fade: "The caller only hears a hello",
    body: "A normal phone calls one number and waits. VICIdial calls multiple numbers at the same time. Rings and busy tones stay on the computer. A caller joins only when a real person picks up. That is how one person can make hundreds of calls in a shift.",
    button: "Put my list on VICIdial",
    oldLabel: "The old way",
    oldTitle: "One number at a time",
    oldPoints: [
      "Calls one number, then waits",
      "Busy tones and voicemail eat the shift",
      "Only a few dozen real talks",
    ],
    kicker: "Predictive dialer",
    name: "VICIdial",
    pitch: "Multiple numbers ring together. The first hello goes straight to a caller.",
    stat: "Hundreds",
    statLabel: "of calls from one caller, in one shift",
    lines: ["Number 1", "Number 2", "Number 3", "Number 4", "Number 5"],
    ringLabel: "Dialing",
    liveLabel: "Picked up",
    points: ["Multiple numbers at once", "You bring the list", "Reps stay in live talks"],
    steps: [
      { title: "Load the list", body: "We put the names into VICIdial. You do not buy a dialer." },
      { title: "Call them together", body: "It calls multiple numbers at once. Empty lines stay on the computer, not on the caller." },
      { title: "Talk and book", body: "The rep explains the offer and sets the next step." },
    ],
  },
  solution: {
    tag: "Our Solution",
    title: "The Dialer That Keeps",
    fade: "Every Caller Talking",
    chart: "More live answers",
    photo: img("photo-1522202176988-66273c2fd55f", 1600),
    items: solutions.map((item) => ({ title: item.title, body: item.body, icon: item.icon })),
  },
  workHome: {
    tag: "Stories",
    title: "Our Work",
    range: "Calls we made in 2025–26",
    button: "See Our Work",
    buttonTo: "/case-studies",
    side: "Real phone work on VICIdial, for the industries we serve.",
  },
  cases: {
    pageTitle: "Real calls.",
    pageIntro: "Stories from the industries we serve. Each one is a calling job, told in plain words.",
    missing: "Story not found",
    back: "Back to our work",
    industryLabel: "Industry",
    overviewLabel: "Overview",
    problemLabel: "The problem",
    didLabel: "What we did",
    moreTitle: "More of our work",
    moreBody: "Other calls we made.",
    items: cases.map((item) => ({
      ...item,
      results: item.results.map((result) => ({ ...result })),
    })),
  },
  why: {
    tag: "Why Choose Us",
    title: "Why companies choose our dialer",
    body: "VICIdial keeps every caller in a live talk. Empty rings do not eat the shift.",
    button: "Book a Call",
    cardTitle: "Hundreds of calls",
    cardBody: "Each rep can reach hundreds of people in one shift. The dialer does the waiting.",
    chipA: "VICIdial",
    chipB: "Live answers",
    photoLeft: img("photo-1506794778202-cad84cf45f1d", 800),
    photoRight: img("photo-1524504388940-b1c1722653e1", 1000),
    rowA: [...featureRowA],
    rowB: [...featureRowB],
    highlightA: "VICIdial",
    highlightB: "No empty rings",
    rightTitle: "Talk time, not wait time",
    rightBody: "The computer dials. The caller starts when a real person says hello.",
  },
  industries: {
    title: "Industries We Serve",
    items: [...industries],
  },
  process: {
    tag: "Process",
    title: "How the dialer job works",
    body: "Five simple steps. VICIdial does the ringing.",
    steps: process.map((step) => ({ title: step.title, body: step.body })),
    closeTitle: "Ready for more appointments?",
    closeButton: "Get Started",
    rating: "4.9/5",
    clients: "100+ companies we call for",
  },
  testimonials: {
    tag: "Testimonials",
    title: "What companies say about us",
    items: testimonials.map((item) => ({
      quote: item.quote,
      name: item.name,
      role: item.role,
      image: item.image,
      video: Boolean("video" in item && item.video),
    })),
  },
  pricing: {
    tag: "Pricing",
    title: "Simple, affordable plans",
    fade: "made for every business",
    plan: "Calling Team",
    body: "A trained group on VICIdial, calling for your business every day.",
    price: "$6,000",
    period: "/Monthly",
    button: "Book a Call",
    includes: "Includes",
    features: [...pricingFeatures],
  },
  faq: {
    tag: "FAQ",
    title: "Questions people ask first",
    items: faqs.map((item) => ({ ...item })),
  },
  insights: {
    tag: "Insights",
    title: "Simple notes on VICIdial and better calls",
  },
  articles: {
    pageTitle: "Simple notes on VICIdial and better calls",
    pageIntro: "Short lessons from the dialer and the calls we make every day.",
    missing: "Article not found",
    back: "Back to articles",
    items: articles.map(({ content, ...article }) => ({
      ...article,
      body: content.join("\n\n"),
    })),
  },
  aboutPage: {
    title: "About us.",
    intro: "Phone Hustlers is a call center. We use VICIdial, a predictive dialer, so each caller can make hundreds of calls in one shift.",
    button: "Book a Call",
    storyTag: "Our Story",
    story:
      "We started because people asked for help and nobody called them back. One phone at a time was too slow. VICIdial rings many numbers at once, and a caller talks only when a person picks up.",
    missionTag: "Our Mission",
    missionTitle: "Our Mission",
    mission: "Put your list on a predictive dialer. Every live answer should end with a booked time, a clear no, or a simple note.",
    teamTag: "Team",
    teamTitle: "The team on the phones",
    teamBody: "The people who write the scripts, make the calls, and tell you what happened.",
    team: team.map((member) => ({ ...member })),
  },
  notFound: {
    code: "404",
    message: "This page is not here. Let’s go back home.",
    button: "Back to Home",
  },
}

export type Sections = typeof defaultSections

export function mergeSection<T>(base: T, extra: unknown): T {
  if (Array.isArray(base)) return (Array.isArray(extra) ? extra : base) as T
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
    if (extra && typeof extra === "object" && !Array.isArray(extra)) {
      for (const [key, value] of Object.entries(extra as Record<string, unknown>)) {
        out[key] = key in out ? mergeSection(out[key], value) : value
      }
    }
    return out as T
  }
  return (extra === undefined ? base : extra) as T
}

export function mergeSections(remote: { id: string; data: unknown }[]): Sections {
  const next = structuredClone(defaultSections) as Sections
  for (const row of remote) {
    if (!(row.id in next)) continue
    const id = row.id as SectionId
    const merged = mergeSection(next[id], row.data)
    ;(next as Record<string, unknown>)[id] = merged
  }
  return next
}
