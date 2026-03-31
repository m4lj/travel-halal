import { useState, useEffect } from 'react'

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

// Strip " (UTC)" suffix from Aladhan time strings
function cleanTime(t) { return t?.split(' ')[0] ?? '00:00' }

function timeToMinutes(timeStr) {
  const [h, m] = cleanTime(timeStr).split(':').map(Number)
  return h * 60 + m
}

function getNextPrayer(times) {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  for (const name of PRAYERS) {
    const prayerMinutes = timeToMinutes(times[name])
    if (prayerMinutes > currentMinutes) {
      return { name, minutesLeft: prayerMinutes - currentMinutes }
    }
  }
  // Past Isha — next is Fajr tomorrow
  const fajrMinutes = timeToMinutes(times['Fajr'])
  return { name: 'Fajr', minutesLeft: (24 * 60 - currentMinutes) + fajrMinutes }
}

function formatCountdown(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':')
}

export default function Countdown({ times }) {
  const [next, setNext] = useState(null)

  useEffect(() => {
    function tick() {
      const { name, minutesLeft } = getNextPrayer(times)
      const now = new Date()
      const secondsLeft = minutesLeft * 60 - now.getSeconds()
      setNext({ name, secondsLeft: Math.max(0, secondsLeft) })
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
