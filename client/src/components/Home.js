import React from "react";
import { useState } from "react";
import Bg from './Background.js'
import Loader from "./Loader.js";
import Carousel from "./Carousel.js";
import { Footer } from './footer.js';
import AboutUs from "./Aboutus.js";

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
    <div >
      
    {/* <div className="h-screen bg-black flex justify-center items-center ">
        <Loader/>
    </div> */}

    <div className="">
    <Bg />
    </div>
   
    
    <div class = 'bg-black  pt-10 pb-10'>
    <Carousel >
    </Carousel>
    </div>
    <AboutUs/>
    <Footer>
    </Footer>    
    </div>

    </div>
   
    </>
    
    )
}

export default Home