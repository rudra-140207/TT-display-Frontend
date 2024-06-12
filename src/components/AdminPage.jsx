import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const classIDs = ["2a", "2b", "3a", "3b", "4a", "4b", "4c"];
  const [urls, setUrls] = useState(Array(classIDs.length).fill(""));
  const [updateStatus, setUpdateStatus] = useState(Array(classIDs.length).fill(null));
  const [loading, setLoading] = useState(Array(classIDs.length).fill(false)); // Track loading state for each form

  const handleSubmit = async (event, classID, index) => {
    event.preventDefault();
    const newLoading = [...loading];
    newLoading[index] = true;
    setLoading(newLoading);

    try {
      const response = await axios.post(
        `https://kiet-en-tt-backend.onrender.com/admin/update/${classID}`,
        { url: urls[index] }
      );
      console.log(response.data);
      const newUrls = [...urls];
      newUrls[index] = "";
      setUrls(newUrls);
      const newStatus = [...updateStatus];
      newStatus[index] = "success";
      setUpdateStatus(newStatus);
    } catch (error) {
      console.log("Error:", error);
      const newStatus = [...updateStatus];
      newStatus[index] = "error";
      setUpdateStatus(newStatus);
    } finally {
      const newLoading = [...loading];
      newLoading[index] = false;
      setLoading(newLoading);
    }
  };

  const handleInputChange = (value, index) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
    const newStatus = [...updateStatus];
    newStatus[index] = null;
    setUpdateStatus(newStatus);
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
            <button type="submit" disabled={loading[index]} className="form-button">
              {loading[index] ? "Updating..." : "Update"}
            </button>
            {updateStatus[index] === "success" && (
              <span className="update-success">Updated successfully</span>
            )}
            {updateStatus[index] === "error" && (
              <span className="update-error">Update failed</span>
            )}
          </form>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
