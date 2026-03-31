import { useState, useEffect } from 'react'

export function useGeolocation() {
  const [coords,  setCoords]  = useState(null)
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setTimeout(() => {
        setError('Geolocation is not supported by your browser.')
        setLoading(false)
      }, 0)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        setLoading(false)
      },
      (err) => {
        setError(err.message || 'Location permission denied.')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }, [])

  return { coords, error, loading }
}
