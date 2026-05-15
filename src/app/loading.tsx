import MainLayout from '@/components/layout/MainLayout'
import { Skeleton } from '@/components/ui/Skeleton'

// Homepage loading — mirrors the hero + roster + collection + journal layout
export default function Loading() {
  return (
    <MainLayout>
      {/* Hero skeleton */}
      <div className="grid min-h-[92vh] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-24 lg:px-16 xl:px-24">
          <Skeleton className="mb-8 h-3 w-40" />
          <Skeleton className="h-20 w-3/4" />
          <Skeleton className="mt-5 h-4 w-48" />
          <Skeleton className="mt-12 h-4 w-24" />
        </div>
        <Skeleton className="min-h-[60vh] lg:min-h-0" />
      </div>

      {/* Roster skeleton */}
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 border-b border-border pb-5">
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[3/4]" />
              <div className="mt-3 space-y-1.5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
