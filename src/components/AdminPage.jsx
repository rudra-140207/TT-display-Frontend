import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const classIDs = ["2a", "2b", "3a", "3b", "4a", "4b", "4c"];
  const [urls, setUrls] = useState(Array(classIDs.length).fill(""));
  const [updateStatus, setUpdateStatus] = useState(Array(classIDs.length).fill(null));
  const [loading, setLoading] = useState(Array(classIDs.length).fill(false));
  const [uploadError, setUploadError] = useState(Array(classIDs.length).fill(""));

  const handleSubmit = async (event, classID, index) => {
    event.preventDefault();
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    try {
      const response = await axios.post(
        `https://kiet-en-tt-backend.onrender.com/admin/update/${classID}`,
        { url: urls[index] }
      );
      console.log(response.data);

      setUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[index] = "";
        return newUrls;
      });
      setUpdateStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = "success";
        return newStatus;
      });
    } catch (error) {
      console.log("Error:", error);
      setUpdateStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = "error";
        return newStatus;
      });
    } finally {
      setLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = false;
        return newLoading;
      });
    }
  };

  const handleInputChange = (value, index) => {
    setUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls[index] = value;
      return newUrls;
    });
    setUpdateStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = null;
      return newStatus;
    });
  };

  const handleUpload = async (event, index) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      formData.append('expiration', '600');
      formData.append('key', 'ff682010d66af471a4cf16d94445257a');

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setUrls((prevUrls) => {
          const newUrls = [...prevUrls];
          newUrls[index] = data.data.url;
          return newUrls;
        });
        setUploadError((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = "";
          return newErrors;
        });
      } else {
        setUploadError((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = "Error uploading image. Please try again.";
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadError((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = "Error uploading image. Please try again.";
        return newErrors;
      });
    }
  };

  return (
    <div className="admin-page">
      <h1 className="heading">Digital Timetable</h1>
      <div className="form-container">
        {classIDs.map((classID, index) => (
          <form
            key={classID}
            method="POST"
            onSubmit={(e) => handleSubmit(e, classID, index)}
            className="form"
          >
            <label className="form-label">Enter your URL for {classID}: </label>
            <input
              type="text"
              value={urls[index]}
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="form-input"
            />
            <input 
              type="file" 
              onChange={(e) => handleUpload(e, index)} 
              className="file-input" 
            />
            <button type="submit" disabled={loading[index]} className="form-button">
              {loading[index] ? "Updating..." : "Update"}
            </button>
            {updateStatus[index] === "success" && (
              <span className="update-success">Updated successfully</span>
            )}
            {updateStatus[index] === "error" && (
              <span className="update-error">Update failed</span>
            )}
            {uploadError[index] && (
              <span className="upload-error">{uploadError[index]}</span>
            )}
          </form>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
