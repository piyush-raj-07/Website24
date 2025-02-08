import React, { useState } from "react";
import axios from "axios"; // Import axios

const Admin_Gallery = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isUploading, setIsUploading] = useState(false); 

  const Upload = () => {
    const file = document.getElementById("file").files[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("Image", file);
    formData.append("title", title);
    formData.append("subtitle", subtitle);

    setIsUploading(true); 

    axios
      .post("http://localhost:5000/UploadImage", formData)
      .then((response) => {
        console.log("Upload successful:", response.data);
        alert("Image uploaded successfully!");
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Failed to upload image.");
      })
      .finally(() => {
        setIsUploading(false); 
      });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-8 text-violet-300">Upload Image </h1>
      
      <input
        type="file"
        name="file"
        id="file"
        className="mb-3 block w-full text-white"
      />

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded mb-3 block w-full"
      />

      <input
        type="text"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="border p-2 rounded mb-3 block w-full"
      />

      <button
        onClick={Upload}
        disabled={isUploading}
        className={`${
          isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white px-4 py-2 rounded`}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default Admin_Gallery;
