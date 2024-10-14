import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ToScope from './pages/ToScope';
import Creative from './pages/Creative';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toscope" element={<ToScope />} />
        <Route path="/creative" element={<Creative />} />
      </Routes>
    </Router>
  );
}

export default App;
