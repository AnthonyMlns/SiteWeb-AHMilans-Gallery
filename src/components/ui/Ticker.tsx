'use client'

interface TickerProps {
  items: string[]
}

export default function Ticker({ items }: TickerProps) {
  if (!items?.length) return null

  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-b border-border bg-background py-2.5">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'ticker 40s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="px-10 text-[10px] uppercase tracking-widest text-muted"
          >
            {item}
            <span className="mx-6 opacity-30">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
