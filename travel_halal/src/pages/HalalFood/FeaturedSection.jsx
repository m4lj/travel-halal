import { FaStar, FaExternalLinkAlt } from 'react-icons/fa'
import { FEATURED_RESTAURANTS } from './featuredData'

export default function FeaturedSection() {
  return (
    <section className="mt-4 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-1">
        <FaStar className="text-islamic-gold text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Featured & Viral Halal Spots</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Globally renowned halal restaurants, manually curated and verified.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_RESTAURANTS.map(r => (
          <div
            key={r.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm
                       hover:shadow-md hover:border-islamic-gold transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-3xl">{r.emoji}</span>
              {r.viral && (
                <span className="text-xs bg-islamic-gold text-white px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                  🔥 Viral
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">{r.name}</h3>
            <p className="text-xs text-islamic-green font-medium mt-0.5">{r.city}</p>
            <p className="text-xs text-gray-500 italic mt-0.5">{r.cuisine}</p>
            <p className="text-xs text-gray-700 mt-2 leading-relaxed">{r.description}</p>
            {r.website && (
              <a
                href={r.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-islamic-gold
                           hover:text-islamic-goldDark font-medium hover:underline"
              >
                Visit website <FaExternalLinkAlt className="text-[10px]" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
