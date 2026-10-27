import { writeFileSync } from "node:fs"
import { defaultSections, sectionOrder, sectionLabels } from "../src/cms/defaults.ts"

const lines = sectionOrder.map((id, sort) => {
  const label = sectionLabels[id].replace(/'/g, "''")
  const json = JSON.stringify(defaultSections[id]).replace(/'/g, "''")
  return `  ('${id}', '${label}', ${sort}, '${json}'::jsonb)`
})

const block = `insert into public.sections (id, label, sort, data)
values
${lines.join(",\n")}
on conflict (id) do nothing;`

writeFileSync(new URL("./schema-seed.sql", import.meta.url), block, "utf8")
console.log("Wrote scripts/schema-seed.sql")
