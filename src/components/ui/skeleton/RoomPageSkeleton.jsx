const Shimmer = ({ className = "" }) => <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;

function RoomCardSkeleton() {
  return (
    <div className="flex h-36 w-full animate-pulse flex-col items-center justify-center gap-2 rounded-lg border border-gray-100 bg-gray-100">
      <Shimmer className="h-8 w-10 rounded" />
      <Shimmer className="h-px w-8 rounded-full bg-gray-200" />
      <Shimmer className="h-2.5 w-14 rounded" />
      <Shimmer className="mt-1 h-5 w-16 rounded-full" />
    </div>
  );
}

function LegendSkeleton() {
  return (
    <div className="flex flex-wrap gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <Shimmer className="h-3 w-3 rounded-full" />
          <Shimmer className="h-3 w-14 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function RoomPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="mx-auto mt-8 max-w-screen-2xl space-y-8 px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <Shimmer key={i} className="h-9 w-24 rounded-lg" />
            ))}
          </div>
          <Shimmer className="h-10 w-full max-w-sm rounded-xl" />
        </div>

        <LegendSkeleton />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[...Array(18)].map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
