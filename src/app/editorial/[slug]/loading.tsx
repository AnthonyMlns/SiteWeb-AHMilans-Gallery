import MainLayout from '@/components/layout/MainLayout'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Article header */}
        <header className="mb-12">
          <Skeleton className="mb-5 h-3 w-20" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="mt-1 h-12 w-4/5" />
          <Skeleton className="mt-5 h-5 w-full" />
          <Skeleton className="mt-1 h-5 w-3/4" />
          <div className="mt-6 flex gap-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </header>

        {/* Thumbnail */}
        <Skeleton className="mb-14 aspect-[16/9]" />

        {/* Body text lines */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, block) => (
            <div key={block} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
