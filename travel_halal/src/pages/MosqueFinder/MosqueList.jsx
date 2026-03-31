import MosqueCard from './MosqueCard'

export default function MosqueList({ mosques }) {
  if (!mosques.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-4xl mb-3">🕌</p>
        <p className="font-medium">No mosques found within 5 km.</p>
        <p className="text-sm mt-1">Try moving to a different area or check your connection.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        {mosques.length} mosque{mosques.length !== 1 ? 's' : ''} found nearby
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mosques.map(m => <MosqueCard key={m.id} mosque={m} />)}
      </div>
    </div>
  )
}
