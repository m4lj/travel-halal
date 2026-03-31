import { useState, useEffect } from 'react'
import { cacheGet, cacheSet } from '../utils/sessionCache'

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

export function useOverpass(coords, queryFn, cacheKey) {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!coords) return

    const key = `${cacheKey}_${coords.latitude.toFixed(3)}_${coords.longitude.toFixed(3)}`
    const cached = cacheGet(key)
    if (cached) { setData(cached); return }

    setLoading(true)
    setError(null)

    const query = queryFn(coords.latitude, coords.longitude)
    fetch(OVERPASS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`,
    })
      .then(res => {
        if (!res.ok) throw new Error(`Overpass API error (${res.status})`)
        return res.json()
      })
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
