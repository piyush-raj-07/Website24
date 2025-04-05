import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../status_pages/Loader";

const Intern = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [isLoading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [upvotes, setUpvotes] = useState({});
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const GetBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
      `${process.env.REACT_APP_API}/blog/catblog/${cat}`
      );
      setBlogs(response.data);
      setFilteredBlogs(response.data);

      const initialUpvotes = {};
      response.data.forEach((blog) => {
        initialUpvotes[blog._id] = blog.upvote || 0; // Use existing upvotes if available
      });
      setUpvotes(initialUpvotes);

      setLoading(false);
      console.log(response.data);
    } catch (err) {
      console.log("Error getting blogs", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetBlogs();
  }, [cat]);

  const fuse = useMemo(() => {
    return new Fuse(blogs, {
      keys: [searchType === "name" ? "Auth_Name" : "body"],
      threshold: 0.3,
      distance: 10000,
    });
  }, [blogs, searchType]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredBlogs(blogs);
    } else {
      const results = fuse.search(searchQuery);
      setFilteredBlogs(results.map((result) => result.item));
    }
  }, [searchQuery, blogs, searchType, fuse, cat]);


  //upvote
  const handleUpvote = async (blogId) => {
    // setUpvotes((prev) => ({
    //   ...prev,
    //   [blogId]: (prev[blogId] || 0) + 1, // Optimistic UI update
    // }));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/blog/upvote/${blogId}`);
      setUpvotes((prev) => ({
        ...prev,
        [blogId]: response.data.upvotes, // Sync with backend
      }));
    } catch (error) {
      console.error("Failed to upvote", error);
      toast.error(error.response.data.message);
      // setUpvotes((prev) => ({
      //   ...prev,
      //   [blogId]: (prev[blogId] || 0) - 1, // Revert on failure
      // }));
    }
  };

  useEffect(() => {
    console.log("Upvotes updated:", upvotes);
  }, [upvotes]);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen gradient_background p-4 sm:p-6 md:p-8 pt-8 flex flex-col items-center">
        {/* Search Section */}
        <div className="w-full max-w-2xl my-4 md:my-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            className="p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white w-full sm:w-auto"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">By Author</option>
            <option value="body">By Keyword</option>
          </select>
  
          <input
            type="text"
            className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 placeholder:font-semibold bg-white"
            placeholder={`Find blogs by ${searchType === "name" ? "Name" : "Keyword"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
  
        {/* Blog Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-6 max-w-64  sm:max-w-7xl" >
          {filteredBlogs.map((val, key) => (
            <BlogCard
              key={key}
              title={val.title}
              body={val.body}
              name={val.Auth_Name}
              img={val.Auth_Img}
              degree={val.Auth_Degree}
              year={val.Auth_Grad_Year}
              user={val.author_id}
              upvotes={upvotes[val._id]}
              onUpvote={() => handleUpvote(val._id)}
              blogId={val._id}
              onClick={() => setSelectedBlog(val)}
            />
          ))}
        </div>
  
        {/* Modal Section */}
        {selectedBlog && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedBlog(null)}
          >
            <div
              className="relative p-4 sm:p-8 bg-white rounded-lg w-full max-w-lg lg:max-w-3xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
                {selectedBlog.title}
              </h1>
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                {selectedBlog.body}
              </p>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 w-full sm:w-auto"
                onClick={() => setSelectedBlog(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
  
  
  
};
const BlogCard = ({ title, body, name, img, degree, year, user, upvotes, onUpvote, blogId, onClick }) => {
  const previewText = body.length > 100 ? body.substring(0, 100) + "..." : body;

  return (
    <div className="relative max-w-md rounded-xl bg-white shadow-2xl mt-10  my-6">

      {/* Image Pod */}
      <Link to={`/profile/${user}`}>
        <div className="absolute -left-6 -top-16 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-r from-[#d8b4fe] to-[#6b21a8] shadow-xl group transition-transform duration-300 hover:scale-110">
          <img
            src={img || "https://media-hosting.imagekit.io//cf7d8af70956451d/image.jpg?Expires=1834903963&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=FgWU1-TXvh5XKBzzX4GsZDTmoKooBRKOp-Lag83HbRXRIdY4N3Jk7iIrFJfzxxcoTLYDdoerMijnk4F6CRf0YS1Hmf7soHEJLK5rkIJRNc0Z7HR6Xbz38~ESb3eEY-dyHcmtufN3Oesmh7qLBodfMbGxZ1KXweuGcjxzdZ6Yp8MPHtp7WEFy5yFVScrfIWuqsUZ8vwfRkPIed5Kb6T5PRc1NpJv--NzcygCZF-a9gkKqPCtR0nnMfauGYcvAnQD9SxlTd4BidT8KcBueiUUrygBxQJzmr1kj88IMPIVQa9SYADYZ8fyD5~ZYEEOgFocvQSsroVXt5Cov71tlFBPYwQ__"}
            alt="Author"
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full shadow-lg"
          />
        </div>
      </Link>

      {/* Upvote Button */}
      <button
        className="absolute right-2 top-2 text-gray-600 hover:text-green-600 transition duration-200 flex items-center gap-1"
        onClick={() => onUpvote(blogId)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
        </svg>
        <span className="text-sm font-semibold">{upvotes || 0}</span>
      </button>

      {/* Blog Content */}
      <div className="p-6 sm:p-10">
        <h3 className="mb-1 sm:mb-2 text-sm sm:text-lg text-gray-500 mt-1">
          {name} | {degree} | {year}'
        </h3>
        <h1 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
        <p className="mb-4 sm:mb-6 text-sm sm:text-lg text-gray-700">{previewText}</p>
        <button
          onClick={onClick}
          className="rounded-full bg-black px-6 py-2 sm:px-8 sm:py-3 text-white text-sm sm:text-lg shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
        >
          Read More
        </button>
      </div>
    </div>
  );
};


export default Intern;
