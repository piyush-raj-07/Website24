import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Intern = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  console.log(cat);

  const GetBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/blog/catblog/${cat}`);
      setBlogs(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.log("Error getting blogs", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetBlogs();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#493A53] p-8">
      <div className="grid grid-cols-1 gap-24 md:grid-cols-2 mt-24">
        {blogs.map((val, key) => {
          return (
            <div
              key={key}
              className="relative max-w-md rounded-xl bg-white shadow-2xl"
            >
              {/* Image Pod */}
              <div className="absolute -left-10 -top-14 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-[#d8b4fe] to-[#6b21a8] shadow-2xl">
                <img
                  src={"https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg"}
                  alt="random"
                  className="h-24 w-24 rounded-full shadow-xl"
                />
              </div>

              {/* Content */}
              <div className="p-12">
                <h3 className="mb-2 text-lg text-gray-500">   Captn Jack Sparrow Btech 26'</h3>
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                {val.title}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-gray-800">
                 {val.body}
                </p>
                <button
                  rel="noopener noreferrer"
                  className="rounded-full bg-black px-8 py-3 text-lg text-white shadow-lg transition-all duration-200 hover:shadow-md"
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Intern;
