import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'
import ContactScreen from './ContactScreen'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Sākums</Link>
        <Link to="/about">Par mums</Link>
        <Link to="/contact">Kontakti</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
      </Routes>
    </BrowserRouter>
  )
}