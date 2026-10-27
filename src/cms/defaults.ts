import {
  CAL,
  articles,
  cases,
  faces,
  faqs,
  footerExplore,
  leadDeliveryOptions,
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
  "teamHome",
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
  workHome: "Home lead delivery",
  cases: "Our work stories",
  why: "Why us",
  industries: "Industries we serve",
  process: "How we work",
  testimonials: "What companies say",
  pricing: "Pricing",
  faq: "Questions",
  teamHome: "Home team",
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
    inquiryText:
      "Let us know exactly what you offer, and what you want to gain by using our phone services.",
    inquiryAside: "Contact us any time, 24/7",
    inquiryButton: "Send my details",
    inquiryThanks: "We got your note. We will call you soon.",
    navButton: "Book a Call",
    menuOpen: "Menu",
    menuClose: "Close",
    exploreLabel: "Explore",
    socialsLabel: "Socials",
    copyright: "©2026 Phone Hustlers.",
    credit: "Built by Apex Technology",
    footerBlurb:
      "Every business is different. We take the time to understand your goals, reach the right audience, and create an approach that works for your business.",
    ctaTitle: "Turn More Conversations Into Customers",
    ctaBody:
      "Every call is an opportunity to grow your business. We focus on reaching the right people, building meaningful connections, and turning promising conversations into real opportunities.\n\nPhone Hustlers — More Connections. More Opportunities. More Growth.",
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
    kicker: "Phone Hustlers",
    before: "Finding You ",
    accent: "Customers That Convert",
    after: ".",
    lead: "We know the phone. We know the game. And we know how to get results.",
    sub: "",
    button: "Book a Call",
    banner: "/hero.jpg?v=2",
    bannerAlt: "A Phone Hustlers specialist on a headset, lit against a dark office",
    name: "Jay Bendebel",
    role: "CEO at Phone Hustlers",
    talk: "Talk to us",
    image: faces[0],
  },
  aboutHome: {
    tag: "About Us",
    trusted: "Trusted by the companies we call for",
    stars: "★★★★★",
    headline:
      "Stop dialing one number at a time. Our automated calling system handles hundreds of calls per shift, helping you maximize your return on investment.",
    fade: "Phone Hustlers — Less Waiting. More Calling. More Conversions.",
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
    title: "Multiple numbers called at once",
    fade: "",
    body: "A normal phone calls one number and waits. VICIdial calls multiple numbers at the same time. Rings and busy tones stay on the computer. A caller joins only when a real person picks up. That is how one person can make hundreds of calls in a shift.",
    photo: img("photo-1556761175-5973dc0f32e7", 1600),
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
    pitch: 'Our VICIdial calls multiple numbers at once and our caller only hears “HOLLO”.',
    stat: "Hundreds",
    statLabel: "of calls from one caller, in one shift",
    lines: ["Number 1", "Number 2", "Number 3", "Number 4", "Number 5"],
    ringLabel: "Dialing",
    liveLabel: "Picked up",
    points: [
      "Multiple numbers called at once",
      "Skips most answering machines",
      "Skips dead numbers",
      "Live customer call every 30 to 45 seconds",
    ],
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
    photo: "/filipino-call-center.jpg?v=1",
    items: solutions.map((item) => ({ title: item.title, body: item.body, icon: item.icon })),
  },
  workHome: {
    tag: "Your leads",
    title: "How to receive your leads & appointments",
    notes:
      "Special notes: this is how you receive each appointment or customer lead from our callers. Choose the handoff that fits your business.",
    intro: "How do you want your leads?",
    options: leadDeliveryOptions.map((item) => ({ ...item })),
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
    title: "Why Choose Phone Hustlers?",
    subtitle: "American Understanding with the Filipino Drive.",
    body: "My name is Jay, and I grew up in Atlanta, Georgia. Having lived in the United States, I understand American business culture firsthand. I know how businesses operate overseas, how customers communicate, and, most importantly, how they expect to be treated.\n\nWith over 15 years of experience in the BPO industry, I bring my American background and business knowledge together with the hard work and dedication of my team in the Philippines. To me, great customer service is more than just reading a script. It's about understanding people, building trust, and making sure every customer has a positive experience with your business.",
    button: "Book a Call",
    photoRight: "/jay-bendebel.jpg?v=1",
  },
  industries: {
    title: "Industries We Serve",
    items: [...industries],
  },
  process: {
    tag: "Process",
    title: "5 simple steps to get started!",
    body: "From your first conversation with us to live dialing on your list.",
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
  teamHome: {
    tag: "Team",
    title: "The team on the phones",
    items: team.map((member) => ({ ...member })),
  },
  articles: {
    pageTitle: "Simple notes on better calls",
    pageIntro: "Short lessons from our call center and the leads we help you win.",
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
