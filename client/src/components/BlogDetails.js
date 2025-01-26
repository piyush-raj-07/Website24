import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HorizontalCard from "./HorizontalCard";
import image1 from "../components/images/image1.png";
import image2 from "../components/images/image2.png";
import image3 from "../components/images/image3.png";

function BlogDetails() {
  //const cat = useParams();
  //console.log(cat);
  const navigate = useNavigate();
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  console.log(cat);
  //const id = location.pathname.slice(6);

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cat) {
      console.log("Category is empty or undefined.");
      return;
    }
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/blog/catblog/${cat}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Log the response to check its structure
          setBlogs(data);
        } else {
          navigate("/");
          setError("Failed to fetch blog");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Error occurred while fetching the blog");
      }
    };

    fetchBlog();
  }, [cat, navigate]);

  return (
    <div className="gradient_background">
      <div
      // style={{
      //   backgroundImage: `url(${blog.background})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   height: '100vh',
      //   width: '100vw',
      // }}
      >
        <div
        // style={{
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   width: '100%',
        //   height: '100%',
        //   backgroundColor: 'rgba(0, 0, 0, 0.65)',
        //   zIndex: 1,
        // }}
        />
        <h1
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
            fontSize: "60px",
          }}
        >
          {/* {blog.content} */}
        </h1>
        <h1
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "60px",
          }}
        >
          {/* <span style={{ color: '#6082B6', fontFamily: 'serif' }}>EESA</span>{' '}
          <span style={{ fontFamily: 'inherit' }}>IIT Indore</span> */}
        </h1>
      </div>
      <div
        // className="gradient_background"
        style={{ padding: "20px" }}
      >
        <div className="card-container">
          {blogs.map((blog) => (
            <HorizontalCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
