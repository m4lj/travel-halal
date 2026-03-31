import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { cacheGet, cacheSet } from './sessionCache'

// sessionStorage is not available in Node — provide a simple in-memory mock
const store = {}
const sessionStorageMock = {
  getItem:    (k) => store[k] ?? null,
  setItem:    (k, v) => { store[k] = v },
  removeItem: (k) => { delete store[k] },
}

beforeEach(() => {
  // Clear store and install mock
  Object.keys(store).forEach(k => delete store[k])
  vi.stubGlobal('sessionStorage', sessionStorageMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('cacheSet / cacheGet', () => {
  it('returns null for a key that was never set', () => {
    expect(cacheGet('nonexistent')).toBeNull()
  })

  it('stores and retrieves a value', () => {
    cacheSet('key1', { foo: 'bar' })
    expect(cacheGet('key1')).toEqual({ foo: 'bar' })
  })

  it('stores complex nested objects', () => {
    const data = { times: { Fajr: '05:30', Isha: '20:00' }, count: 5 }
    cacheSet('complex', data)
    expect(cacheGet('complex')).toEqual(data)
  })

  it('returns null after TTL expires', () => {
    cacheSet('expired', 'value', -1) // TTL in the past
    expect(cacheGet('expired')).toBeNull()
  })

  it('removes expired key from storage on read', () => {
    cacheSet('stale', 'value', -1)
    cacheGet('stale')
    expect(sessionStorageMock.getItem('stale')).toBeNull()
  })

  it('returns value before TTL expires', () => {
    cacheSet('fresh', 'hello', 60 * 1000) // 1 min TTL
    expect(cacheGet('fresh')).toBe('hello')
  })
})
