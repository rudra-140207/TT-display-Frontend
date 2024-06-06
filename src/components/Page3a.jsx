import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DisplayPage.css";

const DisplayPage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://kiet-en-tt-backend.onrender.com/display/3-a`,
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
