import MainLayout from '@/components/layout/MainLayout'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Primary image */}
          <Skeleton className="aspect-square" />

          {/* Info */}
          <div className="flex flex-col justify-center">
            <Skeleton className="mb-4 h-3 w-32" />
            <Skeleton className="h-14 w-4/5" />
            <Skeleton className="mt-1 h-14 w-3/5" />

            {/* Specs table */}
            <div className="mt-10 divide-y divide-border border-t border-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between py-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-10 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="mt-10 h-12 w-64" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
