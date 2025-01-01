import React, { useEffect , useState} from "react";
import axios from "axios";
import Loader  from './status_pages/Loader';



const Gallery = () => {
    const [Images,setImages] = useState([]);
    const [isLoading,setLoad] = useState(false);
    const fetchImages = async () =>{
           try {
            const res = await axios.get('http://localhost:5000/GetGallery');
            setImages(res.data);
            
           } catch (error) {
            console.log(error);
           }
           
    }

    useEffect(() => {
        fetchImages(); 
      }, []);
   
       if(isLoading)
       {
        return (
<div className="h-screen bg-black flex justify-center items-center ">
        <Loader/>
 </div>
        );
       }

  return (
    <div className="bg-black min-h-screen font-raleway text-white">
      <h1 className="text-center text-4xl font-semibold py-10"> Gallery</h1>
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {Images.map((image, index) => (
          <div
            key={index}
            className="relative w-[350px] h-[250px] overflow-hidden bg-black group cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110 rounded-t-lg"
            />
            <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 transition-colors duration-300"></div>
            <div className="absolute bottom-5 left-5 text-white opacity-0 transform translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <p className="text-lg font-semibold">{image.title}</p>
              <p className="text-sm opacity-70">{image.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
