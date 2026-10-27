import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const STORAGE_KEY = "ph-supabase-config"

export type SupabaseConfig = { url: string; key: string; from: "env" | "browser" }

export function readConfig(): SupabaseConfig | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  if (url && key) return { url, key, from: "env" }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const saved = JSON.parse(raw) as { url?: string; key?: string }
    if (saved.url && saved.key) return { url: saved.url, key: saved.key, from: "browser" }
  } catch {
    return null
  }
  return null
}

export function saveConfig(url: string, key: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ url: url.trim(), key: key.trim() }))
  window.dispatchEvent(new Event("ph-supabase-config"))
}

export function clearConfig() {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event("ph-supabase-config"))
}

let client: SupabaseClient | null = null
let signature = ""

export function getClient() {
  const config = readConfig()
  if (!config) {
    client = null
    signature = ""
    return null
  }
  const next = `${config.url}|${config.key}`
  if (next !== signature) {
    client = createClient(config.url, config.key)
    signature = next
  }
  return client
}
