import { Link } from 'react-router-dom'
import { FaMosque, FaUtensils, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

const FEATURES = [
  {
    to:          '/mosques',
    icon:        FaMosque,
    title:       'Mosque Finder',
    description: 'Find mosques near you within 5 km, sorted by distance. Get directions instantly.',
    color:       'islamic-green',
    bgColor:     'bg-islamic-greenPale',
    textColor:   'text-islamic-green',
    borderColor: 'border-islamic-green',
    emoji:       '🕌',
  },
  {
    to:          '/food',
    icon:        FaUtensils,
    title:       'Halal Food',
    description: 'Discover halal-certified restaurants and eateries nearby. Globally curated spots included.',
    color:       'islamic-gold',
    bgColor:     'bg-islamic-goldLight',
    textColor:   'text-islamic-goldDark',
    borderColor: 'border-islamic-gold',
    emoji:       '🍽️',
  },
  {
    to:          '/prayer',
    icon:        FaClock,
    title:       'Prayer Times',
    description: 'Accurate prayer times for your location with countdown to the next prayer and Hijri date.',
    color:       'blue',
    bgColor:     'bg-blue-50',
    textColor:   'text-blue-700',
    borderColor: 'border-blue-300',
    emoji:       '🕐',
  },
]

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <section className="bg-islamic-green text-white px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-4">☪</div>
          <h1 className="text-4xl font-bold text-islamic-gold mb-3">travel_Halal</h1>
          <p className="text-lg text-white/80 mb-2">Your Muslim travel companion</p>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            Find mosques, halal food, and prayer times — wherever you are in the world.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-5 text-white/50 text-xs">
            <FaMapMarkerAlt className="text-islamic-gold text-sm" />
            <span>Location-based · Free · No sign-up required</span>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
          What would you like to find?
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map(f => (
            <Link
              key={f.to}
              to={f.to}
              className={`group block bg-white border-2 border-gray-100 hover:${f.borderColor}
                          rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200`}
            >
              <div className={`w-14 h-14 ${f.bgColor} rounded-2xl flex items-center justify-center mb-4
                               group-hover:scale-110 transition-transform duration-200`}>
                <span className="text-3xl">{f.emoji}</span>
              </div>
              <h3 className={`font-bold text-gray-900 text-lg mb-1 group-hover:${f.textColor} transition-colors`}>
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {f.description}
              </p>
              <div className={`mt-4 text-xs font-semibold ${f.textColor} flex items-center gap-1`}>
                Explore <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom tagline */}
      <section className="text-center pb-8 px-4">
        <p className="text-xs text-gray-400">
          Powered by{' '}
          <a href="https://aladhan.com" target="_blank" rel="noopener noreferrer"
             className="hover:text-islamic-green transition-colors">Aladhan</a>
          {' '}·{' '}
          <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer"
             className="hover:text-islamic-green transition-colors">OpenStreetMap</a>
          {' '}· Open source
        </p>
      </section>
    </div>
  )
}
