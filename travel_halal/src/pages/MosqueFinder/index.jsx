import { useState } from 'react'
import { useGeolocation }  from '../../hooks/useGeolocation'
import { useOverpass }     from '../../hooks/useOverpass'
import { mosqueQuery }     from '../../utils/overpassQueries'
import { haversine }       from '../../utils/haversine'
import { SkeletonList }    from '../../components/SkeletonCard'
import LoadingSpinner      from '../../components/LoadingSpinner'
import ErrorBanner         from '../../components/ErrorBanner'
import MosqueMap           from './MosqueMap'
import MosqueList          from './MosqueList'

export default function MosqueFinder() {
  const [flyTarget, setFlyTarget] = useState(null)
  const { coords, error: geoError, loading: geoLoading } = useGeolocation()
  const { data, loading, error } = useOverpass(coords, mosqueQuery, 'mosques')

  const mosques = data
    .map(el => ({
      id:       el.id,
      name:     el.tags?.name || el.tags?.['name:en'] || 'Mosque / Prayer Room',
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

  // Status banner message
  const statusBanner = () => {
    if (loading) return { type: 'loading', text: 'Finding nearby mosques…' }
    if (error)   return { type: 'error',   text: error }
    if (mosques.length > 0)
      return { type: 'success', text: `Found ${mosques.length} mosque${mosques.length !== 1 ? 's' : ''} within 5 km` }
    return { type: 'info', text: 'No mosques found within 5 km of your location.' }
  }
  const status = statusBanner()

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="mb-3">
        <h1 className="text-xl font-bold text-islamic-green flex items-center gap-2">
          🕌 Mosque Finder
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">
          Mosques within 5 km · Data from OpenStreetMap
        </p>
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

      {/* Map — compact height matching muslim-traveler-app */}
      <div className="rounded-xl overflow-hidden shadow border border-gray-200 mb-3"
           style={{ height: 260 }}>
        <MosqueMap
          mosques={mosques}
          userCoords={coords}
          loading={loading}
          flyTarget={flyTarget}
        />
      </div>

      {/* List */}
      {loading && <SkeletonList count={5} label="Fetching nearby mosques…" />}
      {!loading && !error && (
        <MosqueList mosques={mosques} onSelect={setFlyTarget} />
      )}
    </div>
  )
}
