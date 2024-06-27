import React from'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import yumelogo from '../../images/YumeLogo_1.png';

function navbar() {
  return (
   <header>
    <nav className='navbar'>
      <div className='navbar-contents'>
        <Link to='/' className='navbar-logo'>
          <img src={yumelogo} alt="yumelogo" className="navbar-logo-img" />
        </Link>
        <div className='navbar-auth'>
          <button className='auth-button'>Register</button>
          <span className='auth-divider'>or</span>
          <button className='auth-button'>Sign in</button>
        </div>
      </div>
    </nav>
   </header>
  )
}

export default navbar