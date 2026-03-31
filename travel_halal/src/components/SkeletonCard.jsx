/**
 * Skeleton loading components — pulsing placeholders while Overpass data loads.
 * Match the real card dimensions so layout doesn't shift on data arrival.
 */
export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-2 min-w-0">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-5 bg-gray-100 rounded w-1/4 mt-2 rounded-full" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-gray-100 shrink-0" />
      </div>
    </div>
  )
}

export function SkeletonList({ count = 6, label = 'Loading nearby results…' }) {
  return (
    <div>
      <div className="h-5 bg-gray-100 rounded w-40 mb-3 animate-pulse" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">{label}</p>
    </div>
  )
}
