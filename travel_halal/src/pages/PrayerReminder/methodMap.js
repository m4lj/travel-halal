/**
 * Maps IANA timezone strings → Aladhan calculation method IDs.
 * Reference: https://api.aladhan.com/v1/methods
 */
const METHOD_MAP = [
  // Malaysia → JAKIM (17)
  { match: tz => tz === 'Asia/Kuala_Lumpur' || tz === 'Asia/Kuching', method: 17 },
  // Singapore → MUIS (11)
  { match: tz => tz === 'Asia/Singapore', method: 11 },
  // Indonesia → Kemenag (20)
  { match: tz => ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura', 'Asia/Pontianak'].includes(tz), method: 20 },
  // Saudi Arabia → Umm Al-Qura (4)
  { match: tz => tz === 'Asia/Riyadh', method: 4 },
  // Turkey → Diyanet (13)
  { match: tz => tz === 'Europe/Istanbul', method: 13 },
  // Pakistan → University of Islamic Sciences, Karachi (1)
  { match: tz => tz === 'Asia/Karachi', method: 1 },
  // Egypt → Egyptian General Authority of Survey (5)
  { match: tz => tz === 'Africa/Cairo', method: 5 },
  // UK/Ireland → ISNA (2)
  { match: tz => tz === 'Europe/London' || tz === 'Europe/Dublin', method: 2 },
  // Gulf states → Gulf Region (8)
  { match: tz => ['Asia/Dubai', 'Asia/Muscat', 'Asia/Bahrain', 'Asia/Kuwait', 'Asia/Qatar'].includes(tz), method: 8 },
  // Iran → Institute of Geophysics, University of Tehran (7)
  { match: tz => tz === 'Asia/Tehran', method: 7 },
  // North America → ISNA (2)
  { match: tz => tz.startsWith('America/'), method: 2 },
  // France → UOIF (12)
  { match: tz => tz === 'Europe/Paris', method: 12 },
]

export function getMethodForTimezone(tz) {
  const rule = METHOD_MAP.find(r => r.match(tz))
  return rule ? rule.method : 3 // Default: Muslim World League
}

export function getAuthorityName(tz) {
  const names = {
    17: 'JAKIM (Malaysia)',
    11: 'MUIS (Singapore)',
    20: 'Kemenag (Indonesia)',
    4:  'Umm Al-Qura (Saudi)',
    13: 'Diyanet (Turkey)',
    1:  'Karachi (Pakistan)',
    5:  'Egypt EGAS',
    2:  'ISNA',
    8:  'Gulf Region',
    7:  'Tehran',
    12: 'UOIF (France)',
    3:  'Muslim World League',
  }
  const method = getMethodForTimezone(tz)
  return names[method] || 'Muslim World League'
}
