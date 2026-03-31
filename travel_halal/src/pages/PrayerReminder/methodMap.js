/**
 * Maps IANA timezone strings → Aladhan API numeric method IDs.
 * API: https://aladhan.com/prayer-times-api
 * Method list: https://aladhan.com/calculation-methods
 */
const METHOD_MAP = [
  // Malaysia → JAKIM (17)
  { match: tz => tz === 'Asia/Kuala_Lumpur' || tz === 'Asia/Kuching', id: 17, name: 'JAKIM (Malaysia)' },
  // Singapore → MUIS (11)
  { match: tz => tz === 'Asia/Singapore', id: 11, name: 'MUIS (Singapore)' },
  // Indonesia → Kemenag (20)
  { match: tz => ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura', 'Asia/Pontianak'].includes(tz), id: 20, name: 'Kemenag (Indonesia)' },
  // Saudi Arabia → Umm Al-Qura (4)
  { match: tz => tz === 'Asia/Riyadh', id: 4, name: 'Umm Al-Qura (Saudi)' },
  // Gulf states → Umm Al-Qura (4)
  { match: tz => ['Asia/Dubai', 'Asia/Muscat', 'Asia/Bahrain', 'Asia/Kuwait', 'Asia/Qatar'].includes(tz), id: 4, name: 'Umm Al-Qura (Gulf)' },
  // Turkey → Diyanet (13)
  { match: tz => tz === 'Europe/Istanbul', id: 13, name: 'Diyanet (Turkey)' },
  // Pakistan → Karachi (1)
  { match: tz => tz === 'Asia/Karachi', id: 1, name: 'Karachi (Pakistan)' },
  // Egypt → Egypt EGAS (5)
  { match: tz => tz === 'Africa/Cairo', id: 5, name: 'Egypt EGAS' },
  // Iran → Tehran (7)
  { match: tz => tz === 'Asia/Tehran', id: 7, name: 'Tehran (Iran)' },
  // North America → ISNA (2)
  { match: tz => tz.startsWith('America/'), id: 2, name: 'ISNA (North America)' },
  // Europe → Muslim World League (3)
  { match: tz => tz.startsWith('Europe/'), id: 3, name: 'Muslim World League' },
]

export function getMethodId(tz) {
  const rule = METHOD_MAP.find(r => r.match(tz))
  return rule ? rule.id : 3 // Default: Muslim World League
}

export function getAuthorityName(tz) {
  const rule = METHOD_MAP.find(r => r.match(tz))
  return rule ? rule.name : 'Muslim World League'
}
