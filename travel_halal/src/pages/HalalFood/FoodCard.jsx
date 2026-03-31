import { FaUtensils, FaDirections, FaPhone, FaExternalLinkAlt } from 'react-icons/fa'
import { formatDistance } from '../../utils/haversine'

export default function FoodCard({ restaurant, onSelect }) {
  const { name, distance, cuisine, phone, website, opening, tags } = restaurant
  const address = [tags?.['addr:street'], tags?.['addr:city']].filter(Boolean).join(', ')
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lon}`

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm
                 hover:shadow-md hover:border-islamic-gold transition-all duration-150
                 cursor-pointer active:scale-[0.98]"
      onClick={() => onSelect?.(restaurant)}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-islamic-goldLight flex items-center justify-center shrink-0">
          <FaUtensils className="text-islamic-goldDark text-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          {cuisine && <p className="text-xs text-islamic-green font-medium mt-0.5 capitalize">{cuisine}</p>}
          {address && <p className="text-xs text-gray-500 mt-0.5 truncate">{address}</p>}
          {opening && <p className="text-xs text-gray-400 mt-0.5">⏰ {opening}</p>}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {distance != null && (
              <span className="text-xs bg-islamic-goldLight text-islamic-goldDark px-2 py-0.5 rounded-full font-medium">
                📍 {formatDistance(distance)}
              </span>
            )}
            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
              🟢 Halal tagged
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
             className="w-8 h-8 flex items-center justify-center rounded-lg
                        bg-islamic-green/10 hover:bg-islamic-green/20 text-islamic-green transition-colors"
             title="Get directions"
             onClick={e => e.stopPropagation()}>
            <FaDirections className="text-base" />
          </a>
          {phone && (
            <a href={`tel:${phone}`}
               className="w-8 h-8 flex items-center justify-center rounded-lg
                          bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
               title="Call"
               onClick={e => e.stopPropagation()}>
              <FaPhone className="text-sm" />
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 flex items-center justify-center rounded-lg
                          bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors"
               title="Website"
               onClick={e => e.stopPropagation()}>
              <FaExternalLinkAlt className="text-sm" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
