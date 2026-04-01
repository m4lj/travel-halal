import { describe, it, expect } from 'vitest'
import { mosqueQuery, halalFoodQuery } from './overpassQueries'

describe('mosqueQuery', () => {
  it('returns a non-empty string', () => {
    const q = mosqueQuery(3.139, 101.687)
    expect(typeof q).toBe('string')
    expect(q.length).toBeGreaterThan(0)
  })

  it('includes the provided lat/lon', () => {
    const q = mosqueQuery(3.139, 101.687)
    expect(q).toContain('3.139')
    expect(q).toContain('101.687')
  })

  it('uses default radius of 3000 (matching muslim-traveler-app)', () => {
    const q = mosqueQuery(3.0, 101.0)
    expect(q).toContain('3000')
  })

  it('accepts a custom radius', () => {
    const q = mosqueQuery(3.0, 101.0, 2000)
    expect(q).toContain('2000')
    expect(q).not.toContain('3000')
  })

  it('filters by religion=muslim (lowercase — OSM standard)', () => {
    const q = mosqueQuery(3.0, 101.0)
    expect(q).toContain('"religion"="muslim"')
  })

  it('also includes religion=Islam variant (matches muslim-traveler-app)', () => {
    const q = mosqueQuery(3.0, 101.0)
    expect(q).toContain('"religion"="Islam"')
  })

  it('requests json output format', () => {
    expect(mosqueQuery(3.0, 101.0)).toContain('[out:json]')
  })

  it('requests center output (needed for way elements)', () => {
    expect(mosqueQuery(3.0, 101.0)).toContain('out center')
  })
})

describe('halalFoodQuery', () => {
  it('includes the provided lat/lon', () => {
    const q = halalFoodQuery(1.352, 103.82)
    expect(q).toContain('1.352')
    expect(q).toContain('103.82')
  })

  it('uses default radius of 3000', () => {
    expect(halalFoodQuery(1.0, 103.0)).toContain('3000')
  })

  it('filters for halal diet tag', () => {
    const q = halalFoodQuery(1.0, 103.0)
    expect(q).toContain('"diet:halal"')
  })

  it('includes restaurants, fast_food, and cafes', () => {
    const q = halalFoodQuery(1.0, 103.0)
    expect(q).toContain('"amenity"="restaurant"')
    expect(q).toContain('"amenity"="fast_food"')
    expect(q).toContain('"amenity"="cafe"')
  })
})
