import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <div className='Header'>
      <div className='logo'>Boilerplate</div>

      <div className='nav'>
        <NavLink to='/Home'>Home</NavLink>
        <NavLink to='/feed'>Feed</NavLink>
        <NavLink to='/about'>About</NavLink>
      </div>

      <div className='Welcome-info'>Welcome Message</div>
    </div>
  )
}
