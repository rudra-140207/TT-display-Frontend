import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/DisplayPage.css";

const DisplayPage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Extract query parameters using useLocation hook
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classID = searchParams.get('classID');

  useEffect(() => {
    const fetchData = async () => {
      console.log(classID);
      try {
        const response = await axios.get(`https://kiet-en-tt-backend.onrender.com/display/${classID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setImage(response.data.url);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [classID]);

  return (
    <div className="full-screen">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <img src={image} alt="file" className="full-screen-image" />
      )}
    </div>
  );
};

export default DisplayPage;
