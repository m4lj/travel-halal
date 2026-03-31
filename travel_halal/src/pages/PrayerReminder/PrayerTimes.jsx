import { useState, useEffect } from 'react'

// Aladhan returns Dhuhr — shown as "Dhuhr" to match standard naming
const PRAYER_ORDER = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
const ICONS = {
  Fajr:    '🌙',
  Sunrise: '🌅',
  Dhuhr:   '☀️',
  Asr:     '🌤️',
  Maghrib: '🌇',
  Isha:    '⭐',
}

function timeToSeconds(timeStr) {
  if (!timeStr) return 0
  const clean = timeStr.split(' ')[0]
  const [h, m, s = 0] = clean.split(':').map(Number)
  return h * 3600 + m * 60 + s
}

function getCurrentAndNext(times) {
  const now = new Date()
  const currentSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

  let current = PRAYER_ORDER[PRAYER_ORDER.length - 1]
  let next    = PRAYER_ORDER[0]

  for (let i = 0; i < PRAYER_ORDER.length; i++) {
    const pSec = timeToSeconds(times[PRAYER_ORDER[i]])
    if (pSec > currentSec) {
      next    = PRAYER_ORDER[i]
      current = PRAYER_ORDER[i > 0 ? i - 1 : PRAYER_ORDER.length - 1]
      break
    }
  }
  return { current, next }
}

// Convert 24h "HH:mm" or "HH:mm:ss" to 12h "h:mm AM/PM"
function to12h(t) {
  if (!t) return '--:--'
  const clean = t.split(' ')[0]
  const [h, m] = clean.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 || 12
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`
}

export default function PrayerTimes({ times }) {
  const [highlight, setHighlight] = useState({ current: '', next: '' })

  useEffect(() => {
    function update() { setHighlight(getCurrentAndNext(times)) }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [times])

  return (
    <div className="space-y-2">
      {PRAYER_ORDER.map(name => {
        const isCurrent = highlight.current === name
        const isNext    = highlight.next    === name
        return (
          <div
            key={name}
            className={`flex justify-between items-center rounded-xl px-4 py-3 shadow-sm transition-all
              ${isCurrent
                ? 'bg-islamic-green text-white border border-islamic-green'
                : isNext
                ? 'bg-islamic-greenPale border border-islamic-green text-gray-800'
                : 'bg-white border border-gray-200 text-gray-800 hover:border-islamic-green'
              }`}
          >
            <span className="flex items-center gap-3 font-medium">
              <span className="text-xl">{ICONS[name]}</span>
              {name}
              {isCurrent && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Current</span>
              )}
              {isNext && (
                <span className="text-xs bg-islamic-green text-white px-2 py-0.5 rounded-full">Next</span>
              )}
            </span>
            <span className={`font-mono font-semibold text-lg
              ${isCurrent ? 'text-islamic-gold' : 'text-islamic-green'}`}>
              {to12h(times[name])}
            </span>
          </div>
        )
      })}
    </div>
  )
}
