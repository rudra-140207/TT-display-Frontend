import React, { useState } from 'react';

function Upload() {
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpload = async (event) => {
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
        setImageUrl(data.data.url);
        setErrorMessage('');
      } else {
        setErrorMessage('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error uploading image. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <input type="file" onChange={handleUpload} className="mb-4" />
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="Uploaded" className="max-w-full mb-4" />
            <p className="text-green-500">Image uploaded successfully! URL: {imageUrl}</p>
          </div>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Upload;
