import React from 'react';
import ReactDOM from 'react-dom/client';
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

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
                <div className="relative z-10 grid lg:grid-cols-3 gap-10 sm:grid-cols-1 px-6 md:px-20 max-w-screen-xl mx-auto justify-items-center mb-10">
                    {/* First Column */}
                    <div className="text-center">
                        <li className="text-[22px] list-none font-raleway font-semibold text-purple-400 py-2 uppercase">
                            Creativity
                        </li>
                        <li className="my-4 list-none">Website Guidelines & Ideas</li>
                        <li className="my-4 list-none">Tips & Tricks</li>
                        <li className="my-4 list-none">Photography</li>
                    </div>

                    {/* Second Column */}
                    <div className="text-center">
                        <li className="text-[22px] list-none font-raleway font-semibold text-purple-400 py-2 uppercase">
                            Inspiration
                        </li>
                        <li className="my-4 list-none">Guidelines & Ideas</li>
                        <li className="my-4 list-none">Tips & Tricks</li>
                        <li className="my-4 list-none">Photography</li>
                    </div>

                    {/* Third Column */}
                    <div className="text-center">
                        <h2 className="text-[22px] font-raleway font-semibold text-purple-400 py-2 uppercase">Contact</h2>
                        <p className="text-[16px] my-4">Email: youremail@gmail.com</p>
                        <p className="text-[16px] my-4">Phone: +1 113-456-7890</p>
                        <div className="flex justify-center space-x-4">
                            <a className="text-white hover:text-purple-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href=""><FaGithub /></a>
                            <a className="text-white hover:text-purple-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href=""><FaLinkedinIn /></a>
                            <a className="text-white hover:text-purple-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href=""><FaTwitter /></a>
                            <a className="text-white hover:text-purple-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href=""><FaInstagram /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
