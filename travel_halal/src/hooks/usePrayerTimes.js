import { useState, useEffect } from 'react'
import { getMethodId } from '../pages/PrayerReminder/methodMap'
import { cacheGet, cacheSet } from '../utils/sessionCache'

// Aladhan API — free, CORS-safe, lat/lon directly (no city lookup needed)
// Docs: https://aladhan.com/prayer-times-api
const ALADHAN_BASE = 'https://api.aladhan.com/v1/timings'

/**
 * Client-side Hijri date calculation (Kuwaiti algorithm).
 * Accurate to ±1 day — sufficient for display purposes.
 */
function toHijri(date) {
  const jd = Math.floor((14 + 11 * (date.getFullYear()) + Math.floor((date.getMonth() + 1 + 9) / 12)) / 30)
    + Math.floor(275 * (date.getMonth() + 1) / 9)
    + date.getDate()
    + 1721013.5
    - Math.floor(date.getTimezoneOffset() / 1440)

  // JD to Hijri
  const z    = Math.floor(jd) + 0.5
  const a    = Math.floor((z - 1867216.25) / 36524.25)
  const aa   = z + 1 + a - Math.floor(a / 4)
  const b    = aa + 1524
  const c    = Math.floor((b - 122.1) / 365.25)
  const d    = Math.floor(365.25 * c)
  const e    = Math.floor((b - d) / 30.6001)
  const day  = b - d - Math.floor(30.6001 * e)
  const month = e < 14 ? e - 1 : e - 13
  const year = month > 2 ? c - 4716 : c - 4715

  // Gregorian day number → Julian Day Number
  const gJD = Math.floor(365.25 * (year + 4716))
    + Math.floor(30.6001 * (month + 1))
    + day - 1524.5

  // JD to Hijri (simple approximation)
  const n   = gJD - 2415078.5
  const hY  = Math.floor(n / 354.3671)
  const rem = n - hY * 354.3671
  const hM  = Math.floor(rem / 29.53059) + 1
  const hD  = Math.floor(rem - (hM - 1) * 29.53059) + 1

  const HIJRI_MONTHS = [
    'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah',
  ]

  return {
    day:   hD,
    month: { en: HIJRI_MONTHS[(hM - 1) % 12] || HIJRI_MONTHS[0] },
    year:  1400 + Math.floor((date - new Date('1980-01-01')) / (354.3671 * 24 * 3600 * 1000)),
  }
}

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

    // Aladhan: GET /v1/timings?latitude=X&longitude=Y&method=ID
    // Returns data.timings: { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, ... }
    const url = `${ALADHAN_BASE}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${methodId}`
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Prayer API error (${r.status})`)
        return r.json()
      })
      .then(data => {
        // Aladhan returns "Dhuhr" — remap to "Zuhr" for display consistency
        const raw = data.data.timings
        const times = {
          Fajr:    raw.Fajr,
          Zuhr:    raw.Dhuhr,
          Asr:     raw.Asr,
          Maghrib: raw.Maghrib,
          Isha:    raw.Isha,
        }
        const hijri = toHijri(today)
        cacheSet(cacheKey, { times, hijri }, 6 * 60 * 60 * 1000)
        setTimes(times)
        setHijri(hijri)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [coords])

  return { times, hijri, loading, error }
}
