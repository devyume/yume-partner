import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from "./components/common/navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import { Amplify } from "aws-amplify";
import outputs from "./amplify_outputs.json";
import Register from './components/auth/Register';
import ValidateRegister from './components/auth/ValidateRegister';
import ForgotPassword from './components/auth/ForgotPassword';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import IsLoading from './components/common/IsLoading';

Amplify.configure(outputs);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("hi",isAuthenticated);

  useEffect(() => {
    async function checkUser() {
      try {
        await fetchAuthSession({ forceRefresh: true });
        const user = await getCurrentUser();
        console.log("hello",user);
        if (user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkUser();
  }, []);

  function updateAuthStatus(authStatus: boolean) {
    setIsAuthenticated(authStatus)
  }

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <>
     <NavBar isAuthenticated={isAuthenticated} updateAuthStatus={updateAuthStatus} />
     <Routes>
      <Route path='*' element={<Home isAuthenticated={isAuthenticated} />} />
      <Route path='/' element={<Home isAuthenticated={isAuthenticated} />} />
      <Route path='/login' element={<Login updateAuthStatus={updateAuthStatus} />} />
      <Route path='/register' element={<Register updateAuthStatus={updateAuthStatus} />} />
      <Route path='/validate' element={<ValidateRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
     </Routes>
    </>
  );
}

export default App;
