import React, { useState, useEffect, useRef } from 'react';
import profilePic from "./ProfileImg/ProfilePic.jpg"
import background from "./ProfileImg/Background.jpg"
import goldBadge from "./ProfileImg/gold_badge.png"
import silverBadge from "./ProfileImg/silver_badge.png"
import bronzeBadge from "./ProfileImg/bronze_badge.png"
import blogBg1 from "./ProfileImg/blog_bg1.jpg"
import blogBg2 from "./ProfileImg/blog_bg2.jpg"
import blogBg3 from "./ProfileImg/blog_bg3.jpg"
import blogBg4 from "./ProfileImg/blog_bg4.jpg"
import blogBg5 from "./ProfileImg/blog_bg5.jpg"
import profileCSS from "../css/Profile.css"


export default function ProfilePage() {
    const [image, setImage] = useState(null);
    const [intro, setIntro] = useState("");
    const [introSaved, setIntroSaved] = useState(false);

    const leftSectionRef = useRef(null);
    const rightSectionRef = useRef(null);


    useEffect(() => {
        const storedImage = localStorage.getItem('profilePic');
        const storedIntro = localStorage.getItem('intro');
        if (storedImage) {
            setImage(storedImage);
        }
        if (storedIntro) {
            setIntro(storedIntro); // Load saved intro from localStorage
            setIntroSaved(true); // Mark intro as saved when loaded from localStorage
        }

        // Function to handle scroll events for a given section
        const handleScroll = (e, sectionRef) => {
            e.preventDefault(); // Prevent the default scroll behavior
            const scrollSpeed = 5; // Factor to slow down the scroll
            const delta = e.deltaY; // Get vertical scroll delta
    
            // Adjust the scroll position for the section
            if (sectionRef && sectionRef.current) {
                sectionRef.current.scrollTop += delta / scrollSpeed; // Slow down scroll
            }
        };
    
        // Attach scroll handlers to each section
        const leftSection = leftSectionRef.current;
        const rightSection = rightSectionRef.current;
    
        const handleLeftScroll = (e) => handleScroll(e, leftSectionRef);
        const handleRightScroll = (e) => handleScroll(e, rightSectionRef);
    
        if (leftSection) {
            leftSection.addEventListener('wheel', handleLeftScroll, { passive: false });
        }
        if (rightSection) {
            rightSection.addEventListener('wheel', handleRightScroll, { passive: false });
        }
    
        // Clean up event listeners on component unmount
        return () => {
            if (leftSection) {
                leftSection.removeEventListener('wheel', handleLeftScroll);
            }
            if (rightSection) {
                rightSection.removeEventListener('wheel', handleRightScroll);
            }
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result;
                setImage(imageDataUrl);
                localStorage.setItem('profilePic', imageDataUrl);  // Save to localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setImage(null);
        localStorage.removeItem('profilePic');
    };

    const handleIntroChange = (e) => {
        setIntro(e.target.value);
    };

    const handleSaveIntro = () => {
        if (intro.trim() === "") {
            alert("Please write something in your intro before saving.");  // Alert if intro is empty
        } else {
            localStorage.setItem('intro', intro);  // Save the intro text to localStorage
            setIntroSaved(true); // Set introSaved to true after saving
            alert("Intro saved successfully!");  // Alert user that the intro has been saved
        }
    };

    const handleEditIntro = () => {
        setIntroSaved(false);  // Mark as not saved to allow editing
    };

    const handleDeleteIntro = () => {
        setIntro("");
        localStorage.removeItem('intro');  // Remove intro from localStorage
        setIntroSaved(false);  // Reset saved state
    };

    return (
        <div className="flex bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black text-white min-h-screen min-w-screen ">

            <div className="absolute inset-0 z-10 ">
                <img
                    src={background} // Replace with your image URL
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 "
                />
            </div>

            <div ref={leftSectionRef} className="flex flex-col text-white border-r-2 border-white w-2/5 z-10 overflow-y-auto h-screen scrollbar-hidden">
                <div className="m-4">
                    <div className=''>
                        <div className="px-4 py-4 mx-4 my-2 flex flex-col justify-center items-center ">


                            <div className="relative flex justify-center items-center group overflow-hidden h-52 w-52 rounded-full">
                                {/* Profile Picture Display */}
                                <img
                                    src={image || profilePic}
                                    alt="Profile"
                                    className="h-full w-full rounded-full object-cover border-2 border-purple-500 shadow-lg"
                                />

                                {/* Overlay Buttons (Appear on Hover) */}
                                {image && (
                                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 h-full w-full">
                                        {/* Edit Button */}
                                        <label
                                            htmlFor="profile-upload"
                                            className="bg-purple-500 text-white font-serif p-2 rounded-lg mb-2 cursor-pointer w-20 text-center shadow-black shadow-lg hover:border-purple-400 hover:border-2"
                                        >
                                            Edit
                                        </label>
                                        {/* Delete Button */}
                                        <button
                                            onClick={handleDelete}
                                            className="bg-red-500 text-white font-serif p-2 w-20 rounded-lg text-center shadow-black shadow-lg hover:border-2 border-red-400"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                                {/* Upload Button (Always visible) */}
                                {!image && (
                                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex flex-col items-center justify-center opacity-100  z-10 h-full w-full">
                                        <label
                                            htmlFor="profile-upload"
                                            className="bg-purple-500 bg-opacity-80 border-2 border-purple-300 text-white font-serif p-2 rounded-lg mb-2 cursor-pointer w-32 text-center shadow-black shadow-lg hover:border-white"
                                        >
                                            Upload Picture
                                        </label>
                                    </div>
                                )}

                                {/* Hidden File Input */}
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <h1 className='p-2 text-2xl font-serif'>Username</h1>


                        </div>
                    </div>
                    <div className='mx-4 my-2 flex flex-col items-center justify-center'>
                        <div className="px-2  pt-2 w-full">
                            <textarea
                                value={intro}
                                onChange={handleIntroChange}
                                className="w-full h-24 bg-black bg-opacity-70 text-white border-2 border-white p-2 rounded-lg"
                                placeholder="Enter your introduction here..."
                                disabled={introSaved}
                            />
                        </div>
                        {/* Display Save/Edit/Delete buttons based on intro state */}
                        <div className=" w-full">
                            {!introSaved ? (
                                <div className='flex justify-center'>
                                    <button
                                        onClick={handleSaveIntro}
                                        className=" my-2 bg-purple-950 text-white px-2 py-2 rounded-lg cursor-pointer border-2 border-white"
                                    >
                                        Save Intro
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-stretch items-center">
                                    {/* Edit Button */}


                                    <button
                                        onClick={handleEditIntro}
                                        className=" bg-purple-950 m-2 w-1/2 text-white px-2 py-2 rounded-lg cursor-pointer border-2 border-white"
                                    >
                                        Edit Intro
                                    </button>

                                    {/* Delete Button */}

                                    <button
                                        onClick={handleDeleteIntro}
                                        className="  bg-purple-950 m-2 w-1/2 text-white px-2 py-2 rounded-lg cursor-pointer border-2 border-white"
                                    >
                                        Delete Intro
                                    </button>

                                </div>
                            )}
                        </div>
                    </div>


                </div>
            </div>

            <div ref={rightSectionRef} className="flex flex-col text-white w-3/5 z-10 overflow-y-auto h-screen scrollbar-hidden">
                <div className="m-4">

                    <div className='rounded-lg overflow-hidden my-6 mx-16'>
                        <div className='text-white p-4 text-xl text-center font-mono bg-[#643178] bg-opacity-50 '>
                            Badges Earned
                        </div>
                        <div className='flex justify-evenly bg-[#AE7BC3] bg-opacity-85'>
                            {/* Gold Badge */}
                            <div className="badge-container">
                                <img
                                    src={goldBadge}
                                    alt="Gold Badge"
                                    className="w-24 h-24 m-4 badge-hover-effect rounded-full shadow-[#643178] shadow-lg"
                                />
                                <div className="badge-overlay justify-center text-center">
                                    10+ Blog Contributions
                                </div>
                            </div>

                            {/* Silver Badge */}
                            <div className="badge-container">
                                <img
                                    src={silverBadge}
                                    alt="Silver Badge"
                                    className="w-24 h-24 m-4 badge-hover-effect rounded-full shadow-[#643178] shadow-lg"
                                />
                                <div className="badge-overlay text-center">
                                    5+ Blog Contributions
                                </div>
                            </div>

                            {/* Bronze Badge */}
                            <div className="badge-container">
                                <img
                                    src={bronzeBadge}
                                    alt="Bronze Badge"
                                    className="w-24 h-24 m-4 badge-hover-effect rounded-full shadow-[#643178] shadow-lg"
                                />
                                <div className="badge-overlay text-center">
                                    1+ Blog Contributions
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='mx-16 my-8 flex flex-col'>
                        <div className="relative text-white text-center  p-4 overflow-hidden group font-serif text-xl">
                            Blog Contributions
                        </div>
                        <div className="relative  h-28 my-2 shadow-black shadow-md overflow-hidden group">
                            <img
                                src={blogBg1} // Replace with your image URL
                                alt="Background"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="absolute top-0 left-0 w-full h-full bg-purple-500 bg-opacity-55 flex items-center justify-center">
                                <p className="text-white text-sm font-bold">Overlay Text</p>
                            </div>

                        </div>

                        <div className="relative  h-28 my-2  shadow-black shadow-md overflow-hidden group">
                            <img
                                src={blogBg5} // Replace with your image URL
                                alt="Background"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="absolute top-0 left-0 w-full h-full bg-purple-500 bg-opacity-55 flex items-center justify-center">
                                <p className="text-white text-sm font-bold">Overlay Text</p>
                            </div>

                        </div>

                        <div className="relative  h-28 my-2 shadow-black shadow-md overflow-hidden group">
                            <img
                                src={blogBg3} // Replace with your image URL
                                alt="Background"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="absolute top-0 left-0 w-full h-full bg-purple-500 bg-opacity-55 flex items-center justify-center">
                                <p className="text-white text-sm font-bold">Overlay Text</p>
                            </div>

                        </div>

                        <div className="relative  h-28 my-2 shadow-black shadow-md overflow-hidden group">
                            <img
                                src={blogBg4} // Replace with your image URL
                                alt="Background"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="absolute top-0 left-0 w-full h-full bg-purple-500 bg-opacity-55 flex items-center justify-center">
                                <p className="text-white text-sm font-bold">Overlay Text</p>
                            </div>

                        </div>

                        <div className="relative  h-28 my-2 shadow-black shadow-md overflow-hidden group">
                            <img
                                src={blogBg2} // Replace with your image URL
                                alt="Background"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="absolute top-0 left-0 w-full h-full bg-purple-500 bg-opacity-55 flex items-center justify-center">
                                <p className="text-white text-sm font-bold">Overlay Text</p>
                            </div>

                        </div>
                        

                    </div>


                </div>
            </div>
        </div>

    )
}

