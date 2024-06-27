import React from'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import yumelogo from '../../images/YumeLogo_1.png';
import { signOut } from 'aws-amplify/auth';

interface NavBarProps {
  isAuthenticated: boolean;
  updateAuthStatus: (authStatus: boolean) => void;
}

function NavBar({ isAuthenticated, updateAuthStatus }: NavBarProps) {
  const navigate = useNavigate();

  const handleRegister = () =>{
    navigate('/register');
  }

  const handleSignIn = () =>{
    navigate('/login');
  }

  const handleSignout = async () => {
    try {
        console.log('Logout');
        await signOut();

        updateAuthStatus(false);
        navigate('/');
    } catch (err) { console.log(err) }
}
  return (
   <header>
    <nav className='navbar'>
      <div className='navbar-contents'>
        <Link to='/' className='navbar-logo'>
          <img src={yumelogo} alt="yumelogo" className="navbar-logo-img" />
        </Link>
        {
          isAuthenticated === false && (
            <div className='navbar-auth'>
              <button className='auth-button' onClick={handleRegister}>Register</button>
              <button className='auth-button' onClick={handleSignIn}>SignIn</button>
            </div>
          )
        }
        {
          isAuthenticated !== false && (
            <div className='navbar-auth'>
              <button className='auth-button' onClick={ handleSignout }>SignOut</button>
            </div>
          )
        }   
      </div>
    </nav>
   </header>
  )
}

export default NavBar