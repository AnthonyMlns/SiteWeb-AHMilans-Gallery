import MainLayout from '@/components/layout/MainLayout'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Page header */}
        <div className="mb-14 border-b border-border pb-6">
          <Skeleton className="h-12 w-36" />
          <Skeleton className="mt-2 h-4 w-24" />
        </div>

        {/* Article card grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[3/2]" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-1 h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
