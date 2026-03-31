import { describe, it, expect } from 'vitest'
import { getMethodId, getAuthorityName } from '../pages/PrayerReminder/methodMap'

describe('getMethodId', () => {
  it('returns 17 (JAKIM) for Malaysia / Kuala Lumpur', () => {
    expect(getMethodId('Asia/Kuala_Lumpur')).toBe(17)
  })

  it('returns 17 (JAKIM) for Asia/Kuching (East Malaysia)', () => {
    expect(getMethodId('Asia/Kuching')).toBe(17)
  })

  it('returns 11 (MUIS) for Singapore', () => {
    expect(getMethodId('Asia/Singapore')).toBe(11)
  })

  it('returns 20 (Kemenag) for Indonesian timezones', () => {
    expect(getMethodId('Asia/Jakarta')).toBe(20)
    expect(getMethodId('Asia/Makassar')).toBe(20)
    expect(getMethodId('Asia/Jayapura')).toBe(20)
    expect(getMethodId('Asia/Pontianak')).toBe(20)
  })

  it('returns 4 (Umm Al-Qura) for Saudi Arabia', () => {
    expect(getMethodId('Asia/Riyadh')).toBe(4)
  })

  it('returns 4 (Umm Al-Qura) for Gulf states', () => {
    expect(getMethodId('Asia/Dubai')).toBe(4)
    expect(getMethodId('Asia/Kuwait')).toBe(4)
    expect(getMethodId('Asia/Qatar')).toBe(4)
  })

  it('returns 13 (Diyanet) for Turkey', () => {
    expect(getMethodId('Europe/Istanbul')).toBe(13)
  })

  it('returns 1 (Karachi) for Pakistan', () => {
    expect(getMethodId('Asia/Karachi')).toBe(1)
  })

  it('returns 5 (Egypt EGAS) for Cairo', () => {
    expect(getMethodId('Africa/Cairo')).toBe(5)
  })

  it('returns 7 (Tehran) for Iran', () => {
    expect(getMethodId('Asia/Tehran')).toBe(7)
  })

  it('returns 2 (ISNA) for North America', () => {
    expect(getMethodId('America/New_York')).toBe(2)
    expect(getMethodId('America/Los_Angeles')).toBe(2)
    expect(getMethodId('America/Chicago')).toBe(2)
  })

  it('returns 3 (MWL) for Europe', () => {
    expect(getMethodId('Europe/London')).toBe(3)
    expect(getMethodId('Europe/Paris')).toBe(3)
  })

  it('returns 3 (MWL) as default for unknown timezones', () => {
    expect(getMethodId('Pacific/Auckland')).toBe(3)
    expect(getMethodId('Australia/Sydney')).toBe(3)
    expect(getMethodId('Unknown/Zone')).toBe(3)
  })
})

describe('getAuthorityName', () => {
  it('returns JAKIM name for Malaysia', () => {
    expect(getAuthorityName('Asia/Kuala_Lumpur')).toBe('JAKIM (Malaysia)')
  })

  it('returns MUIS name for Singapore', () => {
    expect(getAuthorityName('Asia/Singapore')).toBe('MUIS (Singapore)')
  })

  it('returns Muslim World League as default', () => {
    expect(getAuthorityName('Unknown/Zone')).toBe('Muslim World League')
  })
})
