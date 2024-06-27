import React from 'react';
import './App.css';
import NavBar from "./components/common/navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  let items = ["Home","Product", "Service"];
  return (
    <>
     <NavBar />
     <Routes>
      
     </Routes>
    </>
  );
}

export default App;
