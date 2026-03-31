import { useState, useEffect } from 'react'
import { getMethodForTimezone } from '../pages/PrayerReminder/methodMap'
import { cacheGet, cacheSet } from '../utils/sessionCache'

const BASE = 'https://api.aladhan.com/v1/timings'

export function usePrayerTimes(coords) {
  const [times,   setTimes]   = useState(null)
  const [hijri,   setHijri]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!coords) return

    const tz     = Intl.DateTimeFormat().resolvedOptions().timeZone
    const method = getMethodForTimezone(tz)
    const today  = new Date()
    const dd     = String(today.getDate()).padStart(2, '0')
    const mm     = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy   = today.getFullYear()
    const cacheKey = `prayer_${yyyy}${mm}${dd}_${coords.latitude.toFixed(2)}_${coords.longitude.toFixed(2)}_${method}`

    const cached = cacheGet(cacheKey)
    if (cached) { setTimes(cached.timings); setHijri(cached.hijri); return }

    setLoading(true)
    setError(null)

    const url = `${BASE}/${dd}-${mm}-${yyyy}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${method}`

    fetch(url)
      .then(r => { if (!r.ok) throw new Error('Aladhan API error'); return r.json() })
      .then(({ data }) => {
        setTimes(data.timings)
        setHijri(data.date.hijri)
        cacheSet(cacheKey, { timings: data.timings, hijri: data.date.hijri }, 6 * 60 * 60 * 1000)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [coords])

  return { times, hijri, loading, error }
}
