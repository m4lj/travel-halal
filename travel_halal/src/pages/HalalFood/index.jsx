import { useState } from 'react'
import { RESTAURANTS, FILTER_COUNTRIES } from './featuredData'

function RestaurantCard({ r }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden
                    hover:shadow-md transition-all duration-150">
      {/* Top row */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-200
                        flex items-center justify-center text-3xl shrink-0">
          {r.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{r.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
            <span>📍</span> {r.city}, {r.country}
          </p>
          <span className="inline-block mt-1.5 px-2 py-0.5 bg-islamic-greenPale
                           text-islamic-green text-xs font-medium rounded-full">
            {r.cuisine}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-3">
        <p className="text-xs text-gray-600 leading-relaxed mb-2">{r.description}</p>
        <p className="text-xs text-orange-600 font-medium flex items-start gap-1.5">
          <span className="shrink-0 mt-0.5">🔥</span>
          <span>{r.viralReason}</span>
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {r.tags.map(t => (
            <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50
                      flex items-center justify-between">
        <span className="text-xs text-purple-600 flex items-center gap-1.5">
          <span>📸</span> {r.instagram}
        </span>
        <span className="text-xs text-gray-400">{r.country}</span>
      </div>
    </div>
  )
}

export default function HalalFood() {
  const [activeCountry, setActiveCountry] = useState('All')

  const filtered = activeCountry === 'All'
    ? RESTAURANTS
    : RESTAURANTS.filter(r => r.country === activeCountry)

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-xl font-bold text-islamic-green">🍽️ Halal Food Finder</h1>
        <p className="text-gray-500 text-xs mt-0.5">
          Globally renowned halal restaurants, manually curated and verified
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg px-4 py-2.5 mb-4
                      text-xs text-yellow-800 flex gap-2">
        <span className="shrink-0 mt-0.5">⚠️</span>
        <span>
          This list is <strong>manually curated</strong> — not live GPS data.
          Always verify halal certification locally (JAKIM, MUIS, MUI, etc.) before dining.
        </span>
      </div>

      {/* Country filter — horizontally scrollable on mobile */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none"
           style={{ scrollbarWidth: 'none' }}>
        {FILTER_COUNTRIES.map(c => (
          <button
            key={c}
            onClick={() => setActiveCountry(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap
                        border transition-all duration-150 shrink-0
              ${activeCountry === c
                ? 'bg-islamic-green text-white border-islamic-green'
                : 'bg-white text-gray-600 border-gray-300 hover:border-islamic-green hover:text-islamic-green'
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Restaurant list */}
      <div className="flex flex-col gap-3">
        {filtered.map(r => <RestaurantCard key={r.id} r={r} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">🍽️</p>
          <p className="text-sm">No restaurants for this country yet.</p>
        </div>
      )}
    </div>
  )
}
