/**
 * Maps IANA timezone strings → Muslim Pro Scrapper calcMethod string values.
 * API: https://muslimpro-scrapper.lleans.dev/{city}?calcMethod={METHOD}
 * Reference: https://github.com/lleans/Muslim-Pro-Scrapper
 */
const METHOD_MAP = [
  // Malaysia → JAKIM
  { match: tz => tz === 'Asia/Kuala_Lumpur' || tz === 'Asia/Kuching', method: 'JAKIM', name: 'JAKIM (Malaysia)' },
  // Singapore → MUIS
  { match: tz => tz === 'Asia/Singapore', method: 'MUIS', name: 'MUIS (Singapore)' },
  // Indonesia → KEMENAG
  { match: tz => ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura', 'Asia/Pontianak'].includes(tz), method: 'KEMENAG', name: 'Kemenag (Indonesia)' },
  // Saudi Arabia → MAKKAH
  { match: tz => tz === 'Asia/Riyadh', method: 'MAKKAH', name: 'Umm Al-Qura (Saudi)' },
  // Turkey → DIYANET
  { match: tz => tz === 'Europe/Istanbul', method: 'DIYANET', name: 'Diyanet (Turkey)' },
  // Pakistan → KARACHI
  { match: tz => tz === 'Asia/Karachi', method: 'KARACHI', name: 'Karachi (Pakistan)' },
  // Egypt → EGYPT
  { match: tz => tz === 'Africa/Cairo', method: 'EGYPT', name: 'Egypt EGAS' },
  // Iran → TEHRAN
  { match: tz => tz === 'Asia/Tehran', method: 'TEHRAN', name: 'Tehran (Iran)' },
  // North America → ISNA
  { match: tz => tz.startsWith('America/'), method: 'ISNA', name: 'ISNA (North America)' },
  // UK/Ireland / France / Europe → MWL
  { match: tz => tz.startsWith('Europe/'), method: 'MWL', name: 'Muslim World League' },
  // Gulf states → MAKKAH
  { match: tz => ['Asia/Dubai', 'Asia/Muscat', 'Asia/Bahrain', 'Asia/Kuwait', 'Asia/Qatar'].includes(tz), method: 'MAKKAH', name: 'Umm Al-Qura (Gulf)' },
]

export function getMethodForTimezone(tz) {
  const rule = METHOD_MAP.find(r => r.match(tz))
  return rule ? rule.method : 'MWL' // Default: Muslim World League
}

export function getAuthorityName(tz) {
  const rule = METHOD_MAP.find(r => r.match(tz))
  return rule ? rule.name : 'Muslim World League'
}
