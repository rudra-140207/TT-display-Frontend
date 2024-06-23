import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DisplayPage.css";

const DisplayPage = () => {
  const [data, setData] = useState({ url: null, secondUrl: null, message: "" });
  const [loading, setLoading] = useState(true);
  const [currentDisplay, setCurrentDisplay] = useState("url");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://kiet-en-tt-backend.onrender.com/display/4b`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data); // Assuming response.data has { url, secondUrl, message }
      } catch (error) {
        console.log("Failed to fetch data, using last available data. Error:", error);
        // Optionally handle error state or retry logic
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000); // Fetch data every 20 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDisplay((prevDisplay) => {
        if (prevDisplay === "url") return "secondUrl";
        else if (prevDisplay === "secondUrl") return "message";
        else return "url";
      });
    }, 5000); // Switch display every 5 seconds

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="full-screen">
      <div className="content-container">
        {currentDisplay === "url" && <img src={data.url} alt="file" className="full-screen-image" />}
        {currentDisplay === "secondUrl" && <img src={data.secondUrl} alt="file" className="full-screen-image" />}
        {currentDisplay === "message" && (
          <div className="message-container">
            <div className="message-heading">Message From HOD Office</div>
            <div className="message-content">{data.message}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayPage;
