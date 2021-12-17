import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgMenuRight, CgClose } from 'react-icons/cg';

const Header = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => setClicked(!clicked);


  return (
    <header className='header'>
      <nav className="navbar">
        <Link to="/" className="nav_brand" >
          <h3>Events</h3>
        </Link>
  
        <div className="mobile_menu-icon" onClick={handleClick}>
          { clicked ? (<CgClose size={22} className="menu-icon"/>) : (<CgMenuRight size={22} className="menu-icon"/>) }
        </div>
        
        <ul className={clicked ? "nav_items active" : "nav_items"}>
          <Link to="/" className="link" onClick={handleClick}>Home</Link>
          <Link to="/contact" className="link" onClick={handleClick}>Contact</Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
