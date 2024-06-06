import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './components/AdminPage';
import DisplayPage from './components/DisplayPage';
import Home from './components/Home';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/displayPage" element={<DisplayPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
