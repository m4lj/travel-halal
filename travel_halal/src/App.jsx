import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MosqueFinder from './pages/MosqueFinder'
import HalalFood from './pages/HalalFood'
import PrayerReminder from './pages/PrayerReminder'

export default function App() {
  return (
    <BrowserRouter basename="/travel-halal">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 page-enter">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/mosques" element={<MosqueFinder />} />
            <Route path="/food"    element={<HalalFood />} />
            <Route path="/prayer"  element={<PrayerReminder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
