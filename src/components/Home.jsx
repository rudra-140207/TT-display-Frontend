import React from 'react';
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>
      <Link to="/adminPage">Admin Page</Link>
      <Link to="/displayPage">Display Page</Link>
    </div>
  )
}

export default Home