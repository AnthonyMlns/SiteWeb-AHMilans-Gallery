import MainLayout from '@/components/layout/MainLayout'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <MainLayout>
      {/* Artist header — 2 columns */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
          {/* Portrait */}
          <Skeleton className="aspect-[3/4]" />

          {/* Info */}
          <div className="pb-8">
            <Skeleton className="mb-4 h-3 w-40" />
            <Skeleton className="h-16 w-4/5" />
            <Skeleton className="mt-2 h-16 w-3/5" />
            <div className="mt-8 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="mt-8 h-4 w-28" />
          </div>
        </div>
      </section>

      {/* Artworks section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="mb-10 pb-5">
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/5]" />
              <div className="mt-3 space-y-1.5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  )
}
