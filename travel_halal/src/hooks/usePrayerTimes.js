import { useState, useEffect } from 'react'
import { getMethodId } from '../pages/PrayerReminder/methodMap'
import { cacheGet, cacheSet } from '../utils/sessionCache'

// Aladhan API — free, CORS-safe, lat/lon directly (no city lookup needed)
// Docs: https://aladhan.com/prayer-times-api
// Endpoint: /v1/timings/{UNIX_TIMESTAMP} — date-less base URL returns 302 redirect
const ALADHAN_BASE = 'https://api.aladhan.com/v1/timings'

export function usePrayerTimes(coords) {
  const [times,   setTimes]   = useState(null)
  const [hijri,   setHijri]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!coords) return

    const tz       = Intl.DateTimeFormat().resolvedOptions().timeZone
    const methodId = getMethodId(tz)
    const today    = new Date()
    const dateKey  = today.toISOString().slice(0, 10)
    const cacheKey = `prayer_al_${dateKey}_${coords.latitude.toFixed(2)}_${coords.longitude.toFixed(2)}`

    const cached = cacheGet(cacheKey)
    if (cached) {
      setTimeout(() => {
        setTimes(cached.times)
        setHijri(cached.hijri)
      }, 0)
      return
    }

    setLoading(true)
    setError(null)

    // Aladhan: GET /v1/timings/{UNIX_TIMESTAMP}?latitude=X&longitude=Y&method=ID
    // Using timestamp-based endpoint avoids the 302 redirect from the bare base URL
    // Returns data.timings: { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, ... }
    // Returns data.date.hijri: { day, month: { en }, year }
    const unixTs = Math.floor(today.getTime() / 1000)
    const url = `${ALADHAN_BASE}/${unixTs}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${methodId}`
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Prayer API error (${r.status})`)
        return r.json()
      })
      .then(data => {
        const raw = data.data.timings
        const times = {
          Fajr:    raw.Fajr,
          Sunrise: raw.Sunrise,
          Dhuhr:   raw.Dhuhr,
          Asr:     raw.Asr,
          Maghrib: raw.Maghrib,
          Isha:    raw.Isha,
        }
        // Use Aladhan's official Hijri date — accurate, no local calculation needed
        const h = data.data.date.hijri
        const hijri = {
          day:   parseInt(h.day, 10),
          month: { en: h.month.en },
          year:  parseInt(h.year, 10),
        }
        cacheSet(cacheKey, { times, hijri }, 6 * 60 * 60 * 1000)
        setTimes(times)
        setHijri(hijri)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [coords])

  return { times, hijri, loading, error }
}
