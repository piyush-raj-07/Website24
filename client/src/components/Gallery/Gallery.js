import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../status_pages/Loader";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoad] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    setLoad(true);
    try {
      const res = await axios.get("http://localhost:5000/GetGallery");
      setImages(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-raleway text-white">
      <h1 className="text-center text-4xl font-semibold py-10">Gallery</h1>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-4 p-4 md:gap-12">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image)}
            className="relative overflow-hidden bg-black group cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-[200px] md]\:h-[300px] object-cover transform transition-transform duration-300 group-hover:scale-110 rounded-t-lg"
            />
            <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 transition-colors duration-300"></div>
            <div className="absolute bottom-3 left-3 text-white opacity-0 transform translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <p className="text-lg font-semibold">{image.title}</p>
              <p className="text-sm opacity-70">{image.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative p-4 bg-white rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-contain rounded-md"
            />
            <div className="mt-4 text-center">
              <h2 className="text-2xl text-gray-900 font-semibold">{selectedImage.title}</h2>
              <p className="text-gray-600">{selectedImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
