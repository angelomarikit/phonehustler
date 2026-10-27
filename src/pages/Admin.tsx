import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import { motion } from "framer-motion"
import schemaSql from "../../supabase/schema.sql?raw"
import { clearConfig, getClient, readConfig, saveConfig } from "../cms/client"
import { defaultSections, sectionLabels, sectionOrder, type SectionId, type Sections } from "../cms/defaults"
import { SectionFields, type Json } from "../cms/Fields"
import { useSite } from "../cms/SiteProvider"
import { Button } from "../components/ui"

export function AdminPage() {
  const config = readConfig()
  const [session, setSession] = useState<Session | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const supabase = getClient()
    if (!supabase) {
      setSession(null)
      setAuthReady(true)
      return
    }
    let active = true
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setAuthReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [config?.url, config?.key])

  if (!config) {
    return (
      <AuthScreen kicker="Admin" title="Connect Supabase" text="Paste your project URL and anon key. Then you can sign in and edit every section.">
        <ConnectForm />
      </AuthScreen>
    )
  }
  if (!authReady) {
    return (
      <AuthScreen kicker="Admin" title="One moment" text="Checking your sign-in.">
        <p className="text-sm text-body">Checking your sign-in…</p>
      </AuthScreen>
    )
  }
  if (!session) {
    return (
      <AuthScreen kicker="Admin" title="Sign in" text="Only signed-in people can change the site. The live pages stay public.">
        <LoginForm />
      </AuthScreen>
    )
  }
  return <Editor email={session.user.email ?? ""} />
}

const field =
  "mt-1.5 w-full rounded-2xl border border-black/10 bg-paper px-4 py-3 text-sm text-brand-deep outline-none transition focus:border-brand focus:bg-white"

function AuthScreen({
  kicker,
  title,
  text,
  children,
}: {
  kicker: string
  title: string
  text: string
  children: ReactNode
}) {
  const site = useSite().sections.site
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111c] px-3 py-3 text-brand-deep md:px-6 md:py-8">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand/15 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto grid min-h-[calc(100svh-1.5rem)] max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_rgba(2,26,63,0.45)] ring-1 ring-white/10 md:min-h-[min(760px,calc(100svh-4rem))] md:grid-cols-[0.84fr_1.16fr]"
      >
        <aside className="relative flex min-h-[280px] flex-col overflow-hidden text-white md:min-h-0">
          <img
            src="/hero.jpg?v=2"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,26,63,0.72)_0%,rgba(2,26,63,0.94)_55%,rgba(2,26,63,0.98)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(1,145,255,0.28),transparent_42%)]" />
          <div className="grain absolute inset-0 opacity-35" aria-hidden="true" />
          <div className="relative z-10 flex h-full flex-col px-7 py-8 md:px-8 md:py-10">
            <a href="/" className="inline-flex w-fit shrink-0 self-start">
              <img
                src="/logo-light.png?v=3"
                alt="Phone Hustlers"
                width={922}
                height={300}
                className="block h-11 w-auto max-w-[min(100%,220px)] object-contain object-left md:h-12"
              />
            </a>
            <div className="mt-10 md:mt-14">
              <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">{kicker}</p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] md:text-[2.6rem]">{title}</h1>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/78">{text}</p>
            </div>
            <div className="mt-8 space-y-3 text-sm md:mt-auto">
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md transition hover:border-white/20 hover:bg-white/15"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_8px_24px_rgba(1,145,255,0.35)]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M3.5 2.5h2.2l1 2.4-1.3 1a8 8 0 0 0 3.7 3.7l1-1.3 2.4 1v2.2A1.2 1.2 0 0 1 11.3 13 10.5 10.5 0 0 1 3 4.7a1.2 1.2 0 0 1 .5-2.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] text-white/55">Call us</span>
                  <span className="font-medium">{site.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md transition hover:border-white/20 hover:bg-white/15"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5h11v7h-11v-7Z" stroke="currentColor" strokeWidth="1.3" />
                    <path d="m3 5 5 4 5-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] text-white/55">Email us</span>
                  <span className="block truncate font-medium">{site.email}</span>
                </span>
              </a>
              <a href="/" className="inline-flex items-center gap-1.5 pt-2 text-sm text-white/70 transition hover:text-white">
                View the site
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </aside>
        <div className="relative flex items-center bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] px-6 py-10 md:px-10 md:py-12">
          <div className="pointer-events-none absolute inset-y-8 left-0 hidden w-px bg-black/5 md:block" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function ConnectForm() {
  const [url, setUrl] = useState("")
  const [key, setKey] = useState("")
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        saveConfig(url, key)
      }}
    >
      <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Project keys</h2>
      <p className="mt-3 text-sm leading-relaxed text-body">
        In Supabase, open Project Settings, then API. Copy the project URL and the anon public key. You can also put them in .env as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
      </p>
      <label className="mt-5 block text-xs font-medium text-mute">
        Project URL
        <input value={url} onChange={(event) => setUrl(event.target.value)} required className={field} placeholder="https://xxxx.supabase.co" />
      </label>
      <label className="mt-4 block text-xs font-medium text-mute">
        Anon public key
        <textarea value={key} onChange={(event) => setKey(event.target.value)} required rows={4} className={`${field} resize-none`} />
      </label>
      <div className="mt-6">
        <Button type="submit" variant="primary" className="flex w-full justify-between">
          Connect
        </Button>
      </div>
    </form>
  )
}

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [note, setNote] = useState("")
  const [mode, setMode] = useState<"in" | "up">("in")

  async function submit(event: FormEvent) {
    event.preventDefault()
    const supabase = getClient()
    if (!supabase) return
    setNote("")
    const result =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })
    if (result.error) {
      setNote(result.error.message)
      return
    }
    if (mode === "up" && !result.data.session) {
      setNote("Account created. If you do not land in the admin, turn off email confirmation in Supabase → Authentication → Providers → Email, then sign in.")
    }
  }

  return (
    <form onSubmit={(event) => void submit(event)}>
      <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">{mode === "in" ? "Welcome back" : "Create the first admin"}</h2>
      <p className="mt-2 text-sm leading-relaxed text-body">
        {mode === "in" ? "Use the email and password for this project." : "The first account you create can edit every section."}
      </p>
      <label className="mt-6 block text-xs font-medium text-mute">
        Email
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={field} placeholder="you@phonehustler.com" />
      </label>
      <label className="mt-4 block text-xs font-medium text-mute">
        Password
        <input type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className={field} placeholder="At least 6 characters" />
      </label>
      {note && <p className="mt-4 rounded-2xl bg-paper px-4 py-3 text-sm leading-relaxed text-body">{note}</p>}
      <div className="mt-6">
        <Button type="submit" variant="ink" className="flex w-full justify-between">
          {mode === "in" ? "Sign in" : "Create account"}
        </Button>
      </div>
      <button type="button" className="mt-4 text-sm font-medium text-brand" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
      </button>
    </form>
  )
}

function Editor({ email }: { email: string }) {
  const { sections, fromDatabase, error, reload } = useSite()
  const [draft, setDraft] = useState<Sections>(sections)
  const [active, setActive] = useState<SectionId>("hero")
  const [note, setNote] = useState("")
  const [saving, setSaving] = useState(false)
  const [sqlOpen, setSqlOpen] = useState(false)

  useEffect(() => {
    setDraft(sections)
  }, [sections])

  async function save() {
    const supabase = getClient()
    if (!supabase) return
    setSaving(true)
    setNote("")
    const { error: saveError } = await supabase.from("sections").upsert({
      id: active,
      label: sectionLabels[active],
      sort: sectionOrder.indexOf(active),
      data: draft[active],
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
    if (saveError) {
      setNote(saveError.message)
      setSqlOpen(saveError.message.toLowerCase().includes("sections") || saveError.code === "42P01")
      return
    }
    setNote("Saved. The site is using this section now.")
    await reload()
  }

  async function loadCurrentSite() {
    const supabase = getClient()
    if (!supabase) return
    setSaving(true)
    setNote("")
    const rows = sectionOrder.map((id, sort) => ({
      id,
      label: sectionLabels[id],
      sort,
      data: defaultSections[id],
      updated_at: new Date().toISOString(),
    }))
    const { error: saveError } = await supabase.from("sections").upsert(rows)
    setSaving(false)
    if (saveError) {
      setNote(saveError.message)
      setSqlOpen(true)
      return
    }
    setNote("The current site is now in Supabase. Edit any section and save.")
    await reload()
  }

  async function signOut() {
    await getClient()?.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-paper text-brand-deep">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png?v=3" alt="Phone Hustlers" className="h-10 w-auto" />
          </a>
          <p className="font-display text-lg font-semibold tracking-[-0.03em]">Admin</p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-body">
          Signed in as {email}. {fromDatabase ? "The live site is reading Supabase." : "The live site is still using the built-in words until you load them."}
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void loadCurrentSite()} className="rounded-full bg-white px-4 py-2 text-sm font-medium">
            Load the current site
          </button>
          <button type="button" onClick={() => setSqlOpen((open) => !open)} className="rounded-full bg-white px-4 py-2 text-sm font-medium">
            Setup SQL
          </button>
          {readConfig()?.from === "browser" && (
            <button type="button" onClick={clearConfig} className="rounded-full bg-white px-4 py-2 text-sm font-medium">
              Disconnect
            </button>
          )}
          <button type="button" onClick={() => void signOut()} className="rounded-full bg-white px-4 py-2 text-sm font-medium">
            Sign out
          </button>
        </div>
      </div>
      {error && <p className="mb-4 rounded-2xl bg-white px-4 py-3 text-sm text-body">{error}. Run the setup SQL, then load the current site.</p>}
      {note && <p className="mb-4 rounded-2xl bg-white px-4 py-3 text-sm text-body">{note}</p>}
      <InquiryList />
      {sqlOpen && (
        <div className="mb-6 rounded-[28px] bg-white p-5">
          <p className="text-sm text-body">
            In Supabase, open the SQL Editor, paste this, and run it once. It creates the tables, the public <strong>media</strong> storage bucket for photo uploads, and loads every section.
          </p>
          <textarea readOnly value={schemaSql} rows={8} className="mt-3 w-full rounded-xl border border-black/10 p-3 font-mono text-xs" />
          <button
            type="button"
            className="mt-3 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white"
            onClick={() => void navigator.clipboard.writeText(schemaSql)}
          >
            Copy SQL
          </button>
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-1">
          {sectionOrder.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`block w-full rounded-xl px-3 py-2 text-left text-sm ${active === id ? "bg-brand text-white" : "bg-white text-brand-deep"}`}
            >
              {sectionLabels[id]}
            </button>
          ))}
        </aside>
        <section className="rounded-[28px] bg-white p-5 md:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">{sectionLabels[active]}</h2>
            <button type="button" disabled={saving} onClick={() => void save()} className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">
              {saving ? "Saving…" : "Save section"}
            </button>
          </div>
          <SectionFields
            data={draft[active] as { [key: string]: Json }}
            onChange={(data) => setDraft({ ...draft, [active]: data as Sections[typeof active] })}
          />
        </section>
      </div>
      </main>
    </div>
  )
}

type InquiryRow = {
  id: string
  name: string
  phone: string
  email: string
  company: string
  industry: string
  message: string
  created_at: string
}

function InquiryList() {
  const [rows, setRows] = useState<InquiryRow[]>([])
  const [note, setNote] = useState("")

  useEffect(() => {
    const supabase = getClient()
    if (!supabase) return
    void supabase
      .from("inquiries")
      .select("id,name,phone,email,company,industry,message,created_at")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (error) setNote(error.message)
        else setRows((data ?? []) as InquiryRow[])
      })
  }, [])

  if (note) {
    return (
      <p className="mb-4 rounded-2xl bg-white px-4 py-3 text-sm text-body">
        Talk-to-us notes are not saved yet. Run the setup SQL again so new forms land here. {note}
      </p>
    )
  }
  if (rows.length === 0) return null
  return (
    <section className="mb-6 rounded-[28px] bg-white p-5">
      <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">People who want a call</h2>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li key={row.id} className="rounded-2xl bg-paper px-4 py-3 text-sm">
            <p className="font-medium">
              {row.name} · {row.phone}
            </p>
            <p className="text-mute">
              {row.email}
              {row.company ? ` · ${row.company}` : ""}
              {row.industry ? ` · ${row.industry}` : ""}
            </p>
            {row.message && <p className="mt-1 text-body">{row.message}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
