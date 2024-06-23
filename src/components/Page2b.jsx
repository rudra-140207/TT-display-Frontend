import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DisplayPage.css";

const DisplayPage = () => {
  const [data, setData] = useState({ url: null, secondUrl: null, message: "" });
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://kiet-en-tt-backend.onrender.com/display/2b`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log("Failed to fetch data, using last available data. Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let timer;
    if (currentIndex === 0) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 10000); // 10 seconds for the main image
    } else {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 5000); // 5 seconds for the second image and message
    }

    return () => clearInterval(timer);
  }, [currentIndex]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  const displayContent = () => {
    if (data.url && data.secondUrl && data.message) {
      // All three fields are present
      return (
        <div className="content-container">
          <img src={data.url} alt="file" className="full-screen-image" />
          <img src={data.secondUrl} alt="file" className="full-screen-image" />
          <div className="message-container">
            <div className="message-heading">Message From HOD Office</div>
            <div className="message-content">{data.message}</div>
          </div>
        </div>
      );
    } else if (data.url && data.secondUrl) {
      // url and secondUrl are present
      return (
        <div className="content-container">
          <img src={data.url} alt="file" className="full-screen-image" />
          <img src={data.secondUrl} alt="file" className="full-screen-image" />
        </div>
      );
    } else if (data.url && data.message) {
      // url and message are present
      return (
        <div className="content-container">
          <img src={data.url} alt="file" className="full-screen-image" />
          <div className="message-container">
            <div className="message-heading">Message From HOD Office</div>
            <div className="message-content">{data.message}</div>
          </div>
        </div>
      );
    } else if (data.secondUrl && data.message) {
      // secondUrl and message are present
      return (
        <div className="content-container">
          <img src={data.secondUrl} alt="file" className="full-screen-image" />
          <div className="message-container">
            <div className="message-heading">Message From HOD Office</div>
            <div className="message-content">{data.message}</div>
          </div>
        </div>
      );
    } else if (data.url) {
      // Only url is present
      return <img src={data.url} alt="file" className="full-screen-image" />;
    } else if (data.secondUrl) {
      // Only secondUrl is present
      return <img src={data.secondUrl} alt="file" className="full-screen-image" />;
    } else if (data.message) {
      // Only message is present
      return (
        <div className="message-container">
          <div className="message-heading">Message From HOD Office</div>
          <div className="message-content">{data.message}</div>
        </div>
      );
    } else {
      // Default: show the main image
      return <img src={data.url} alt="file" className="full-screen-image" />;
    }
  };

  return <div className="full-screen">{displayContent()}</div>;
};

export default DisplayPage;
