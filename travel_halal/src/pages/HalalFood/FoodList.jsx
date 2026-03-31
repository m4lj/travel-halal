import FoodCard from './FoodCard'

export default function FoodList({ restaurants, onSelect }) {
  if (!restaurants.length) {
    return (
      <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-gray-200 mb-4">
        <p className="text-4xl mb-3">🍽️</p>
        <p className="font-medium text-gray-600">No halal-tagged restaurants found within 3 km.</p>
        <p className="text-sm mt-1">OSM data may be sparse here. See featured spots below.</p>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Nearby ({restaurants.length} found)
        <span className="ml-1 normal-case font-normal text-gray-400">· self-reported</span>
      </h2>
      <div className="flex flex-col gap-2">
        {restaurants.map(r => (
          <FoodCard key={r.id} restaurant={r} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
