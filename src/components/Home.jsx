import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>KIET Group of Institutions</h1>
      <h2>Electrical and Electronics Engineering</h2>
      <Link to="/adminPage" className="admin-button">Admin Login</Link>
    </div>
  );
}

export default Home;
