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
    setSections(rows.length ? mergeSections(rows) : defaultSections)
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
