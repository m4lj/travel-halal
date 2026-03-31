import { useState, useEffect } from 'react'
import { cacheGet, cacheSet } from '../utils/sessionCache'

// Primary + mirror fallback for Overpass API
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
]

/**
 * Fetch with retry across multiple Overpass mirrors.
 * Tries each endpoint once before giving up.
 */
async function fetchOverpass(query) {
  let lastError
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    `data=${encodeURIComponent(query)}`,
        signal:  AbortSignal.timeout(30000), // 30s per endpoint
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json
    } catch (err) {
      lastError = err
      // Try next mirror
    }
  }
  throw new Error(`All Overpass mirrors failed — ${lastError?.message}`)
}

export function useOverpass(coords, queryFn, cacheKey) {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!coords) return

    const key = `${cacheKey}_${coords.latitude.toFixed(3)}_${coords.longitude.toFixed(3)}`
    const cached = cacheGet(key)
    if (cached) { setTimeout(() => setData(cached), 0); return }

    setLoading(true)
    setError(null)

    const query = queryFn(coords.latitude, coords.longitude)
    fetchOverpass(query)
      .then(json => {
        const elements = json.elements || []
        cacheSet(key, elements)
        setData(elements)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [coords]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}
