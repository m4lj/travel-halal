import { describe, it, expect } from 'vitest'
import { haversine, formatDistance } from './haversine'

describe('haversine', () => {
  it('returns 0 for same point', () => {
    expect(haversine(3.139, 101.687, 3.139, 101.687)).toBe(0)
  })

  it('calculates distance between KL and Singapore (~310 km)', () => {
    const dist = haversine(3.139, 101.687, 1.352, 103.82)
    expect(dist).toBeGreaterThan(300)
    expect(dist).toBeLessThan(320)
  })

  it('calculates short distance accurately (~1.1 km)', () => {
    // ~1.1 km apart in KL
    const dist = haversine(3.1390, 101.6869, 3.1390, 101.6970)
    expect(dist).toBeGreaterThan(1.0)
    expect(dist).toBeLessThan(1.2)
  })

  it('is symmetric — A→B equals B→A', () => {
    const d1 = haversine(3.0, 101.0, 4.0, 102.0)
    const d2 = haversine(4.0, 102.0, 3.0, 101.0)
    expect(d1).toBeCloseTo(d2, 8)
  })
})

describe('formatDistance', () => {
  it('formats distances under 1 km in metres', () => {
    expect(formatDistance(0.5)).toBe('500 m')
    expect(formatDistance(0.123)).toBe('123 m')
  })

  it('formats distances 1 km and over in km', () => {
    expect(formatDistance(1.0)).toBe('1.00 km')
    expect(formatDistance(5.678)).toBe('5.68 km')
  })

  it('rounds metres to nearest whole number', () => {
    expect(formatDistance(0.9999)).toBe('1000 m')
  })
})
