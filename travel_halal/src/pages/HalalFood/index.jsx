import { useState } from 'react'
import { useGeolocation }  from '../../hooks/useGeolocation'
import { useOverpass }     from '../../hooks/useOverpass'
import { halalFoodQuery }  from '../../utils/overpassQueries'
import { haversine }       from '../../utils/haversine'
import { SkeletonList }    from '../../components/SkeletonCard'
import LoadingSpinner      from '../../components/LoadingSpinner'
import ErrorBanner         from '../../components/ErrorBanner'
import FoodMap             from './FoodMap'
import FoodList            from './FoodList'
import FeaturedSection     from './FeaturedSection'

export default function HalalFood() {
  const [flyTarget, setFlyTarget] = useState(null)
  const { coords, error: geoError, loading: geoLoading } = useGeolocation()
  const { data, loading, error } = useOverpass(coords, halalFoodQuery, 'halal_food')

  const restaurants = data
    .map(el => ({
      id:       el.id,
      name:     el.tags?.name || 'Unnamed Restaurant',
      lat:      el.lat ?? el.center?.lat,
      lon:      el.lon ?? el.center?.lon,
      tags:     el.tags || {},
      cuisine:  el.tags?.cuisine?.replace(/_/g, ' ') || null,
      phone:    el.tags?.phone || el.tags?.['contact:phone'] || null,
      website:  el.tags?.website || el.tags?.['contact:website'] || null,
      opening:  el.tags?.opening_hours || null,
      distance: coords
        ? haversine(coords.latitude, coords.longitude,
                    el.lat ?? el.center?.lat, el.lon ?? el.center?.lon)
        : null,
    }))
    .filter(r => r.lat && r.lon)
    .sort((a, b) => a.distance - b.distance)

  if (geoLoading) return <LoadingSpinner message="Detecting your location…" />
  if (geoError)   return <ErrorBanner message={geoError} />

  // Status banner
  const statusBanner = () => {
    if (loading) return { type: 'loading', text: 'Finding halal restaurants near you…' }
    if (error)   return { type: 'error',   text: error }
    if (restaurants.length > 0)
      return { type: 'success', text: `Found ${restaurants.length} halal-tagged place${restaurants.length !== 1 ? 's' : ''} nearby` }
    return { type: 'info', text: 'No halal-tagged spots found within 3 km. See featured section below.' }
  }
  const status = statusBanner()

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="mb-3">
        <h1 className="text-xl font-bold text-islamic-green">🍽️ Halal Food Finder</h1>
        <p className="text-gray-500 text-xs mt-0.5">Find halal restaurants near you · Globally certified spots below</p>
      </div>

      {/* Status banner */}
      <div className={`mb-3 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 border-l-4
        ${status.type === 'success' ? 'bg-green-50 text-islamic-green border-islamic-green'
        : status.type === 'error'   ? 'bg-red-50 text-red-700 border-red-400'
        : status.type === 'loading' ? 'bg-yellow-50 text-yellow-800 border-yellow-400'
        : 'bg-blue-50 text-blue-700 border-blue-400'}`}
      >
        {status.type === 'loading' && (
          <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        )}
        {status.type === 'success' && <span className="shrink-0">✅</span>}
        {status.type === 'error'   && <span className="shrink-0">⚠️</span>}
        {status.type === 'info'    && <span className="shrink-0">ℹ️</span>}
        <span>{status.text}</span>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg px-4 py-2.5 mb-3 text-xs text-yellow-800 flex gap-2">
        <span className="shrink-0 mt-0.5">⚠️</span>
        <span>Nearby results are <strong>self-reported</strong> by OSM contributors.
          Always verify halal certification locally (JAKIM, MUIS, MUI, etc.).</span>
      </div>

      {/* Map — compact height */}
      <div className="rounded-xl overflow-hidden shadow border border-gray-200 mb-3"
           style={{ height: 260 }}>
        <FoodMap
          restaurants={restaurants}
          userCoords={coords}
          flyTarget={flyTarget}
        />
      </div>

      {loading && <SkeletonList count={5} label="Finding halal restaurants near you…" />}
      {!loading && !error && <FoodList restaurants={restaurants} onSelect={setFlyTarget} />}

      <FeaturedSection />
    </div>
  )
}
