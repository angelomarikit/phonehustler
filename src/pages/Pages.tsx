import { Link, useParams } from "react-router-dom"
import { useSite } from "../cms/SiteProvider"
import { useInquiry } from "../components/InquiryModal"
import { formatDate } from "../data/content"
import { Button, CountUp, Faces, Marquee, Reveal, SectionTag } from "../components/ui"

export function AboutPage() {
  const { sections } = useSite()
  const page = sections.aboutPage
  const about = sections.aboutHome
  const openInquiry = useInquiry()
  return (
    <div className="px-4 pt-32 pb-20 md:px-6">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <p className="font-display text-6xl font-bold tracking-[-0.05em] md:text-8xl">{page.title}</p>
          <p className="mt-6 max-w-2xl text-lg text-body">{page.intro}</p>
          <div className="mt-8">
            <Button onClick={openInquiry}>{page.button}</Button>
          </div>
        </Reveal>
      </div>
      <div className="mt-14 border-y border-black/5 bg-white py-4">
        <Marquee items={about.logos} />
      </div>
      <div className="mx-auto mt-16 grid max-w-[1120px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionTag>{page.storyTag}</SectionTag>
        </Reveal>
        <Reveal>
          <p className="font-display text-2xl leading-snug tracking-[-0.03em] md:text-3xl">{page.story}</p>
        </Reveal>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1120px] gap-3 md:grid-cols-4">
        {about.stats.map((stat) => (
          <div key={stat.label} className="rounded-[24px] bg-white px-5 py-6">
            <p className="font-display text-4xl font-semibold tracking-[-0.04em]">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-body">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-20 max-w-[1120px] rounded-[32px] bg-ink p-8 text-white md:p-12">
        <SectionTag light>{page.missionTag}</SectionTag>
        <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">{page.missionTitle}</h2>
        <p className="mt-4 max-w-2xl text-white/75">{page.mission}</p>
      </div>
      <div className="mx-auto mt-20 max-w-[1120px]">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionTag>{page.teamTag}</SectionTag>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">{page.teamTitle}</h2>
            <p className="mt-3 max-w-xl text-body">{page.teamBody}</p>
          </div>
          <Faces images={about.faces} />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.team.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.04} className="overflow-hidden rounded-[28px] bg-white">
              <img src={member.image} alt={member.name} className="aspect-[4/5] w-full object-cover" />
              <div className="p-5">
                <p className="font-display text-2xl font-semibold tracking-[-0.03em]">{member.name}</p>
                <p className="mt-1 text-sm text-mute">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BlogPage() {
  const articles = useSite().sections.articles
  return (
    <div className="mx-auto max-w-[1120px] px-4 pt-32 pb-20 md:px-6">
      <Reveal>
        <h1 className="max-w-3xl font-display text-5xl font-bold tracking-[-0.045em] text-balance md:text-7xl">
          {articles.pageTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-body">{articles.pageIntro}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.items.map((article) => (
          <Link key={article.slug} to={`/blog/${article.slug}`} className="group overflow-hidden rounded-[28px] bg-white">
            <div className="aspect-square overflow-hidden">
              <img src={article.image} alt={article.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-sm text-mute">{formatDate(article.date)}</p>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-[-0.03em]">{article.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function ArticlePage() {
  const { slug = "" } = useParams()
  const articles = useSite().sections.articles
  const article = articles.items.find((item) => item.slug === decodeURIComponent(slug))
  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-36 pb-20">
        <h1 className="font-display text-4xl">{articles.missing}</h1>
        <Link to="/blog" className="mt-4 inline-block text-body underline">
          {articles.back}
        </Link>
      </div>
    )
  }
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-20 md:px-6">
      <p className="text-sm text-mute">{formatDate(article.date)}</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] text-balance md:text-6xl">{article.title}</h1>
      <img src={article.image} alt={article.alt} className="mt-8 aspect-[16/10] w-full rounded-[28px] object-cover" />
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-body">
        {article.body.split(/\n\n+/).filter(Boolean).map((block, index) => (
          <p key={index} className="whitespace-pre-line">
            {block}
          </p>
        ))}
      </div>
    </article>
  )
}

export function CaseStudiesPage() {
  const cases = useSite().sections.cases
  return (
    <div className="mx-auto max-w-[1120px] px-4 pt-32 pb-20 md:px-6">
      <Reveal>
        <h1 className="font-display text-6xl font-bold tracking-[-0.05em] md:text-8xl">{cases.pageTitle}</h1>
        <p className="mt-5 max-w-xl text-lg text-body">{cases.pageIntro}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {cases.items.map((item) => (
          <Link key={item.slug} to={`/case-studies/${item.slug}`} className="group overflow-hidden rounded-[28px] bg-white">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={item.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex items-end justify-between gap-4 p-6">
              <div>
                <p className="text-sm text-mute">{item.category}</p>
                <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-0.04em]">{item.name}</h2>
                <p className="mt-2 text-sm text-body">{item.teaser}</p>
              </div>
              <p className="font-display text-3xl font-semibold">{item.results[0].value}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function CaseStudyPage() {
  const { slug = "" } = useParams()
  const cases = useSite().sections.cases
  const study = cases.items.find((item) => item.slug === slug)
  if (!study) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-36 pb-20">
        <h1 className="font-display text-4xl">{cases.missing}</h1>
        <Link to="/case-studies" className="mt-4 inline-block underline">
          {cases.back}
        </Link>
      </div>
    )
  }
  const others = cases.items.filter((item) => item.slug !== study.slug)
  return (
    <article className="mx-auto max-w-[1120px] px-4 pt-32 pb-20 md:px-6">
      <p className="text-sm text-mute">
        {study.category} · {formatDate(study.date)}
      </p>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-[-0.05em] md:text-7xl">{study.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">{study.teaser}</p>
      <img src={study.image} alt="" className="mt-8 aspect-[16/8] w-full rounded-[32px] object-cover" />
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="font-display text-sm tracking-[0.14em] text-mute uppercase">{cases.overviewLabel}</h2>
          <p className="mt-3 text-lg">{study.overview}</p>
          <p className="mt-4 text-sm text-mute">{cases.industryLabel} · {study.industry}</p>
        </section>
        <section>
          <h2 className="font-display text-sm tracking-[0.14em] text-mute uppercase">{cases.problemLabel}</h2>
          <p className="mt-3 font-medium">{study.challengeIntro}</p>
          <p className="mt-3 text-body">{study.challenge}</p>
        </section>
        <section className="md:col-span-2">
          <h2 className="font-display text-sm tracking-[0.14em] text-mute uppercase">{cases.didLabel}</h2>
          <p className="mt-3 font-medium">{study.strategyIntro}</p>
          <p className="mt-3 max-w-3xl text-body">{study.strategy}</p>
        </section>
      </div>
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {study.results.map((result) => (
          <div key={result.label} className="rounded-[24px] bg-ink p-6 text-white">
            <p className="font-display text-5xl font-semibold tracking-[-0.04em]">{result.value}</p>
            <p className="mt-2 text-sm text-white/70">{result.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <h2 className="font-display text-4xl font-medium tracking-[-0.03em]">{cases.moreTitle}</h2>
        <p className="mt-2 text-body">{cases.moreBody}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((item) => (
            <Link key={item.slug} to={`/case-studies/${item.slug}`} className="overflow-hidden rounded-[24px] bg-white">
              <img src={item.image} alt="" className="aspect-[16/10] w-full object-cover" />
              <div className="p-4">
                <p className="font-display text-xl font-semibold">{item.name}</p>
                <p className="text-sm text-mute">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}

export function NotFoundPage() {
  const page = useSite().sections.notFound
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 pt-28 pb-20">
      <p className="font-display text-8xl font-bold tracking-[-0.06em] md:text-9xl">{page.code}</p>
      <p className="mt-4 max-w-lg text-lg text-body">{page.message}</p>
      <div className="mt-8">
        <Button to="/">{page.button}</Button>
      </div>
    </div>
  )
}
