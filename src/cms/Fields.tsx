import { useState } from "react"
import { getClient } from "./client"

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

const LONG = new Set([
  "body",
  "sub",
  "quote",
  "headline",
  "story",
  "mission",
  "intro",
  "teaser",
  "overview",
  "challenge",
  "strategy",
  "challengeIntro",
  "strategyIntro",
  "description",
  "footerBlurb",
  "ctaBody",
  "subtitle",
  "intro",
  "inquiryAside",
  "lead",
  "message",
  "a",
  "cardBody",
  "rightBody",
  "teamBody",
  "pageIntro",
  "side",
  "notes",
])

const IMAGES = new Set(["image", "photo", "photoLeft", "photoRight", "videoImage", "quoteImage", "banner"])

const LABELS: Record<string, string> = {
  q: "Question",
  a: "Answer",
  to: "Link",
  cal: "Booking link",
  nav: "Menu links",
  ctaTitle: "Closing headline",
  ctaBody: "Closing text",
  ctaPeople: "Closing label",
  ctaButton: "Closing button",
  navButton: "Menu button",
  footerBlurb: "Footer text",
  footerLinks: "Footer links",
  bannerAlt: "Banner description",
  quoteName: "Quote name",
  quoteRole: "Quote role",
  quoteImage: "Quote photo",
  buttonTo: "Button link",
  videoImage: "Video photo",
  photoLeft: "Left photo",
  photoRight: "Right photo",
  rowA: "First scrolling row",
  rowB: "Second scrolling row",
  highlightA: "Blue chip in the first row",
  highlightB: "Blue chip in the second row",
  chipA: "First chip",
  chipB: "Second chip",
  pageTitle: "Page headline",
  pageIntro: "Page text",
  challengeIntro: "Problem headline",
  strategyIntro: "What we did headline",
  phone: "Phone number",
  phoneTel: "Phone link",
  inquiryTitle: "Form headline",
  inquiryText: "Form text",
  inquiryButton: "Form button",
  inquiryThanks: "Thank you line",
  inquiryAside: "Sidebar availability line",
  subtitle: "Subtitle",
  intro: "Section intro",
  notes: "Special notes",
  options: "Delivery options",
  menuOpen: "Menu label",
  menuClose: "Close label",
  exploreLabel: "Footer explore label",
  socialsLabel: "Footer socials label",
  oldLabel: "Old way label",
  oldTitle: "Old way headline",
  oldPoints: "Old way points",
  kicker: "Small label",
  lead: "Lead line under headline",
  pitch: "Short pitch",
  stat: "Big number",
  statLabel: "Number caption",
  lines: "Dialing lines",
  ringLabel: "Waiting label",
  liveLabel: "Connected label",
  points: "Selling points",
}

function labelFor(key: string) {
  if (LABELS[key]) return LABELS[key]
  const spaced = key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ")
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function blankLike(sample: Json): Json {
  if (Array.isArray(sample)) return []
  if (sample && typeof sample === "object") {
    const out: { [key: string]: Json } = {}
    for (const [key, value] of Object.entries(sample)) out[key] = blankLike(value)
    return out
  }
  if (typeof sample === "number") return 0
  if (typeof sample === "boolean") return false
  return ""
}

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-brand-deep outline-none focus:border-brand"

function Leaf({ value, onChange }: { value: Json; onChange: (value: Json) => void }) {
  if (typeof value === "boolean") {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[#0191ff]"
      />
    )
  }
  if (typeof value === "number") {
    return (
      <input
        type="number"
        step="any"
        value={value}
        onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))}
        className={fieldClass}
      />
    )
  }
  return <TextValue value={String(value ?? "")} onChange={(next) => onChange(next)} />
}

function TextValue({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const long = value.length > 90 || value.includes("\n")
  return long ? (
    <textarea value={value} rows={5} onChange={(event) => onChange(event.target.value)} className={fieldClass} />
  ) : (
    <input value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass} />
  )
}

export function SectionFields({
  data,
  onChange,
}: {
  data: { [key: string]: Json }
  onChange: (data: { [key: string]: Json }) => void
}) {
  return (
    <div className="space-y-5">
      {Object.entries(data).map(([key, entry]) => (
        <div key={key}>
          <p className="mb-1.5 text-sm font-medium text-brand-deep">{labelFor(key)}</p>
          {LONG.has(key) && typeof entry === "string" ? (
            <textarea value={entry} rows={4} onChange={(event) => onChange({ ...data, [key]: event.target.value })} className={fieldClass} />
          ) : (
            <FieldWithImages name={key} value={entry} onChange={(next) => onChange({ ...data, [key]: next })} />
          )}
        </div>
      ))}
    </div>
  )
}

function FieldWithImages({ name, value, onChange }: { name: string; value: Json; onChange: (value: Json) => void }) {
  if (typeof value === "string" && IMAGES.has(name)) {
    return <ImageField value={value} onChange={onChange} />
  }
  if (Array.isArray(value) || (value && typeof value === "object")) {
    return <NestedImages value={value} onChange={onChange} />
  }
  return <Leaf value={value} onChange={onChange} />
}

function NestedImages({ value, onChange }: { value: Json; onChange: (value: Json) => void }) {
  if (Array.isArray(value)) {
    const sample = (value[0] ?? "") as Json
    return (
      <div className="space-y-3">
        {value.map((item, index) => (
          <div key={index} className="rounded-2xl border border-black/8 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-mute">Item {index + 1}</p>
              <button type="button" className="text-xs text-mute underline" onClick={() => onChange(value.filter((_, i) => i !== index))}>
                Remove
              </button>
            </div>
            <NestedImages value={item} onChange={(next) => onChange(value.map((entry, i) => (i === index ? next : entry)))} />
          </div>
        ))}
        <button
          type="button"
          className="rounded-full bg-brand px-3 py-1.5 text-xs font-medium text-white"
          onClick={() => onChange([...value, blankLike(sample)])}
        >
          Add item
        </button>
      </div>
    )
  }
  if (value && typeof value === "object") {
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([key, entry]) => (
          <div key={key}>
            <p className="mb-1.5 text-xs font-medium text-mute">{labelFor(key)}</p>
            {LONG.has(key) && typeof entry === "string" ? (
              <textarea
                value={entry}
                rows={4}
                onChange={(event) => onChange({ ...value, [key]: event.target.value })}
                className={fieldClass}
              />
            ) : typeof entry === "string" && IMAGES.has(key) ? (
              <ImageField value={entry} onChange={(next) => onChange({ ...value, [key]: next })} />
            ) : (
              <LeafOrNest value={entry} onChange={(next) => onChange({ ...value, [key]: next })} />
            )}
          </div>
        ))}
      </div>
    )
  }
  return <Leaf value={value} onChange={onChange} />
}

function LeafOrNest({ value, onChange }: { value: Json; onChange: (value: Json) => void }) {
  if (Array.isArray(value) || (value && typeof value === "object")) return <NestedImages value={value} onChange={onChange} />
  return <Leaf value={value} onChange={onChange} />
}

function ImageField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-3 rounded-2xl border border-black/8 bg-paper p-3">
      {value ? (
        <img src={value} alt="" className="h-36 w-full max-w-[240px] rounded-xl object-cover" />
      ) : (
        <div className="flex h-36 max-w-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-black/15 bg-white px-4 text-center text-xs text-mute">
          Upload a photo. It saves to Supabase storage.
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <ImageUpload onUploaded={onChange} />
        {value && (
          <button type="button" className="text-xs font-medium text-mute underline" onClick={() => onChange("")}>
            Remove photo
          </button>
        )}
      </div>
    </div>
  )
}

function ImageUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState("")

  async function onFile(file: File | undefined) {
    if (!file) return
    const supabase = getClient()
    if (!supabase) {
      setNote("Connect Supabase before uploading.")
      return
    }
    setBusy(true)
    setNote("")
    const path = `uploads/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "-")}`
    const { error } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })
    if (error) {
      setNote(error.message)
      setBusy(false)
      return
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path)
    onUploaded(data.publicUrl)
    setBusy(false)
  }

  return (
    <div>
      <label className="inline-flex cursor-pointer items-center rounded-full bg-brand px-4 py-2 text-xs font-medium text-white transition hover:bg-brand-deep has-disabled:opacity-60">
        {busy ? "Uploading…" : "Upload photo"}
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(event) => void onFile(event.target.files?.[0])}
          className="sr-only"
        />
      </label>
      {note && <p className="mt-2 text-xs text-red-600">{note}</p>}
    </div>
  )
}
