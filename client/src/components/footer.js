import React from 'react';
import ReactDOM from 'react-dom/client';
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useState } from 'react';
import QR from './images/EESA_QR.jpeg'
// CSS inlined as a string (e.g., Tailwind setup not applied here)
const styles = `
  body {
    background-color: hsl(0, 0%, 1%);
  }
`;

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export const Footer = () => {
    const Year = new Date().getFullYear();
    const [showPopup, setShowPopup] = useState(false);

    return (
        <footer className="relative bg-black text-white pt-16 pb-16 font-libre" id="footer">
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                        250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                        3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="relative block h-[600px] fill-[#a45dbb]"></path>
                </svg>
                {/* Content container with relative positioning */}
                <div className="relative z-10 grid lg:grid-cols-3 gap-16 md:gap-36 sm:grid-cols-1 px-6  max-w-screen-xl mx-auto justify-items-center mb-10">

                   

                    {/* First Column */}
                 
                    <div className="text-center ">
                        <li className="text-[22px] list-none font-raleway font-semibold text-purple-400 py-2 uppercase">
                            Who we are
                        </li>
                        <li className="my-4 list-none">EESA, a student-run initiative, thrives on your support! Help us fund events, resources and student growth.</li>

                        <button  className="text-purple-400 text-xl hover:text-white hover:underline transition-all duration-150 ease-in-out"
                        onClick={()=>{setShowPopup(true)}}
                        >
                                click to contribute
                            </button>
                        
                    </div>

                    

                    {/* Second Column */}
                    <div className="text-center ">
                        <li className="text-[22px] list-none font-raleway font-semibold text-purple-400 py-2 uppercase">
                            What we do
                        </li>
                        <li className="my-4 list-none">For the students, by the students, and powered with the students—bridging gaps, building connections, and electrifying minds since 2022!</li>
                        
                    </div>
 
                    {/* Third Column */}
                    <div className="text-center">
                        <h2 className="text-[22px] font-raleway font-semibold text-purple-400 py-2 uppercase">Contact Us</h2>
                        <p className="text-[16px] my-4">Email: eesa@iiti.ac.in</p>
                        <p className="text-[16px] my-4">Phone: +91 8090004900</p>
                        <div className="flex justify-center space-x-4">
                            
                            <a className="text-white text-4xl hover:text-purple-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="https://www.linkedin.com/company/electrical-engineering-students-association/" target='blank'><FaLinkedinIn /></a>
                           
                            <a className="text-white text-4xl hover:text-purple-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="https://www.instagram.com/eesa_iiti" target='blank' ><FaInstagram /></a>
                        </div>
                    </div>
                </div>
                {showPopup && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
    <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-[-20px] right-[-20px] text-gray-700 text-4xl h-10 w-10  transition-all bg-purple-300 rounded-md"
      >
        &times;
      </button>
      <img src={QR} alt="Contribute" className="w-full rounded-lg" />
    </div>
  </div>
)}

            </div>
        </footer>
    );
};