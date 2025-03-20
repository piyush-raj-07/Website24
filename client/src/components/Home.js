import React from "react";
import { useState, useEffect } from "react";
import Bg from './Background.js'
import Loader from "./status_pages/Loader.js";
import Carousel from "./Carousel.js";
import { Footer } from './footer.js';
import AboutUs from "./Aboutus.js";

const Home = () =>{
const [isLoading , setload] = useState(false);

const trackVisit = async () => {
    const sessionKey = "visitTracked"; // Session-based tracking
    const cookieKey = "userId"; // Cookie-based tracking
   
    // Function to get a cookie
    const getCookie = (name) => {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
      }
      return null;
    };
  
    // Function to set a cookie (with expiry)
    const setCookie = (name, value, days = 365) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
      document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    };
  
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "true"); // Mark visit for this session
  
      let userId = getCookie(cookieKey);
      let isReturning = !!userId; // True if cookie exists
  
      if (!userId) {
        userId = Math.random().toString(36).substr(2, 9); // Generate unique ID
        setCookie(cookieKey, userId);
      }
  
      try {
        // Track every visit (Session-Based)
        await fetch("http://localhost:5000/api/track-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
  
        // Track unique users (Cookie-Based)
        if (!isReturning) {
          await fetch("http://localhost:5000/api/track-unique-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          });
        }
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    }
  };
  

  useEffect(() => {
    trackVisit();
  }, []);




if(isLoading)
{
    return(
      <div className="h-screen bg-black flex justify-center items-center ">
        <Loader/>
        </div>
    );
}

    return (<>
    <div>
      
    {/* <div className="h-screen bg-black flex justify-center items-center ">
        <Loader/>
    </div> */}

    <div className="">
    <Bg />
    </div>
   
    
    <div class = 'bg-gradient-to-b from-black from-0.1% to-[#38283C] pb-10'>
    <Carousel >
    </Carousel>
    </div>
    <AboutUs/>
    <Footer>
    </Footer>    
    </div>
   
    </>
    
    )
}

export default Home