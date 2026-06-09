import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <div className='Header'>
      <div className='logo'>Meeting Manager</div>

      <div className='nav'>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/meetings'>Meetings</NavLink>
        <NavLink to='/meetings/new'>New Meeting</NavLink>
        <NavLink to='/meetings/update'>Update Meeting</NavLink>
        <NavLink to='/about'>About</NavLink>
      </div>

      <div className='Welcome-info'>Plan, track, and manage group meetings</div>
    </div>
  )
}
