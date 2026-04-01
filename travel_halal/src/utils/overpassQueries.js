/**
 * Mosque query — matches muslim-traveler-app exactly:
 * 3 km radius, both religion tag variants, timeout 25, out center
 */
export function mosqueQuery(lat, lon, radius = 3000) {
  return `[out:json][timeout:25];
(
  node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
  way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
  node["amenity"="place_of_worship"]["religion"="Islam"](around:${radius},${lat},${lon});
  way["amenity"="place_of_worship"]["religion"="Islam"](around:${radius},${lat},${lon});
);
out center;`
}

/**
 * Halal food query — kept for completeness but the HalalFood page
 * now uses a static curated list instead of live Overpass data.
 */
export function halalFoodQuery(lat, lon, radius = 3000) {
  return `[out:json][timeout:25];
(
  node["amenity"="restaurant"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
  node["amenity"="fast_food"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
  node["amenity"="cafe"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
  way["amenity"="restaurant"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
  way["amenity"="fast_food"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
);
out center;`
}
