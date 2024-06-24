import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const classIDs = ["2a", "2b", "3a", "3b", "4a", "4b", "4c"];
  const [urls, setUrls] = useState(Array(classIDs.length).fill(""));
  const [secondUrls, setSecondUrls] = useState(Array(classIDs.length).fill(""));
  const [messages, setMessages] = useState(Array(classIDs.length).fill(""));
  const [updateStatus, setUpdateStatus] = useState(Array(classIDs.length).fill(null));
  const [loading, setLoading] = useState(Array(classIDs.length).fill(false));
  const [uploadError, setUploadError] = useState(Array(classIDs.length).fill(""));
  const [imageLoading, setImageLoading] = useState(Array(classIDs.length).fill(false));
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    console.log(password);
    // console.log(process.env.REACT_APP_PASSWORD);
    if (password === process.env.REACT_APP_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const classID = classIDs[selectedClassIndex];

    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[selectedClassIndex] = true;
      return newLoading;
    });

    try {
      const response = await axios.post(
        `https://kiet-en-tt-backend.onrender.com/admin/update/${classID}`,
        {
          url: urls[selectedClassIndex],
          secondUrl: secondUrls[selectedClassIndex],
          message: messages[selectedClassIndex],
        }
      );
      console.log(response.data);

      setUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[selectedClassIndex] = "";
        return newUrls;
      });
      setSecondUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[selectedClassIndex] = "";
        return newUrls;
      });
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[selectedClassIndex] = "";
        return newMessages;
      });
      setUpdateStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[selectedClassIndex] = "success";
        return newStatus;
      });
    } catch (error) {
      console.log("Error:", error);
      setUpdateStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[selectedClassIndex] = "error";
        return newStatus;
      });
    } finally {
      setLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[selectedClassIndex] = false;
        return newLoading;
      });
    }
  };

  const handleInputChange = (value, type) => {
    if (type === "url") {
      setUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[selectedClassIndex] = value;
        return newUrls;
      });
    } else if (type === "secondUrl") {
      setSecondUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[selectedClassIndex] = value;
        return newUrls;
      });
    } else if (type === "message") {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[selectedClassIndex] = value;
        return newMessages;
      });
    }
    setUpdateStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[selectedClassIndex] = null;
      return newStatus;
    });
  };

  const handleUpload = async (event, type) => {
    setImageLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[selectedClassIndex] = true;
      return newLoading;
    });

    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', process.env.REACT_APP_API_KEY);

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        if (type === "url") {
          setUrls((prevUrls) => {
            const newUrls = [...prevUrls];
            newUrls[selectedClassIndex] = data.data.url;
            return newUrls;
          });
        } else if (type === "secondUrl") {
          setSecondUrls((prevUrls) => {
            const newUrls = [...prevUrls];
            newUrls[selectedClassIndex] = data.data.url;
            return newUrls;
          });
        }
        setUploadError((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[selectedClassIndex] = "";
          return newErrors;
        });
      } else {
        setUploadError((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[selectedClassIndex] = "Error uploading image. Please try again.";
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadError((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[selectedClassIndex] = "Error uploading image. Please try again.";
        return newErrors;
      });
    } finally {
      setImageLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[selectedClassIndex] = false;
        return newLoading;
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="password-page">
        <h1 className="heading">Admin Login</h1>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <label className="form-label">Enter Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-button">Submit</button>
          {passwordError && <span className="password-error">{passwordError}</span>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="heading">Digital Timetable</h1>
      <div className="menu">
        {classIDs.map((classID, index) => (
          <button
            key={classID}
            className={`menu-button ${index === selectedClassIndex ? 'active' : ''}`}
            onClick={() => setSelectedClassIndex(index)}
          >
            Class {classID}
          </button>
        ))}
      </div>
      <div className="form-container">
        <form
          key={classIDs[selectedClassIndex]}
          method="POST"
          onSubmit={handleSubmit}
          className="form"
        >
          <label className="form-label">Upload Time-Table for Class {classIDs[selectedClassIndex]}: </label>
          <input
            type="text"
            value={urls[selectedClassIndex]}
            onChange={(e) => handleInputChange(e.target.value, "url")}
            className="form-input"
            disabled={imageLoading[selectedClassIndex]}
          />
          <input 
            type="file" 
            onChange={(e) => handleUpload(e, "url")} 
            className="file-input" 
            disabled={imageLoading[selectedClassIndex]}
          />
          <label className="form-label">Upload Image for Class {classIDs[selectedClassIndex]} (optional): </label>
          <input
            type="text"
            value={secondUrls[selectedClassIndex]}
            onChange={(e) => handleInputChange(e.target.value, "secondUrl")}
            className="form-input"
            disabled={imageLoading[selectedClassIndex]}
          />
          <input 
            type="file" 
            onChange={(e) => handleUpload(e, "secondUrl")} 
            className="file-input" 
            disabled={imageLoading[selectedClassIndex]}
          />
          <label className="form-label">Enter a message for Class {classIDs[selectedClassIndex]} (optional): </label>
          <textarea
            value={messages[selectedClassIndex]}
            onChange={(e) => handleInputChange(e.target.value, "message")}
            className="form-textarea"
            disabled={imageLoading[selectedClassIndex]}
          />
          {imageLoading[selectedClassIndex] && <span className="loading-message">Uploading image...</span>}
          <button type="submit" disabled={loading[selectedClassIndex] || imageLoading[selectedClassIndex]} className="form-button">
            {loading[selectedClassIndex] ? "Updating..." : "Update"}
          </button>
          {updateStatus[selectedClassIndex] === "success" && (
            <span className="update-success">Updated successfully</span>
          )}
          {updateStatus[selectedClassIndex] === "error" && (
            <span className="update-error">Update failed</span>
          )}
          {uploadError[selectedClassIndex] && (
            <span className="upload-error">{uploadError[selectedClassIndex]}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
