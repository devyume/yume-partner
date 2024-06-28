import React, { useEffect, useState } from 'react';
import yumelogo from '../../images/YumeLogo_1.png';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { fetchAuthSession } from 'aws-amplify/auth';

interface HomeProps {
  isAuthenticated: boolean;
}

function Home({ isAuthenticated }: HomeProps) {
  
  const navigate = useNavigate();

  return (
    <div className='home-container'>
      <div className='home-container-left'>
        <img src={yumelogo} alt="yumelogo" className="home-logo-img" />
      </div>
      <div className='home-container-right'>
        <p>Assign marketing budget and track impact</p>
        <p>A platform for the brands to interact with social media users</p>
        {
          isAuthenticated === false && (
            <div className='home-auth-links'>
              <button className='home-auth-button' onClick={() => (navigate('/register'))} >Register</button>
              <button className='home-auth-button' onClick={() => (navigate('/login'))}>SignIn</button>
            </div>
          )
        }
        {
          isAuthenticated ===true && (
            <div className='home-auth-links'>
              <button className='home-auth-button' onClick={() => (navigate('/campign'))} >Create Campign</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home