export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const CAL = "https://cal.com/"

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Industries", to: "/#services" },
  { label: "Our Work", to: "/case-studies" },
  { label: "About", to: "/about-us" },
  { label: "Articles", to: "/blog" },
]

export const footerExplore = [
  { label: "Industries", to: "/#services" },
  { label: "Our Work", to: "/case-studies" },
  { label: "Process", to: "/#steps-cta-section" },
  { label: "About", to: "/about-us" },
  { label: "Contact Us", to: CAL, external: true },
  { label: "404", to: "/404" },
]

export const socials = [
  { label: "X/Twitter", to: "https://x.com/home" },
  { label: "Youtube", to: "https://www.youtube.com/" },
  { label: "Instagram", to: "https://www.instagram.com/" },
  { label: "Linkedin", to: "https://www.linkedin.com" },
]

export const logos = ["Solar", "Medicare", "Auto Insurance", "Business Loans", "Final Expense", "Medical Alert", "Security"]

export const featureRowA = ["VICIdial", "Live answers", "Hundreds a shift"]
export const featureRowB = ["No empty rings", "Kind callers", "More bookings"]

export const stats = [
  { label: "Calling teams trained", value: 1500, suffix: "+", prefix: "" },
  { label: "More appointments booked", value: 87, suffix: "%", prefix: "" },
  { label: "Sales our callers helped", value: 30, suffix: "M+", prefix: "$" },
  { label: "Calls handled", value: 4.2, suffix: "M", prefix: "" },
]

export const solutions = [
  {
    title: "VICIdial dials for us",
    body: "It is a predictive dialer. It calls multiple numbers at once. A caller joins only when a real person picks up.",
    icon: "page",
  },
  {
    title: "Hundreds of calls a shift",
    body: "One rep is not stuck listening to rings. They spend the shift talking, so one person can reach hundreds of people.",
    icon: "layers",
  },
  {
    title: "We book the next step",
    body: "A good call ends with a time on the calendar, a clear no, or a note about what the person still needs.",
    icon: "route",
  },
] as const

export const industries = [
  "Merchant Cash Advance",
  "Health Insurance",
  "Business Insurance (General Liability & Workers Comp)",
  "Life Insurance",
  "Final Expense Insurance",
  "Auto Insurance",
  "Medical Alert",
  "Travel/Vacation",
  "Solar",
  "Roofing",
  "HVAC",
  "Home Improvement",
  "Plumbing",
  "Medicare",
] as const

export const leadDeliveryOptions = [
  {
    title: "Text message directly to you?",
    body: "Lead details sent to your phone by SMS—the name, number, and notes from the call.",
    image: img("photo-1516321318423-f06f85e504b3", 1200),
  },
  {
    title: "Transfer the call live to you?",
    body: "We qualify the customer on the line, then transfer the live call to you or your sales team.",
    image: img("photo-1556761175-5973dc0f32e7", 1200),
  },
  {
    title: "Set a telephone callback appointment?",
    body: "We schedule a time for you to call them back, or for them to expect your call.",
    image: img("photo-1521791136064-7986c2920216", 1200),
  },
  {
    title: "Set a sit-down appointment?",
    body: "In-person or virtual sit-downs booked on your calendar with a confirmed date and time.",
    image: img("photo-1504384308090-c894fdcc538d", 1200),
  },
] as const

export const process = [
  {
    title: "Learn the offer",
    body: "We learn what you sell, who it is for, and what a good call sounds like.",
    dots: 1,
  },
  {
    title: "Write the words",
    body: "We write a short script. Greeting, one clear offer, two questions, and a way to book a time.",
    dots: 2,
  },
  {
    title: "Train the callers",
    body: "The team practices until the call feels natural. If they stumble, we fix the words.",
    dots: 3,
  },
  {
    title: "Make the calls",
    body: "We load your list into VICIdial. The dialer rings the numbers. A caller starts talking when a person picks up.",
    dots: 4,
  },
  {
    title: "Show the results",
    body: "Each week you see who answered, who booked, and who said no.",
    dots: 5,
  },
]

export const testimonials = [
  {
    quote:
      "Our booked visits more than doubled. People finally understood the solar offer because someone explained it out loud.",
    name: "James Walker",
    role: "Owner, solar company",
    image: img("photo-1560250097-0b93528c311a", 900),
  },
  {
    quote:
      "Same-day callbacks changed our pipeline. The scripts were clear and the appointments actually showed up.",
    name: "David Clarke",
    role: "Owner, Aone Insurance",
    image: img("photo-1472099645785-5658abf4ff4e", 900),
  },
  {
    quote:
      "Within a few weeks we had a steady list of people ready to talk about a loan. The calls were clear and never pushy.",
    name: "Michael Turner",
    role: "Owner, business loans",
    image: img("photo-1519085360753-af0119f7cbe7", 900),
  },
]

export const pricingFeatures = [
  "VICIdial on every shift",
  "Hundreds of calls from each caller",
  "A team that learns your offer",
  "A short script in plain words",
  "Notes after each call",
  "Appointments put on your calendar",
  "A simple weekly report",
]

export const faqs = [
  {
    q: "How many calls can one person make?",
    a: "A minimum of 800 calls per 8-hour shift.",
  },
  {
    q: "Do you only make phone calls?",
    a: "Yes. Phone Hustlers is a call center. VICIdial dials. We talk, we listen, and we book the next step.",
  },
  {
    q: "Who do you call for?",
    a: "Companies in the industries on this site—insurance, MCA, solar, Medicare, medical alert, travel, and home services like roofing, HVAC, plumbing, and more.",
  },
  {
    q: "Do I need my own dialer or my own callers?",
    a: "No. We bring VICIdial and the callers. You tell us the offer and give us the list.",
  },
  {
    q: "What happens on a call?",
    a: "We say who we are, explain the offer in one or two sentences, answer questions, and ask if they want a time to talk more.",
  },
]

export const team = [
  { name: "Jay Bendebel", role: "Founder & CEO", image: "/jay-benz.jpg" },
  { name: "Paul Bacay", role: "Director of Operations", image: "/director-of-operations.jpg" },
  { name: "Sofia Bennett", role: "Head of the Calling Team", image: img("photo-1573496359142-b8d87734a5a2", 800) },
  { name: "Marcus Ellery", role: "Script Writer", image: img("photo-1519085360753-af0119f7cbe7", 800) },
  { name: "Elena Cross", role: "Call Quality Lead", image: img("photo-1580489944761-15a19d654956", 800) },
  { name: "Isabella Reed", role: "Client Care", image: img("photo-1544005313-94ddf0286df2", 800) },
  { name: "Camila Torres", role: "Office Manager", image: img("photo-1438761681033-6461ffad8d80", 800) },
]

export const faces = [
  "/jay-benz.jpg",
  img("photo-1573496359142-b8d87734a5a2", 200),
  img("photo-1519085360753-af0119f7cbe7", 200),
  img("photo-1580489944761-15a19d654956", 200),
]

export type Article = {
  slug: string
  title: string
  date: string
  image: string
  alt: string
  content: string[]
}

export const articles: Article[] = [
  {
    slug: "what-a-predictive-dialer-does",
    title: "How Our Predictive Dialer Works",
    date: "2026-03-02T23:00:00.000Z",
    image: "/filipino-call-center.jpg?v=1",
    alt: "Phone Hustlers calling team on headsets",
    content: [
      "A normal phone wastes the shift. The caller waits through rings, busy signals, and voicemail.",
      "Our predictive dialer calls many numbers at the same time.",
      "A caller only hears a voice when a real person picks up.",
      "That is why one rep can make hundreds of calls in a single shift.",
      "More talk time means more people hear the offer, and more of them book the next step.",
    ],
  },
  {
    slug: "why-people-hang-up",
    title: "Why People Hang Up",
    date: "2026-02-11T23:00:00.000Z",
    image: img("photo-1553877522-43269d4ea984", 1200),
    alt: "Call center agents at work",
    content: [
      "People hang up when the first sentence is confusing.",
      "Say three things, then stop talking:",
      "Who you are\n\nWhy you called\n\nWhat happens next",
      "If the caller has to think too hard, the person on the other end will hang up.",
      "This is true for insurance, loans, solar, and every other industry we call for.",
    ],
  },
  {
    slug: "a-script-anyone-can-follow",
    title: "A Script Anyone Can Follow",
    date: "2026-02-04T23:00:00.000Z",
    image: img("photo-1556761175-5973dc0f32e7", 1200),
    alt: "Team reviewing call scripts together",
    content: [
      "A good script is short.",
      "It has four parts:",
      "A greeting\n\nThe offer in one sentence\n\nTwo easy questions\n\nA way to book a time",
      "We write a different script for each industry. A Medicare call should not sound like a solar call.",
      "If a line feels stiff, we change it until a caller can say it out loud without reading.",
    ],
  },
  {
    slug: "call-the-right-people",
    title: "Call the Right People",
    date: "2026-01-07T23:00:00.000Z",
    image: img("photo-1516321318423-f06f85e504b3", 1200),
    alt: "Smartphone with lead notification from a call",
    content: [
      "A long call list is not a good call list.",
      "We only call people who might want the offer.",
      "A homeowner might want solar. A shop owner might want a business loan. A grandparent might want a medical alert.",
      "Calling the wrong person wastes their time and yours.",
      "Before the first dial, we agree on who belongs on the list.",
    ],
  },
  {
    slug: "what-a-good-call-sounds-like",
    title: "What a Good Call Sounds Like",
    date: "2025-12-28T23:00:00.000Z",
    image: img("photo-1573496359142-b8d87734a5a2", 1200),
    alt: "Caller on a headset having a conversation",
    content: [
      "A good call is calm.",
      "Slow voice. Short sentences. No pushy words.",
      "Answer the question they asked. Then ask if they want a time on the calendar.",
      "A clear no is a good result. It means we did not waste the next appointment.",
      "A booked time is a better result. That is the job.",
    ],
  },
  {
    slug: "tell-the-company-the-truth",
    title: "Tell the Company the Truth",
    date: "2025-12-16T23:00:00.000Z",
    image: img("photo-1551288049-bebda4e38f71", 1200),
    alt: "Weekly call results on a dashboard",
    content: [
      "Every week we share three numbers.",
      "How many people answered.\n\nHow many booked a time.\n\nHow many said no.",
      "We do not hide the nos. They show us which sentence to fix.",
      "Simple numbers help you decide what to do next.",
    ],
  },
]

export type CaseStudy = {
  slug: string
  name: string
  date: string
  category: string
  image: string
  teaser: string
  overview: string
  industry: string
  challengeIntro: string
  challenge: string
  strategyIntro: string
  strategy: string
  results: { label: string; value: string }[]
}

export const cases: CaseStudy[] = [
  {
    slug: "kroma",
    name: "Kroma",
    date: "2026-03-19T00:00:00.000Z",
    category: "Final Expense",
    image: img("photo-1497366216548-37526070297c", 1400),
    teaser: "Called families about final expense insurance and booked more times to talk.",
    overview: "Kroma helps families look at small life insurance plans for final expenses.",
    industry: "Final Expense Insurance",
    challengeIntro: "People asked for information, then nobody called them back.",
    challenge:
      "Forms came in every day. By the time someone called, the family had moved on or forgotten why they asked. The few calls that did happen used long, confusing words.",
    strategyIntro: "We called the same day, in plain words.",
    strategy:
      "We wrote a short script, trained a small team, and called new requests the day they came in. Callers explained the plan in one sentence and offered a time to talk with a licensed person.",
    results: [
      { label: "more appointments", value: "3.4x" },
      { label: "fewer missed calls", value: "42%" },
      { label: "people who stayed on the line", value: "5.1 in 10" },
    ],
  },
  {
    slug: "powersurge",
    name: "PowerSurge",
    date: "2025-06-04T00:00:00.000Z",
    category: "Solar",
    image: img("photo-1444012830796-83db7e1db0d3", 1400),
    teaser: "Called homeowners about solar and booked more visits to the house.",
    overview: "PowerSurge puts solar on homes and needed people to show up for a visit.",
    industry: "Solar",
    challengeIntro: "Homeowners raised a hand, then went quiet.",
    challenge:
      "The company had names of people who wanted a solar quote. Those people did not answer a long email. They needed a short phone call that explained the visit.",
    strategyIntro: "We called and booked a time at the house.",
    strategy:
      "Callers said who they were, explained that a visit is free and takes about an hour, and offered two times. If someone said no, we wrote it down and did not keep pushing.",
    results: [
      { label: "more booked visits", value: "4.2x" },
      { label: "jobs from those visits", value: "$1.1M" },
      { label: "more people who showed up", value: "38%" },
    ],
  },
  {
    slug: "asterisk",
    name: "Asterisk",
    date: "2025-05-04T00:00:00.000Z",
    category: "Medicare",
    image: img("photo-1552664730-d307ca884978", 1400),
    teaser: "Called people with Medicare questions and set more times with an agent.",
    overview: "Asterisk helps people compare Medicare supplement plans.",
    industry: "Medicare Supplement",
    challengeIntro: "Older adults had questions and no one to ask.",
    challenge:
      "People wanted a simple answer about their plan. The old calls were fast and full of plan codes. Many folks hung up before they understood the offer.",
    strategyIntro: "We slowed the call down and used everyday words.",
    strategy:
      "The script avoided plan codes. Callers asked what the person already had, explained the next conversation in one sentence, and booked a time with a licensed agent.",
    results: [
      { label: "more good appointments", value: "3x" },
      { label: "more people who showed up", value: "47%" },
      { label: "more plans started", value: "2.5x" },
    ],
  },
  {
    slug: "grotesks",
    name: "Grotesks",
    date: "2026-03-26T00:00:00.000Z",
    category: "Business Loans",
    image: img("photo-1523398002811-999ca8dec234", 1400),
    teaser: "Called shop owners the same day and helped more of them finish a loan request.",
    overview: "Grotesks finds business loans for shop owners.",
    industry: "Business Loans",
    challengeIntro: "Owners filled out a form and never heard back.",
    challenge:
      "By the next day, many owners had called a different company. The ones who were reached got a speech they could not follow.",
    strategyIntro: "We called the same day and walked through one next step.",
    strategy:
      "Callers confirmed the business, explained that the next step was a short application, and stayed on the line while the owner started it. If they were busy, we booked a better time.",
    results: [
      { label: "more finished applications", value: "3.8x" },
      { label: "more yes answers", value: "52%" },
      { label: "shorter calls", value: "24%" },
    ],
  },
]

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function articleBySlug(slug: string) {
  return articles.find((item) => item.slug === slug)
}

export function caseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug)
}
