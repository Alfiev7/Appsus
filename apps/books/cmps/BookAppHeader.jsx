import { utilService } from '../services/util.service.js'
import { UserMsg } from './UserMsg.jsx'

const { useRef } = React
const { NavLink } = ReactRouterDOM

export function BookAppHeader() {
  const navRef = useRef()
  return (
    <UserMsg />
    // <header className='app-header full main-layout'>
    //   <h1>Yarin's Book Shop</h1>
    //   <nav className='app-nav' ref={navRef} onMouseOver={() => utilService.animateCSS(navRef.current, 'headShake')}>
    //     <NavLink to='about'>About</NavLink>
    //     <NavLink to='book'>Books</NavLink>
    //   </nav>
    // </header>
  )
}
