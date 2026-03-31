export function mosqueQuery(lat, lon, radius = 5000) {
  return `
    [out:json][timeout:28];
    (
      node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
      node["amenity"="place_of_worship"]["religion"="Islam"](around:${radius},${lat},${lon});
      way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
      way["amenity"="place_of_worship"]["religion"="Islam"](around:${radius},${lat},${lon});
    );
    out center tags;
  `.trim()
}

export function halalFoodQuery(lat, lon, radius = 3000) {
  return `
    [out:json][timeout:28];
    (
      node["amenity"="restaurant"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
      node["amenity"="fast_food"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
      node["amenity"="cafe"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
      way["amenity"="restaurant"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
      way["amenity"="fast_food"]["diet:halal"~"yes|only"](around:${radius},${lat},${lon});
    );
    out center tags;
  `.trim()
}
