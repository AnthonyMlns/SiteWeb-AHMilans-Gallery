import MainLayout from '@/components/layout/MainLayout'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Page header */}
        <div className="mb-14 border-b border-border pb-6">
          <Skeleton className="h-12 w-56" />
          <Skeleton className="mt-2 h-4 w-20" />
        </div>

        {/* Artwork card grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/5]" />
              <div className="mt-3 space-y-1.5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex justify-between pt-0.5">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
