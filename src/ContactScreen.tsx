import { Link } from 'react-router-dom'

export default function ContactScreen() {
  return (
    <div>
      <h1>Kontakti</h1>
      <p>Sazinies ar mums: timurs@example.com</p>
      <Link to="/">Atpakaļ uz sākumu</Link>
    </div>
  )
}