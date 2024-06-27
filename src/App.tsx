import React, { useState } from 'react';
import './App.css';
import NavBar from "./components/common/navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import { Amplify } from "aws-amplify";
import outputs from "./amplify_outputs.json";
import Register from './components/auth/Register';
import ValidateRegister from './components/auth/ValidateRegister';

Amplify.configure(outputs);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function updateAuthStatus(authStatus: boolean) {
    setIsAuthenticated(authStatus)
  }
  return (
    <>
     <NavBar isAuthenticated={isAuthenticated} updateAuthStatus={updateAuthStatus} />
     <Routes>
      <Route path='/login' element={<Login updateAuthStatus={updateAuthStatus} />} />
      <Route path='/register' element={<Register />} />
      <Route path='/validate' element={<ValidateRegister />} />
     </Routes>
    </>
  );
}

export default App;
