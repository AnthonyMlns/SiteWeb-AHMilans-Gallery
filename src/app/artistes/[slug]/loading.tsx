import MainLayout from '@/components/layout/MainLayout'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-28">

        {/* Back link */}
        <Skeleton className="mb-12 h-3 w-20 lg:mb-16" />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">

          {/* Left column: portrait + contact */}
          <div>
            <Skeleton className="aspect-[3/4]" />
            <div className="mt-8 space-y-3">
              <Skeleton className="h-3 w-40" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          {/* Right column: name + bio */}
          <div className="flex flex-col justify-center">
            <Skeleton className="h-12 w-4/5" />
            <div className="mt-8 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Artworks section */}
        <section className="mt-16 lg:mt-28">
          <Skeleton className="mb-10 h-9 w-44 lg:mb-16" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
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
      </div>
    </MainLayout>
  )
}
