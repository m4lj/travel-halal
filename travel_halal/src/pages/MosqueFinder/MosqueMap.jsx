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

// Custom green mosque marker using divIcon
function createMosqueIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:36px; height:36px; border-radius:50%;
      background:#1B5E20; border:3px solid #F9A825;
      display:flex; align-items:center; justify-content:center;
      font-size:18px; box-shadow:0 2px 8px rgba(0,0,0,0.3)
    ">🕌</div>`,
    iconSize:   [36, 36],
    iconAnchor: [18, 36],
    popupAnchor:[0, -36],
  })
}

// Auto-fit map bounds to markers
function FitBounds({ mosques, userCoords }) {
  const map = useMap()
  if (mosques.length > 0) {
    const points = [
      [userCoords.latitude, userCoords.longitude],
      ...mosques.slice(0, 10).map(m => [m.lat, m.lon]),
    ]
    map.fitBounds(points, { padding: [40, 40], maxZoom: 15 })
  }
  return null
}

export default function MosqueMap({ mosques, userCoords, loading }) {
  const mosqueIcon = createMosqueIcon()

  return (
    <MapContainer
      center={[userCoords.latitude, userCoords.longitude]}
      zoom={14}
      className="h-full w-full"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location */}
      <Circle
        center={[userCoords.latitude, userCoords.longitude]}
        radius={80}
        pathOptions={{ color: '#1B5E20', fillColor: '#2E7D32', fillOpacity: 0.5 }}
      />

      {!loading && mosques.map(m => (
        <Marker key={m.id} position={[m.lat, m.lon]} icon={mosqueIcon}>
          <Popup>
            <strong>{m.name}</strong>
            {m.distance != null && <><br />{m.distance < 1
              ? `${Math.round(m.distance * 1000)} m away`
              : `${m.distance.toFixed(2)} km away`}
            </>}
            {m.tags?.['addr:street'] && <><br />{m.tags['addr:street']}</>}
          </Popup>
        </Marker>
      ))}

      {!loading && mosques.length > 0 && (
        <FitBounds mosques={mosques} userCoords={userCoords} />
      )}
    </MapContainer>
  )
}
