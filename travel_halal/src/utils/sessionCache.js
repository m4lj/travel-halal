export function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { data, expires } = JSON.parse(raw)
    if (Date.now() > expires) { sessionStorage.removeItem(key); return null }
    return data
  } catch { return null }
}

export function cacheSet(key, data, ttlMs = 10 * 60 * 1000) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, expires: Date.now() + ttlMs }))
  } catch { /* quota exceeded — ignore */ }
}
