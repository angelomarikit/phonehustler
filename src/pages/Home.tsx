import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useSite } from "../cms/SiteProvider"
import { useInquiry } from "../components/InquiryModal"
import { Button, CountUp, Dots, Faces, Icon, LineChart, Marquee, Reveal, SectionTag } from "../components/ui"

export function HomePage() {
  return (
    <>
      <HeroStage />
      <Dialer />
      <Solution />
      <LeadDelivery />
      <Why />
      <Services />
      <Process />
      <Testimonials />
      <Faq />
      <TeamHome />
    </>
  )
}

function iconName(icon: string): "page" | "layers" | "route" {
  return icon === "layers" || icon === "route" ? icon : "page"
}

function HeroStage() {
  const { sections } = useSite()
  const hero = sections.hero
  const openInquiry = useInquiry()
  const stage = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-14%"])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-6%"])

  return (
    <div ref={stage} className="relative">
      <section className="sticky top-0 z-0 h-svh overflow-hidden bg-[#07111c]">
        <motion.img
          src={hero.banner}
          alt={hero.bannerAlt}
          style={{ y: imageY }}
          className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.12)_34%,transparent_58%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/55 to-transparent" />
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 flex h-svh w-full flex-col items-start justify-end gap-8 px-5 pt-28 pb-16 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20"
        >
          <div className="max-w-xl">
            {"kicker" in hero && hero.kicker ? (
              <p className="text-[11px] font-semibold tracking-[0.28em] text-white/70 uppercase md:text-xs">{hero.kicker}</p>
            ) : null}
            <h1 className="mt-3 font-display text-[2.6rem] font-bold tracking-[-0.045em] text-balance text-white md:text-6xl md:leading-[1.02]">
              {hero.before}
              <span className="text-brand">{hero.accent}</span>
              {hero.after}
            </h1>
            {"lead" in hero && hero.lead ? (
              <p className="mt-4 max-w-md text-base leading-snug font-medium text-white/90 md:text-lg">{hero.lead}</p>
            ) : null}
            {hero.sub ? (
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 md:text-[15px]">{hero.sub}</p>
            ) : null}
            <a href={`tel:${sections.site.phoneTel}`} className="mt-3 inline-block text-sm font-semibold text-white">
              {sections.site.phone}
            </a>
            <div className="mt-6">
              <Button onClick={openInquiry} variant="ink">
                {hero.button}
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={openInquiry}
            className="flex w-full max-w-[340px] items-center gap-3 rounded-2xl bg-white p-2.5 text-left shadow-[0_16px_40px_rgba(2,26,63,0.18)]"
          >
            <img src={hero.image} alt={hero.name} className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover object-[center_20%]" />
            <span className="min-w-0">
              <span className="block font-semibold text-brand-deep">{hero.name}</span>
              <span className="mt-0.5 block text-xs text-mute">{hero.role}</span>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-deep px-2.5 py-1 text-[11px] font-medium text-white">
                {hero.talk}
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </button>
        </motion.div>
      </section>
      <div className="relative z-10 mx-3 overflow-hidden rounded-t-[32px] bg-paper shadow-[0_-30px_80px_rgba(0,0,0,0.28)] md:mx-10 md:rounded-t-[40px] lg:mx-14">
        <AboutBlock />
      </div>
    </div>
  )
}

function AboutBlock() {
  const about = useSite().sections.aboutHome
  return (
    <section className="pb-8">
      <div className="bg-white py-5">
        <Marquee items={about.logos} />
      </div>
      <div className="mx-auto max-w-[760px] px-4 py-24 text-center">
        <SectionTag>{about.tag}</SectionTag>
        <div className="mt-8 flex flex-col items-center gap-2">
          <Faces images={about.faces} />
          <p className="text-sm text-mute">{about.trusted}</p>
          <p className="text-sm tracking-[0.2em] text-brand">{about.stars}</p>
        </div>
        <div className="mt-8 space-y-4 text-balance">
          <p className="font-display text-2xl font-medium leading-snug tracking-[-0.03em] md:text-4xl md:leading-[1.15]">
            {about.headline}
          </p>
          {about.fade ? (
            <p className="font-display text-xl font-medium tracking-[-0.02em] text-ink/45 md:text-3xl">{about.fade}</p>
          ) : null}
        </div>
        <div className="mt-8">
          <Button to={about.buttonTo} variant="ink">
            {about.button}
          </Button>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1000px] items-stretch gap-4 px-4 md:grid-cols-[1.35fr_0.8fr] md:px-6">
        <Reveal className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-ink">
          <img src={about.videoImage} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink"
            aria-label="Play"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" fill="currentColor">
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          </button>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col justify-between rounded-[28px] bg-white p-7">
          <div>
            <p className="text-sm tracking-[0.2em] text-brand">{about.stars}</p>
            <p className="mt-4 font-display text-xl leading-snug tracking-[-0.03em]">“{about.quote}”</p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <img src={about.quoteImage} alt="" className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium">{about.quoteName}</p>
              <p className="text-xs text-mute">{about.quoteRole}</p>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto grid max-w-[1000px] gap-3 px-4 py-4 md:grid-cols-4 md:px-6">
        {about.stats.map((stat) => (
          <div key={stat.label} className="rounded-[24px] bg-white px-5 py-6">
            <p className="font-display text-4xl font-semibold tracking-[-0.04em]">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-body">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function LiveLines({
  lines,
  ringLabel,
  liveLabel,
}: {
  lines: string[]
  ringLabel: string
  liveLabel: string
}) {
  const reduce = useReducedMotion()
  const [live, setLive] = useState(0)

  useEffect(() => {
    if (reduce || lines.length < 2) return
    const id = window.setInterval(() => setLive((current) => (current + 1) % lines.length), 1100)
    return () => window.clearInterval(id)
  }, [reduce, lines.length])

  return (
    <ul className="mt-6 space-y-2" aria-hidden="true">
      {lines.map((line, index) => {
        const connected = index === live
        return (
          <li
            key={line}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors duration-500 ${
              connected ? "bg-brand text-white" : "bg-white/15 text-white"
            }`}
          >
            <span className="flex items-center gap-2 font-medium">
              <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-white" : "animate-pulse bg-brand"}`} />
              {line}
            </span>
            <span className="text-xs">{connected ? liveLabel : ringLabel}</span>
          </li>
        )
      })}
    </ul>
  )
}

function Dialer() {
  const dialer = useSite().sections.dialer
  const openInquiry = useInquiry()

  return (
    <section id="dialer" className="scroll-mt-28 mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24">
      <Reveal>
        <SectionTag>{dialer.tag}</SectionTag>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.03em] text-balance md:text-6xl md:leading-[1.05]">
          {dialer.title}
          {dialer.fade ? <span className="block text-ink/50">{dialer.fade}</span> : null}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-body">{dialer.body}</p>
      </Reveal>

      {"photo" in dialer && dialer.photo ? (
        <Reveal className="mt-10 overflow-hidden rounded-[28px]">
          <img src={dialer.photo as string} alt="" className="h-56 w-full object-cover object-[center_35%] md:h-72" />
        </Reveal>
      ) : null}

      <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <Reveal className="flex flex-col justify-between rounded-[28px] bg-white p-7 md:p-8">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-mute uppercase">{dialer.oldLabel}</p>
            <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] text-ink/70">{dialer.oldTitle}</h3>
            <ul className="mt-6 space-y-3">
              {dialer.oldPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-body">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/25" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 font-display text-5xl font-semibold tracking-[-0.04em] text-ink/15">Wait. Ring. Wait.</p>
        </Reveal>

        <Reveal delay={0.08} className="relative overflow-hidden rounded-[28px] bg-brand-deep p-7 text-white md:p-10">
          <div className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <img src="/logo-light.png?v=3" alt="Phone Hustlers" className="h-10 w-auto" />
              <p className="mt-8 text-sm font-medium tracking-[0.12em] text-brand uppercase">{dialer.kicker}</p>
              <h3 className="mt-2 font-display text-5xl font-semibold tracking-[-0.045em]">{dialer.name}</h3>
              {dialer.pitch ? (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">{dialer.pitch}</p>
              ) : null}
              <p className="mt-8 font-display text-5xl font-semibold tracking-[-0.045em] text-brand">{dialer.stat}</p>
              <p className="mt-1 max-w-[14rem] text-sm text-white/70">{dialer.statLabel}</p>
              <div className="mt-8">
                <Button onClick={openInquiry} variant="secondary">
                  {dialer.button}
                </Button>
              </div>
            </div>
            <div>
              <LiveLines lines={dialer.lines} ringLabel={dialer.ringLabel} liveLabel={dialer.liveLabel} />
              <ul className="mt-5 space-y-2">
                {dialer.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-snug text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {dialer.steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.06} className="rounded-[24px] bg-white p-6">
            <p className="font-display text-sm font-semibold tracking-[0.14em] text-brand">0{index + 1}</p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Solution() {
  const solution = useSite().sections.solution
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-16 md:px-6 md:py-24">
      <Reveal>
        <SectionTag>{solution.tag}</SectionTag>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-[-0.03em] md:text-6xl md:leading-[1.05]">
          {solution.title}
          <span className="block text-ink/50">{solution.fade}</span>
        </h2>
      </Reveal>
      <div className="relative mt-10">
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src={solution.photo}
            alt=""
            className="h-[420px] w-full object-cover object-[center_35%] md:h-[480px]"
          />
          <div className="absolute bottom-5 left-5 w-[min(100%-2.5rem,340px)] rounded-[22px] border border-white/25 bg-white/15 p-4 text-white backdrop-blur-md">
            <p className="text-sm font-medium">{solution.chart}</p>
            <div className="mt-2 h-36">
              <LineChart />
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-4 grid gap-6 rounded-[24px] bg-ink p-6 text-white md:grid-cols-3 md:p-8">
          {solution.items.map((item) => (
            <div key={item.title}>
              <div className="mb-3 text-white/80">
                <Icon name={iconName(item.icon)} />
              </div>
              <h3 className="font-display text-lg font-medium tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeadDelivery() {
  const work = useSite().sections.workHome
  const options = "options" in work && Array.isArray(work.options) ? work.options : []
  const notes = "notes" in work && work.notes ? String(work.notes) : ""
  return (
    <section id="leads" className="scroll-mt-28 mx-auto max-w-[1120px] px-4 py-16 md:px-6">
      <Reveal className="max-w-3xl">
        <SectionTag>{work.tag}</SectionTag>
        <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.03em] text-balance md:text-6xl">{work.title}</h2>
        {notes ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body md:text-base">{notes}</p> : null}
        {"intro" in work && work.intro ? (
          <p className="mt-6 font-display text-2xl font-medium tracking-[-0.03em] text-brand-deep md:text-3xl">{work.intro}</p>
        ) : null}
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {options.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_30px_rgba(2,26,63,0.06)]">
              <div className="aspect-[16/10] overflow-hidden bg-paper">
                {"image" in item && item.image ? (
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-mute">Image coming soon</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-brand-deep">{item.title}</h3>
                {item.body ? <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p> : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Why() {
  const why = useSite().sections.why
  const openInquiry = useInquiry()
  const photo = "photoRight" in why && why.photoRight ? String(why.photoRight) : "/jay-bendebel.jpg?v=1"
  return (
    <section className="mx-auto grid max-w-[1120px] gap-10 px-4 py-10 md:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:py-16">
      <Reveal>
        <SectionTag>{why.tag}</SectionTag>
        <h2 className="mt-5 max-w-lg font-display text-4xl font-medium tracking-[-0.03em] text-balance md:text-5xl">{why.title}</h2>
        {"subtitle" in why && why.subtitle ? (
          <p className="mt-4 max-w-lg text-lg font-medium text-brand-deep">{why.subtitle}</p>
        ) : null}
        <p className="mt-5 max-w-lg whitespace-pre-line text-sm leading-relaxed text-body md:text-base">{why.body}</p>
        <div className="mt-8">
          <Button onClick={openInquiry} variant="ink">
            {why.button}
          </Button>
        </div>
      </Reveal>
      <Reveal delay={0.06} className="relative min-h-[420px] overflow-hidden rounded-[28px] lg:min-h-[520px]">
        <img src={photo} alt="Jay Bendebel" className="absolute inset-0 h-full w-full object-cover object-top" />
      </Reveal>
    </section>
  )
}

function IndustryIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 text-brand" aria-hidden="true">
      {name === "Merchant Cash Advance" && (
        <path fill="currentColor" fillRule="evenodd" d="M6 15h36a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V17a2 2 0 0 1 2-2Zm14 10a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
      )}
      {name === "Business Loans" && (
        <path fill="currentColor" d="M6 20 24 8l18 12v3H6v-3Zm4 5h5v11h-5V25Zm9 0h5v11h-5V25Zm9 0h5v11h-5V25Zm9 0h5v11h-5V25ZM4 38h40v4H4v-4Z" />
      )}
      {name === "Health Insurance" && (
        <path fill="currentColor" d="M24 42s-13-8-13-17a7.5 7.5 0 0 1 13-5 7.5 7.5 0 0 1 13 5c0 9-13 17-13 17Zm-1.5-24h3v5h5v3h-5v5h-3v-5h-5v-3h5v-5Z" />
      )}
      {name === "Life Insurance" && (
        <path fill="currentColor" fillRule="evenodd" d="M24 4a16 16 0 1 0 0 32 16 16 0 0 0 0-32Zm0 6a10 10 0 1 1 0 20 10 10 0 0 1 0-20ZM18 38h12v4H18v-4Z" />
      )}
      {name === "Final Expense Insurance" && (
        <path fill="currentColor" d="M28 6h8l6 8-5 4-7-8h-2V6ZM14 20h22l-2 4H16l-2-4Zm2 6h18v3H16v-3Zm1 5h16l2 9H15l2-9Z" />
      )}
      {name === "Auto Insurance" && (
        <path fill="currentColor" d="M9 27 14 16h20l5 11v8h-3v4h-5v-4H17v4h-5v-4H9v-8Zm6-7 2 6h14l2-6H15Zm2 10a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 17 30Zm14 0a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" />
      )}
      {name === "Medical Alert" && (
        <path fill="currentColor" d="M18 8h12v6h8v20H10V14h8V8Zm4 12v4h-4v4h4v4h4v-4h4v-4h-4v-4h-4Z" />
      )}
      {name === "Reverse Mortgage" && (
        <path fill="currentColor" d="M6 22 24 8l18 14v18H28V28h-8v12H6V22Z" />
      )}
      {name === "Travel/Vacation" && (
        <path fill="currentColor" d="m6 30 16-6 4-14 4 2-3 12 14 5 3-3 3 2-7 12-4-1-5-8-8 3-2-4Z" />
      )}
      {name === "Solar" && (
        <path fill="currentColor" d="M22 4h4v6h-4V4Zm0 34h4v6h-4v-6ZM4 22h6v4H4v-4Zm34 0h6v4h-6v-4ZM10.2 10.2l4.2 4.2-2.8 2.8-4.2-4.2 2.8-2.8Zm26.2 26.2 4.2 4.2-2.8 2.8-4.2-4.2 2.8-2.8ZM37.8 10.2l2.8 2.8-4.2 4.2-2.8-2.8 4.2-4.2ZM12.2 33.2l2.8 2.8-4.2 4.2-2.8-2.8 4.2-4.2ZM24 15a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z" />
      )}
      {name === "Tax Settlement" && (
        <path fill="currentColor" d="M14 6h16l8 8v26H14V6Zm14 2.5V16h7.5L28 8.5ZM18 22h12v3H18v-3Zm0 6h12v3H18v-3Zm0 6h8v3h-8v-3Z" />
      )}
      {(name === "Medicare Supplement" || name === "Medicare") && (
        <path fill="currentColor" d="M20 6h8v14h14v8H28v14h-8V28H6v-8h14V6Z" />
      )}
      {(name === "Business Insurance (GL & WC)" ||
        name === "Business Insurance (General Liability & Workers Comp)") && (
        <path fill="currentColor" d="M24 4 8 12v12c0 9 6.2 15.2 16 18 9.8-2.8 16-9 16-18V12L24 4Zm-2 10h4v8h-4v-8Zm-8 0h4v8h-4v-8Z" />
      )}
      {name === "Roofing" && (
        <path fill="currentColor" d="M4 22 24 8l20 14v14H4V22Zm8 4h8v8h-8v-8Z" />
      )}
      {name === "HVAC" && (
        <path fill="currentColor" d="M24 10a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />
      )}
      {name === "Home Improvement" && (
        <path fill="currentColor" d="M8 28 22 14l6 6-14 14H8v-6Zm20-16-4-4-8 8 4 4 8-8Z" />
      )}
      {name === "Plumbing" && (
        <path fill="currentColor" d="M14 10h20v6H28v14h-6V16H14v-4ZM8 34h32v4H8v-4Z" />
      )}
      {name === "Home/Business Security" && (
        <path fill="currentColor" d="M24 4 8 12v12c0 9 6.2 15.2 16 18 9.8-2.8 16-9 16-18V12L24 4Z" />
      )}
      {name === "Pain Relief" && (
        <path fill="currentColor" d="M16 14c0-6 4-10 8-10s8 4 8 10v4h6v8c0 8-6 14-14 14h-8c-8 0-14-6-14-14v-8h6v-4Zm6 8v4h-4v4h4v4h4v-4h4v-4h-4v-4h-4Z" />
      )}
      {name === "Addiction Treatment" && (
        <path fill="currentColor" d="M14 20a6 6 0 1 1 8 5.7V40h-4V25.7A6 6 0 0 1 14 20Zm16-2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />
      )}
      {name === "Walk In Tubs" && (
        <path fill="currentColor" d="M8 14h32v6H30v14a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V20H8v-6Zm8 6v14a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V20H16Z" />
      )}
      {![
        "Merchant Cash Advance",
        "Business Loans",
        "Health Insurance",
        "Life Insurance",
        "Final Expense Insurance",
        "Auto Insurance",
        "Medical Alert",
        "Reverse Mortgage",
        "Travel/Vacation",
        "Solar",
        "Tax Settlement",
        "Medicare Supplement",
        "Medicare",
        "Home/Business Security",
        "Pain Relief",
        "Addiction Treatment",
        "Walk In Tubs",
        "Business Insurance (GL & WC)",
        "Business Insurance (General Liability & Workers Comp)",
        "Roofing",
        "HVAC",
        "Home Improvement",
        "Plumbing",
      ].includes(name) && <circle cx="24" cy="24" r="10" fill="currentColor" opacity="0.35" />}
    </svg>
  )
}

function Services() {
  const industries = useSite().sections.industries
  return (
    <section id="services" className="scroll-mt-28 mx-auto max-w-[1120px] px-4 py-20 md:px-6 md:py-28">
      <Reveal>
        <h2 className="text-center font-display text-4xl font-semibold tracking-[-0.04em] text-brand-deep md:text-5xl">{industries.title}</h2>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {industries.items.map((name, index) => (
          <Reveal key={name} delay={index * 0.04} className="flex flex-col items-center text-center">
            <IndustryIcon name={name} />
            <p className="mt-4 max-w-[12rem] text-sm font-medium text-brand-deep">{name}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Process() {
  const { sections } = useSite()
  const process = sections.process
  const openInquiry = useInquiry()
  return (
    <section id="steps-cta-section" className="scroll-mt-28 mx-auto grid max-w-[1120px] gap-10 px-4 py-20 md:px-6 lg:grid-cols-[0.8fr_1.1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionTag>{process.tag}</SectionTag>
        <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">{process.title}</h2>
        <p className="mt-4 max-w-sm text-body">{process.body}</p>
      </div>
      <div className="space-y-4">
        {process.steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.05}>
            <article className="rounded-[24px] bg-white p-6">
              <Dots count={index + 1} total={process.steps.length} />
              <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{step.body}</p>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <article className="rounded-[24px] bg-ink p-6 text-white">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{process.closeTitle}</h3>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <Button onClick={openInquiry} variant="secondary">
              {process.closeButton}
            </Button>
            <div className="flex items-center gap-3">
              <Faces images={sections.aboutHome.faces.slice(0, 1)} size="sm" />
              <p className="text-sm text-white/75">
                {process.rating}
                <span className="mt-0.5 block text-xs text-white/50">{process.clients}</span>
              </p>
            </div>
          </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = useSite().sections.testimonials
  return (
    <section className="mx-auto max-w-[1120px] px-4 py-10 md:px-6">
      <Reveal className="max-w-2xl">
        <SectionTag>{testimonials.tag}</SectionTag>
        <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.03em] md:text-6xl">{testimonials.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {testimonials.items.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.06}>
            <article className="flex min-h-[320px] flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-sm">
              <p className="font-display text-xl leading-snug tracking-[-0.03em] text-brand-deep md:text-2xl">“{item.quote}”</p>
              <div className="mt-8 flex items-center gap-3 border-t border-black/[0.06] pt-5">
                <img src={item.image} alt="" className="h-11 w-11 rounded-full object-cover grayscale-[20%]" />
                <div>
                  <p className="font-medium text-brand-deep">{item.name}</p>
                  <p className="text-sm text-mute">{item.role}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  const { sections } = useSite()
  const faq = sections.faq
  const site = sections.site
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="mx-auto max-w-[640px] px-4 py-20 md:px-6">
      <a href={`mailto:${site.email}`} className="mx-auto mb-16 flex max-w-md items-center justify-between rounded-[22px] bg-ink p-2 pl-2 text-ink">
        <span className="flex min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-white">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M2 3.5h12v9H2z" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-mute">{site.emailLabel}</span>
            <span className="block truncate text-sm font-medium">{site.email}</span>
          </span>
        </span>
        <span className="px-4 text-white" aria-hidden="true">
          →
        </span>
      </a>
      <Reveal className="text-center">
        <SectionTag>{faq.tag}</SectionTag>
        <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">{faq.title}</h2>
      </Reveal>
      <div className="relative mt-10">
        <div className="space-y-3">
          {faq.items.map((item, index) => {
            const expanded = open === index
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl bg-white">
                <button type="button" className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left" onClick={() => setOpen(expanded ? null : index)}>
                  <span className="font-medium">{item.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-mute">
                    <svg viewBox="0 0 16 16" className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-5 pb-4 text-sm text-body"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TeamPhoto({ name, image }: { name: string; image: string }) {
  if (image) {
    return <img src={image} alt={name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(180deg,#e8f4fc_0%,#f3f5f7_100%)] text-mute">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-brand">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-xs font-medium">Photo coming soon</span>
    </div>
  )
}

function TeamHome() {
  const teamHome = useSite().sections.teamHome
  return (
    <section className="mx-auto max-w-[1120px] px-4 py-16 md:px-6">
      <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
        <SectionTag>{teamHome.tag}</SectionTag>
        <h2 className="text-center font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">{teamHome.title}</h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamHome.items.map((member, index) => (
          <Reveal key={`${member.name}-${index}`} delay={index * 0.06}>
            <article className="group overflow-hidden rounded-[28px] bg-white">
              <div className="aspect-[4/5] overflow-hidden">
                <TeamPhoto name={member.name} image={member.image} />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">{member.name}</h3>
                <p className="mt-1 text-sm text-mute">{member.role}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
