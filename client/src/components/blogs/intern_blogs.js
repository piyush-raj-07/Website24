import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";

const Intern = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchType, setSearchType] = useState("name"); // Default: Search by title
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  // Fetch Blogs
  const GetBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/blog/catblog/${cat}`
      );
      setBlogs(response.data);
      setFilteredBlogs(response.data);
      setLoading(false);
    } catch (err) {
      console.log("Error getting blogs", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetBlogs();
  }, []);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(blogs, {
      keys: [
        searchType === "name" ? "Auth_Name" : "body" // Dynamically set search key
      ],
      threshold: 0.3,
      distance: 10000,
    });
  }, [blogs, searchType]);

  // Handle Search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredBlogs(blogs);
    } else {
      const results = fuse.search(searchQuery);
      setFilteredBlogs(results.map((result) => result.item));
    }
  }, [searchQuery, blogs, searchType, fuse,cat]);

  return (
    <>
      <div className="min-h-screen bg-[#493A53] p-20 pt-8 flex flex-col items-center">
        
        {/* Search Bar with Dropdown */}
        <div className="w-[60vh] max-w-xl my-6  flex space-x-2">
          <select
          
            className="p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">By Author</option>
            <option value="body">By Keyword</option>
          </select>

          <input
            type="text"
            style={{ backgroundColor: "white" }}
            placeholder={`Find blogs by ${searchType === "name" ? "Name" : "Keyword"}...`}
            className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 placeholder:font-semibold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-24 md:grid-cols-3 mt-2">
          {filteredBlogs.map((val, key) => (
            <BlogCard
              key={key}
              title={val.title}
              body={val.body}
              name = {val.Auth_Name}
              img = {val.Auth_Img}
              degree = {val.Auth_Degree}
              year = {val.Auth_Grad_Year}
              onClick={() => setSelectedBlog(val)}
            />
          ))}
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="relative p-12 bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {selectedBlog.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {selectedBlog.body}
            </p>
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setSelectedBlog(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// BlogCard Component
const BlogCard = ({ title, body, name,img,degree,year,onClick }) => {
  const previewText = body.length > 100 ? body.substring(0, 100) + "..." : body;

  return (
    <div className="relative max-w-md rounded-xl bg-white shadow-2xl top-20">
      {/* Image Pod */}
      <div className="absolute -left-10 -top-14 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-[#d8b4fe] to-[#6b21a8] shadow-2xl">
        <img
          src="https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg"
          alt="random"
          className="h-24 w-24 rounded-full shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="p-12">
        <h3 className="mb-2 text-lg text-gray-500">
          {name} | {degree} | {year}'
        </h3>
        <h1 className="mb-4 text-3xl font-bold text-gray-800">{title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-800">
          {previewText}
        </p>
        <button onClick={onClick} className="rounded-full bg-black px-8 py-3 text-lg text-white shadow-lg transition-all duration-200 hover:shadow-md">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Intern;
