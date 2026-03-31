import { useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix broken default marker icons in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon   from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl:       markerIcon,
  shadowUrl:     markerShadow,
})

// ---- Teardrop mosque marker (matches muslim-traveler-app style) ----
function createMosqueIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:34px; height:34px;
      background:#1B5E20;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      border:2px solid white;
    "><span style="transform:rotate(45deg); font-size:16px; line-height:1;">🕌</span></div>`,
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
      animation:userPulse 1.5s infinite;
    "></div>
    <style>
      @keyframes userPulse {
        0%  { box-shadow: 0 0 0 3px rgba(21,101,192,0.3); }
        50% { box-shadow: 0 0 0 9px rgba(21,101,192,0.0); }
        100%{ box-shadow: 0 0 0 3px rgba(21,101,192,0.3); }
      }
    </style>`,
    iconSize:   [16, 16],
    iconAnchor: [8, 8],
  })
}

// ---- FlyTo component: allow list items to pan the map ----
function MapController({ flyTarget }) {
  const map = useMap()
  useEffect(() => {
    if (flyTarget) {
      map.flyTo([flyTarget.lat, flyTarget.lon], 17, { duration: 1 })
    }
  }, [flyTarget, map])
  return null
}

// ---- Auto-fit all markers on first load ----
function FitBounds({ mosques, userCoords }) {
  const map = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (!fitted.current && mosques.length > 0) {
      fitted.current = true
      const points = [
        [userCoords.latitude, userCoords.longitude],
        ...mosques.slice(0, 10).map(m => [m.lat, m.lon]),
      ]
      map.fitBounds(points, { padding: [40, 40], maxZoom: 15 })
    }
  }, [mosques, userCoords, map])

  return null
}

export default function MosqueMap({ mosques, userCoords, loading, flyTarget }) {
  const mosqueIcon = createMosqueIcon()
  const userIcon   = createUserIcon()

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

      {/* User location — pulsing dot + light accuracy circle */}
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

      {/* Mosque markers */}
      {!loading && mosques.map(m => (
        <Marker key={m.id} position={[m.lat, m.lon]} icon={mosqueIcon}>
          <Popup>
            <div style={{ fontWeight: 600, color: '#1B5E20', marginBottom: 3 }}>🕌 {m.name}</div>
            {m.distance != null && (
              <div style={{ fontSize: 12, color: '#757575' }}>
                📍 {m.distance < 1
                  ? `${Math.round(m.distance * 1000)} m away`
                  : `${m.distance.toFixed(1)} km away`}
              </div>
            )}
            {m.tags?.['addr:street'] && (
              <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>{m.tags['addr:street']}</div>
            )}
          </Popup>
        </Marker>
      ))}

      <FitBounds mosques={mosques} userCoords={userCoords} />
      {flyTarget && <MapController flyTarget={flyTarget} />}
    </MapContainer>
  )
}
