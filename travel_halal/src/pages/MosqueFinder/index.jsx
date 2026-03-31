import { useGeolocation }  from '../../hooks/useGeolocation'
import { useOverpass }     from '../../hooks/useOverpass'
import { mosqueQuery }     from '../../utils/overpassQueries'
import { haversine }       from '../../utils/haversine'
import LoadingSpinner      from '../../components/LoadingSpinner'
import ErrorBanner         from '../../components/ErrorBanner'
import MosqueMap           from './MosqueMap'
import MosqueList          from './MosqueList'

export default function MosqueFinder() {
  const { coords, error: geoError, loading: geoLoading } = useGeolocation()
  const { data, loading, error } = useOverpass(coords, mosqueQuery, 'mosques')

  const mosques = data
    .map(el => ({
      id:       el.id,
      name:     el.tags?.name || el.tags?.['name:en'] || 'Unnamed Mosque',
      lat:      el.lat ?? el.center?.lat,
      lon:      el.lon ?? el.center?.lon,
      tags:     el.tags || {},
      distance: coords
        ? haversine(coords.latitude, coords.longitude,
                    el.lat ?? el.center?.lat, el.lon ?? el.center?.lon)
        : null,
    }))
    .filter(m => m.lat && m.lon)
    .sort((a, b) => a.distance - b.distance)

  if (geoLoading) return <LoadingSpinner message="Detecting your location…" />
  if (geoError)   return <ErrorBanner message={geoError} />

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-islamic-green">🕌 Mosque Finder</h1>
        <p className="text-gray-500 text-sm mt-1">
          Showing mosques within 5 km · Data from OpenStreetMap contributors
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-md mb-6" style={{ height: '400px' }}>
        <MosqueMap mosques={mosques} userCoords={coords} loading={loading} />
      </div>

      {loading && <LoadingSpinner message="Fetching nearby mosques…" />}
      {error   && <ErrorBanner message={error} />}
      {!loading && !error && <MosqueList mosques={mosques} />}
    </div>
  )
}
