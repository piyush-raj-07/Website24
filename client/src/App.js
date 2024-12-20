import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import TeamPage from './components/Teampage';
function App() {
  return (
    <Router>
    <div className="app">

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/teampage" element={<TeamPage />} />
      </Routes>
      
    </div>
  </Router>
  );
}

export default App;
