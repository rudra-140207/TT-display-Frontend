import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const classIDs = ["2-a", "2-b", "3-a", "3-b", "4-a", "4-b", "4-c"];
  const [urls, setUrls] = useState(Array(classIDs.length).fill(""));
  const [updateStatus, setUpdateStatus] = useState(Array(classIDs.length).fill(null));

  const handleSubmit = async (event, classID, index) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://kiet-en-tt/admin/update/${classID}`,
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
    }
  };

  const handleInputChange = (value, index) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
    const newStatus = [...updateStatus];
    newStatus[index] = null; // Reset the status when input changes
    setUpdateStatus(newStatus);
  };

  return (
    <div className="form-container">
      {classIDs.map((classID, index) => (
        <form
          key={classID}
          method="POST"
          onSubmit={(e) => handleSubmit(e, classID, index)}
        >
          <label>Enter your URL for {classID}: </label>
          <input
            type="text"
            value={urls[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
          />
          <button type="submit">Update</button>
          {updateStatus[index] === "success" && (
            <span className="update-success">Updated successfully</span>
          )}
          {updateStatus[index] === "error" && (
            <span className="update-error">Update failed</span>
          )}
        </form>
      ))}
    </div>
  );
};

export default AdminPage;
