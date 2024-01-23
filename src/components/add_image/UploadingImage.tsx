import axios from "axios";
import React, { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState();
  const [uploadStatus, setUploadStatus] = useState();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

      await axios 
      .post("http://localhost:8082/api/uploads", formData)
      .then((res) => {
        console.log(res);
      }).catch(e=>console.log(e.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
}

export default ImageUpload;
