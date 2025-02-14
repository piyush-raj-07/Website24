import React from "react";
import { useState } from "react";
import Bg from './Background.js'
import Loader from "./status_pages/Loader.js";
import Carousel from "./Carousel.js";
import { Footer } from './footer.js';
import AboutUs from "./Aboutus.js";
import ProjectTable from "./Project.js";

const Home = () =>{
const [isLoading , setload] = useState(false);
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
   
    
    <div class = 'bg-gradient-to-b from-black from-0.1% to-[#1f1a3d] pb-10'>
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