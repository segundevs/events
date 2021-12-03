import {useState} from 'react';
import { Link } from 'react-router-dom';
import {HiOutlineMenuAlt2} from 'react-icons/hi';
import {MdOutlineClose} from 'react-icons/md';

import './header.scss'

const Header = () => {

 

  const [isOpen, setIsOpen] = useState(false);

  return (
   <header className="header">
      <nav className="navbar">
       <Link to="/" className="nav__brand">
        <h3>Events</h3>
       </Link>
        
        <div className="navbar__links-container">

        <div className="nav__links">
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/contact" className="nav__link">Contact</Link>
        </div>

        <div className="menu__icon" onClick={() => setIsOpen(prev => !prev)}>
          {!isOpen ? <HiOutlineMenuAlt2 className="toggleIcon"/> : <MdOutlineClose className="toggleIcon"/>}
        </div>

        {isOpen && <div className="nav__links-mobile">
          <Link to="/" className="nav__link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/contact" className="nav__link" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>}
        </div>    
      </nav>
    </header>
  )
}

export default Header

