import { useGeolocation }  from '../../hooks/useGeolocation'
import { useOverpass }     from '../../hooks/useOverpass'
import { halalFoodQuery }  from '../../utils/overpassQueries'
import { haversine }       from '../../utils/haversine'
import LoadingSpinner      from '../../components/LoadingSpinner'
import ErrorBanner         from '../../components/ErrorBanner'
import FoodMap             from './FoodMap'
import FoodList            from './FoodList'
import FeaturedSection     from './FeaturedSection'

export default function HalalFood() {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-islamic-green">🍽️ Halal Food Finder</h1>
        <p className="text-gray-500 text-sm mt-1">Find halal restaurants near you · Globally certified spots below</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3 mb-5 text-sm text-yellow-800 flex gap-2">
        <span className="text-lg leading-tight">⚠️</span>
        <div>
          <strong>Important:</strong> Nearby results are self-reported by OpenStreetMap contributors.
          Always <strong>verify halal certification locally</strong> (JAKIM, MUIS, MUI, etc.) before dining.
          The Featured section below is manually curated.
        </div>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-md mb-6" style={{ height: '60vh', minHeight: '420px' }}>
        <FoodMap restaurants={restaurants} userCoords={coords} />
      </div>

      {loading && <LoadingSpinner message="Finding halal restaurants near you…" />}
      {error   && <ErrorBanner message={error} />}
      {!loading && <FoodList restaurants={restaurants} />}

      {/* Always show featured */}
      <FeaturedSection />
    </div>
  )
}
