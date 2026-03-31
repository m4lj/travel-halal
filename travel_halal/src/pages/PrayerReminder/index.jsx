import { useGeolocation }  from '../../hooks/useGeolocation'
import { usePrayerTimes }  from '../../hooks/usePrayerTimes'
import { getAuthorityName } from './methodMap'
import LoadingSpinner      from '../../components/LoadingSpinner'
import ErrorBanner         from '../../components/ErrorBanner'
import PrayerTimes         from './PrayerTimes'
import Countdown           from './Countdown'
import HijriDate           from './HijriDate'

export default function PrayerReminder() {
  const { coords, error: geoError, loading: geoLoading } = useGeolocation()
  const { times, hijri, loading, error } = usePrayerTimes(coords)

  const tz        = Intl.DateTimeFormat().resolvedOptions().timeZone
  const authority = getAuthorityName(tz)

  if (geoLoading || loading) return <LoadingSpinner message="Fetching prayer times…" />
  if (geoError)  return <ErrorBanner message={geoError} />
  if (error)     return <ErrorBanner message={error} />

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-islamic-green">🕐 Prayer Times</h1>
        <p className="text-sm text-gray-400 mt-1">
          Calculated using <span className="text-islamic-green font-medium">{authority}</span>
        </p>
      </div>

      {hijri && <HijriDate hijri={hijri} />}
      {times && <Countdown times={times} />}
      {times && <PrayerTimes times={times} />}
    </div>
  )
}
