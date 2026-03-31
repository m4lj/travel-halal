import { FaMosque, FaDirections } from 'react-icons/fa'
import { formatDistance } from '../../utils/haversine'

export default function MosqueCard({ mosque }) {
  const { name, distance, tags } = mosque
  const address = [tags?.['addr:street'], tags?.['addr:city']].filter(Boolean).join(', ')
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lon}`

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm
                    hover:shadow-md hover:border-islamic-green transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-islamic-greenPale flex items-center
                        justify-content-center shrink-0 flex items-center justify-center">
          <FaMosque className="text-islamic-green text-xl" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          {address && <p className="text-xs text-gray-500 mt-0.5 truncate">{address}</p>}
          {distance != null && (
            <span className="inline-block mt-2 text-xs bg-islamic-greenPale text-islamic-green
                             px-2 py-0.5 rounded-full font-medium">
              📍 {formatDistance(distance)}
            </span>
          )}
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-8 h-8 flex items-center justify-center
                     rounded-lg bg-islamic-gold/10 hover:bg-islamic-gold/20
                     text-islamic-goldDark transition-colors"
          title="Get directions"
        >
          <FaDirections className="text-base" />
        </a>
      </div>
    </div>
  )
}
