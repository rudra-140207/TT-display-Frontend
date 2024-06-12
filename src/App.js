import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './components/AdminPage';
import Page2a from "./components/Page2a";
import Page3a from "./components/Page3a";
import Page4a from "./components/Page4a";
import Page2b from "./components/Page2b";
import Page3b from "./components/Page3b";
import Page4b from "./components/Page4b";
import Page4c from "./components/Page4c";
import Home from './components/Home';
import Upload from './components/Upload';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/displayPage/2a" element={<Page2a />} />
          <Route path="/displayPage/3a" element={<Page3a />} />
          <Route path="/displayPage/4a" element={<Page4a />} />
          <Route path="/displayPage/2b" element={<Page2b />} />
          <Route path="/displayPage/3b" element={<Page3b />} />
          <Route path="/displayPage/4b" element={<Page4b />} />
          <Route path="/displayPage/4c" element={<Page4c />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
