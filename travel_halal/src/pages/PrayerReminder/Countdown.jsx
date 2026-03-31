import { useState, useEffect } from 'react'

// Aladhan returns Dhuhr — shown as "Dhuhr" to match standard naming
// Sunrise is shown on the times card but excluded from the countdown
// (it's not a fard prayer — no need to "count down" to it)
const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

function timeToSeconds(timeStr) {
  if (!timeStr) return 0
  // Strip any trailing text like " (UTC)" just in case
  const clean = timeStr.split(' ')[0]
  const [h, m, s = 0] = clean.split(':').map(Number)
  return h * 3600 + m * 60 + s
}

function nowInSeconds() {
  const n = new Date()
  return n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds()
}

function getNextPrayer(times) {
  const currentSec = nowInSeconds()

  for (const name of PRAYERS) {
    const prayerSec = timeToSeconds(times[name])
    if (prayerSec > currentSec) {
      return { name, secondsLeft: prayerSec - currentSec }
    }
  }
  // Past Isha — next is Fajr tomorrow
  const fajrSec = timeToSeconds(times['Fajr'])
  return { name: 'Fajr', secondsLeft: (24 * 3600 - currentSec) + fajrSec }
}

function formatCountdown(totalSeconds) {
  const s = Math.max(0, totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map(v => String(v).padStart(2, '0')).join(':')
}

export default function Countdown({ times }) {
  const [next, setNext] = useState(null)

  useEffect(() => {
    function tick() {
      setNext(getNextPrayer(times))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [times])

  if (!next) return null

  return (
    <div className="bg-islamic-green text-white rounded-2xl px-6 py-6 mb-6 text-center shadow-lg">
      <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Next Prayer</p>
      <p className="text-3xl font-bold text-islamic-gold">{next.name}</p>
      <p className="font-mono text-5xl font-semibold mt-3 tabular-nums tracking-wider">
        {formatCountdown(next.secondsLeft)}
      </p>
      <p className="text-xs opacity-50 mt-2">hh : mm : ss remaining</p>
    </div>
  )
}
