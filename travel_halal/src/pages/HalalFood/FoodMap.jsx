import { useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon   from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl:       markerIcon,
  shadowUrl:     markerShadow,
})

// ---- Teardrop food marker ----
function createFoodIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:34px; height:34px;
      background:#F9A825;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      border:2px solid white;
    "><span style="transform:rotate(45deg); font-size:16px; line-height:1;">🍽️</span></div>`,
    iconSize:    [34, 34],
    iconAnchor:  [17, 34],
    popupAnchor: [0, -36],
  })
}

// ---- Pulsing blue user-location dot ----
function createUserIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:16px; height:16px;
      background:#1565C0;
      border-radius:50%;
      border:3px solid white;
      box-shadow:0 0 0 3px rgba(21,101,192,0.3);
      animation:userPulse2 1.5s infinite;
    "></div>
    <style>
      @keyframes userPulse2 {
        0%  { box-shadow: 0 0 0 3px rgba(21,101,192,0.3); }
        50% { box-shadow: 0 0 0 9px rgba(21,101,192,0.0); }
        100%{ box-shadow: 0 0 0 3px rgba(21,101,192,0.3); }
      }
    </style>`,
    iconSize:   [16, 16],
    iconAnchor: [8, 8],
  })
}

function MapController({ flyTarget }) {
  const map = useMap()
  useEffect(() => {
    if (flyTarget) {
      map.flyTo([flyTarget.lat, flyTarget.lon], 17, { duration: 1 })
    }
  }, [flyTarget, map])
  return null
}

function FitBounds({ restaurants, userCoords }) {
  const map = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (!fitted.current && restaurants.length > 0) {
      fitted.current = true
      const points = [
        [userCoords.latitude, userCoords.longitude],
        ...restaurants.slice(0, 10).map(r => [r.lat, r.lon]),
      ]
      map.fitBounds(points, { padding: [40, 40], maxZoom: 15 })
    }
  }, [restaurants, userCoords, map])

  return null
}

export default function FoodMap({ restaurants, userCoords, flyTarget }) {
  const foodIcon = createFoodIcon()
  const userIcon = createUserIcon()

  if (!userCoords) return null

  return (
    <MapContainer
      center={[userCoords.latitude, userCoords.longitude]}
      zoom={15}
      className="h-full w-full"
      scrollWheelZoom={false}
      zoomControl={true}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      {/* User location */}
      <Marker
        position={[userCoords.latitude, userCoords.longitude]}
        icon={userIcon}
        zIndexOffset={1000}
      >
        <Popup>
          <span style={{ fontWeight: 600, color: '#1B5E20' }}>📍 You are here</span>
        </Popup>
      </Marker>
      <Circle
        center={[userCoords.latitude, userCoords.longitude]}
        radius={50}
        pathOptions={{ color: '#1565C0', fillColor: '#1565C0', fillOpacity: 0.08, weight: 1 }}
      />

      {/* Restaurant markers */}
      {restaurants.map(r => (
        <Marker key={r.id} position={[r.lat, r.lon]} icon={foodIcon}>
          <Popup>
            <div style={{ fontWeight: 600, color: '#1B5E20', marginBottom: 3 }}>🍽️ {r.name}</div>
            {r.cuisine && (
              <div style={{ fontSize: 12, color: '#757575' }}>{r.cuisine}</div>
            )}
            {r.distance != null && (
              <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>
                📍 {r.distance < 1
                  ? `${Math.round(r.distance * 1000)} m away`
                  : `${r.distance.toFixed(1)} km away`}
              </div>
            )}
          </Popup>
        </Marker>
      ))}

      <FitBounds restaurants={restaurants} userCoords={userCoords} />
      {flyTarget && <MapController flyTarget={flyTarget} />}
    </MapContainer>
  )
}
