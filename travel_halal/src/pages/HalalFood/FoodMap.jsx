import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
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

function createFoodIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:36px; height:36px; border-radius:50%;
      background:#F9A825; border:3px solid #1B5E20;
      display:flex; align-items:center; justify-content:center;
      font-size:18px; box-shadow:0 2px 8px rgba(0,0,0,0.3)
    ">🍽️</div>`,
    iconSize:   [36, 36],
    iconAnchor: [18, 36],
    popupAnchor:[0, -36],
  })
}

export default function FoodMap({ restaurants, userCoords }) {
  const foodIcon = createFoodIcon()

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
      <Circle
        center={[userCoords.latitude, userCoords.longitude]}
        radius={80}
        pathOptions={{ color: '#1B5E20', fillColor: '#2E7D32', fillOpacity: 0.5 }}
      />
      {restaurants.map(r => (
        <Marker key={r.id} position={[r.lat, r.lon]} icon={foodIcon}>
          <Popup>
            <strong>{r.name}</strong>
            {r.cuisine && <><br />{r.cuisine}</>}
            {r.distance != null && <><br />
              {r.distance < 1
                ? `${Math.round(r.distance * 1000)} m away`
                : `${r.distance.toFixed(2)} km away`}
            </>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
