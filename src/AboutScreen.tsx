import { Link } from 'react-router-dom'

export default function AboutScreen() {
  return (
    <div>
      <h1>Par mums</h1>
      <p>Šī ir vienkārša to-do lietotne ar navigāciju.</p>
      <Link to="/">Atpakaļ uz sākumu</Link>
    </div>
  )
}