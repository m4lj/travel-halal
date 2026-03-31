import FoodCard from './FoodCard'

export default function FoodList({ restaurants }) {
  if (!restaurants.length) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200 mb-6">
        <p className="text-4xl mb-3">🍽️</p>
        <p className="font-medium">No halal-tagged restaurants found within 3 km.</p>
        <p className="text-sm mt-1">OSM data may be sparse here. See featured spots below.</p>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        {restaurants.length} halal-tagged place{restaurants.length !== 1 ? 's' : ''} nearby
        <span className="text-xs font-normal text-gray-400 ml-2">(self-reported)</span>
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map(r => <FoodCard key={r.id} restaurant={r} />)}
      </div>
    </div>
  )
}
