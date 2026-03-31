import { FaMosque, FaDirections, FaLocationArrow } from 'react-icons/fa'
import { formatDistance } from '../../utils/haversine'

export default function MosqueList({ mosques, onSelect }) {
  if (!mosques.length) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p className="text-4xl mb-3">🕌</p>
        <p className="font-medium text-gray-600">No mosques found within 5 km.</p>
        <p className="text-sm mt-1">Try moving to a different area or check your connection.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Nearby ({mosques.length} found)
      </h2>
      <div className="flex flex-col gap-2">
        {mosques.map(m => {
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`
          return (
            <div
              key={m.id}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl
                         px-3 py-3 shadow-sm cursor-pointer
                         hover:border-islamic-green hover:shadow-md
                         active:scale-[0.98] transition-all duration-150"
              onClick={() => onSelect?.(m)}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-islamic-green flex items-center
                              justify-center shrink-0">
                <FaMosque className="text-white text-lg" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{m.name}</p>
                {m.distance != null && (
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <FaLocationArrow className="text-[10px]" />
                    {formatDistance(m.distance)} away
                  </p>
                )}
              </div>

              {/* Directions button */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg
                           bg-islamic-gold/10 hover:bg-islamic-gold/20
                           text-islamic-goldDark transition-colors shrink-0"
                title="Get directions"
                onClick={e => e.stopPropagation()}
              >
                <FaDirections className="text-base" />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
