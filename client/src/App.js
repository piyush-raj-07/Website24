import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';

import TeamPage from './components/Teampage';
import Activities from "./components/Activities";

function App() {
  return (
    <Router>
    <div className="app">

      <Routes>
        <Route path="/" element={<Home />} />

         <Route path="/teampage" element={<TeamPage />} />
        <Route path="/Activities" element={<Activities/>}/>

      </Routes>
      
    </div>
  </Router>
  );
}

export default App;
