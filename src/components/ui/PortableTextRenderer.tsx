'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface PortableTextRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[]
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value?.length) return null

  return (
    <div>
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="mb-5 text-base leading-relaxed text-foreground">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="mb-4 mt-10 font-serif text-3xl text-foreground">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-3 mt-8 font-serif text-2xl text-foreground">{children}</h3>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-8 border-l border-foreground pl-5 font-serif text-xl italic text-muted">
                {children}
              </blockquote>
            ),
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-medium text-foreground">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            link: ({ children, value: v }) => (
              <a
                href={v?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-opacity hover:opacity-50"
              >
                {children}
              </a>
            ),
          },
          types: {
            image: ({ value: v }) => {
              if (!v?.asset) return null
              const url = urlFor(v).width(1200).url()
              return (
                <figure className="my-10">
                  <div className="relative aspect-[16/9] overflow-hidden bg-placeholder">
                    <Image src={url} alt={v.alt || ''} fill className="object-cover" />
                  </div>
                  {v.caption && (
                    <figcaption className="mt-2 text-center text-xs text-muted">
                      {v.caption}
                    </figcaption>
                  )}
                </figure>
              )
            },
          },
        }}
      />
    </div>
  )
}
