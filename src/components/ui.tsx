import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function Logo({ tone = "brand", size = "md" }: { tone?: "brand" | "light"; size?: "md" | "lg" }) {
  const height = size === "lg" ? "h-12 md:h-14" : "h-10 md:h-11"
  const src = tone === "light" ? "/logo-light.png?v=3" : "/logo.png?v=3"
  return (
    <Link to="/" className="inline-flex shrink-0 items-center">
      <img src={src} alt="Phone Hustlers" className={`${height} w-auto`} />
    </Link>
  )
}

export function SectionTag({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.08em] uppercase ${
        light ? "border-transparent bg-white text-ink" : "border-transparent bg-ink text-white"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  )
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  external?: boolean
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  variant?: "primary" | "secondary" | "light" | "ink"
  className?: string
}

export function Button({
  children,
  to,
  href,
  external,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-deep",
    secondary: "bg-white text-brand-deep hover:bg-brand hover:text-white",
    light: "bg-mist text-brand-deep hover:bg-brand hover:text-white",
    ink: "bg-brand-deep text-white hover:bg-black",
  }[variant]
  const circle = variant === "primary" ? "bg-white text-brand" : "bg-brand text-white"
  const classNames = `group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-medium transition-colors ${styles} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      <span className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-[-12deg] ${circle}`}>
        <Arrow />
      </span>
    </>
  )
  if (onClick || type === "submit") {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={`${classNames} disabled:opacity-60`}>
        {inner}
      </button>
    )
  }
  if (to) {
    return (
      <Link to={to} className={classNames}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} className={classNames} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {inner}
    </a>
  )
}

export function Grain({ className = "opacity-40" }: { className?: string }) {
  return <div className={`grain absolute inset-0 ${className}`} aria-hidden="true" />
}

export function Marquee({
  items,
  reverse = false,
  duration = 28,
  render,
}: {
  items: string[]
  reverse?: boolean
  duration?: number
  render?: (item: string) => ReactNode
}) {
  const row = [...items, ...items]
  return (
    <div className="marquee overflow-hidden">
      <div
        className="marquee-track flex w-max items-center"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {row.map((item, index) => (
          <div key={`${item}-${index}`} className="px-7">
            {render ? render(item) : <span className="font-display text-lg font-semibold tracking-[-0.04em] text-ink/80">{item}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1400
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setCurrent(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  const text = Number.isInteger(value) ? Math.round(current).toLocaleString("en-US") : current.toFixed(1)
  return (
    <span ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}

export function Faces({ images, size = "md" }: { images: string[]; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-11 w-11"
  return (
    <div className="flex">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`${dim} rounded-full border-2 border-white object-cover ${index ? "-ml-3" : ""}`}
        />
      ))}
    </div>
  )
}

export function Dots({ count, total = 4, light = false }: { count: number; total?: number; light?: boolean }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, index) => (
        <span key={index} className={`h-1.5 w-1.5 rounded-full ${index < count ? "bg-brand" : light ? "bg-white/25" : "bg-black/15"}`} />
      ))}
    </div>
  )
}

const chartPoints = [
  { label: "Jan 12", value: 0 },
  { label: "Feb 11", value: 69 },
  { label: "May 24", value: 51 },
  { label: "Apri 28", value: 100 },
]

export function LineChart() {
  const ref = useRef<SVGPathElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const width = 320
  const height = 150
  const pad = 16
  const coords = chartPoints.map((point, index) => {
    const x = pad + (index * (width - pad * 2)) / (chartPoints.length - 1)
    const y = height - pad - (point.value / 100) * (height - pad * 2)
    return { ...point, x, y }
  })
  const d = coords.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height + 28}`} className="h-full w-full">
      {coords.map((point) => (
        <line key={point.label} x1={point.x} y1={pad} x2={point.x} y2={height - 4} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 4" />
      ))}
      <motion.path
        ref={ref}
        d={d}
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      {coords.map((point) => (
        <circle key={point.label} cx={point.x} cy={point.y} r="2.4" fill="white" />
      ))}
      {coords.map((point) => (
        <text key={`${point.label}-t`} x={point.x} y={height + 18} textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif">
          {point.label}
        </text>
      ))}
    </svg>
  )
}

export function Icon({ name }: { name: "page" | "layers" | "route" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      {name === "page" && <path {...common} d="M7 3.5h7l5 5V20.5H7zM14 3.5V9h5" />}
      {name === "layers" && <path {...common} d="m12 3 8 4.5L12 12 4 7.5 12 3Zm8 9L12 16.5 4 12m8 4.5L4 21l8-4.5L20 21l-8-4.5" />}
      {name === "route" && <path {...common} d="M6 6h.01M18 18h.01M7 6c6 0 4 12 11 12" />}
    </svg>
  )
}
