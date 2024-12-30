import React from "react";
import { useState } from "react";
import Bg from './Background.js'
import Loader from "./Loader.js";
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
   
    </div>
   
    </>
    )
}

export default Home