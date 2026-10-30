import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Windows often locks large binaries in public/ (EBUSY). They are still served; we just do not watch them.
    watch: {
      ignored: ["**/*.mp4", "**/*.mov", "**/.tmp-docx/**", "**/.tmp-docx.zip"],
    },
  },
})
