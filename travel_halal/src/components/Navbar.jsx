import { NavLink } from 'react-router-dom'
import { FaMosque, FaUtensils, FaClock } from 'react-icons/fa'

const links = [
  { to: '/mosques', label: 'Mosque Finder', Icon: FaMosque },
  { to: '/food',    label: 'Halal Food',    Icon: FaUtensils },
  { to: '/prayer',  label: 'Prayer Times',  Icon: FaClock },
]

export default function Navbar() {
  return (
    <nav className="bg-islamic-green text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl text-islamic-gold">
          ☪ travel_Halal
        </NavLink>
        <ul className="flex gap-1 sm:gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                   hover:text-islamic-gold hover:bg-white/10
                   ${isActive ? 'text-islamic-gold bg-white/10' : ''}`
                }
              >
                <link.Icon className="text-base" />
                <span className="hidden sm:inline">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
