import React, { useState, useEffect, useRef } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import profilePic from "../../components/ProfileImg/ProfilePic.jpg";
import background from "../../components/ProfileImg/Background.jpg";
import blogBg1 from '../../components/ProfileImg/blog_bg1.jpg';
import blogBg2 from '../../components/ProfileImg/blog_bg2.jpg';
import blogBg3 from '../../components/ProfileImg/blog_bg3.jpg';
import blogBg4 from '../../components/ProfileImg/blog_bg4.jpg';
import blogBg5 from '../../components/ProfileImg/blog_bg5.jpg';


export default function ProfilePage2() {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState(null);
    const [degree, setDegree] = useState(null);
    const [batch, setBatch] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const backgroundImages = [
        blogBg1,
        blogBg2,
        blogBg3,
        blogBg4,
        blogBg5,
    ];
    const [progressData, setProgressData] = useState({ blogsCount: 0 });

    useEffect(() => {



        const fetchUserInfo = async () => {

            console.log(id)
            try {
                const response = await fetch(`http://localhost:5000/user/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.Name || "Username");
                    setDegree(data.Degree || "B.Tech");
                    setBatch(data.Grad_Year || "2026");
                    setImage(data.Img_URL || profilePic);

                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };


        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/blogs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ author_id: id }) // Ensure userId is defined
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                    console.log(data)

                    setProgressData({ blogsCount: data.length });
                } else {
                    console.error('Failed to fetch blogs');
                }
            } catch (err) {
                console.error('Error fetching blogs:', err);
            }
        };

        fetchBlogs();


        fetchUserInfo();

    }, [id]);

    let previousImage = null;

    const getRandomBackground = () => {
        let newImage;
        do {
            newImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        } while (newImage === previousImage);

        previousImage = newImage;
        return newImage;
    };

    const ProgressBar = ({ label, value, maxValue }) => {
        const percentage = (value / maxValue) * 100;

        return (
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-sm font-semibold">{`${value}/${maxValue}`}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-purple-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        );
    };



    return (
        <div className="flex bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black text-white max-h-screen w-full ">
            <div className="absolute inset-0">
                <img
                    src={background}
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>
            <div className="flex flex-col text-white border-r-2 border-white w-2/5 z-10 overflow-y-auto h-screen scrollbar-hidden">
                <div className="m-4">
                    <div className=''>
                        <div className="px-4 py-4 mx-4 my-2 flex flex-col justify-center items-center ">
                            <div className="relative flex justify-center items-center group overflow-hidden h-52 w-52 rounded-full">
                                <img
                                    src={image || profilePic}
                                    alt="Profile"
                                    className="h-full w-full rounded-full object-cover border-2 border-purple-500 shadow-lg"
                                />
                            </div>
                            <h1 className='px-2 py-1 text-3xl font-serif'>{username}</h1>
                            <h4 className='p-1 text-base font-serif'>{degree} | {batch}</h4>
                        </div>
                    </div>
                    <div className='mx-2 my-2 flex flex-col items-center justify-center'>
                        <div className="rounded-xl overflow-hidden w-full my-4">
                            <div className="p-2 bg-[#AE7BC3] bg-opacity-100">
                                <ProgressBar label="Blog Contributions" value={progressData.blogsCount} maxValue={10} />
                            </div>
                            <div className="p-2 bg-[#AE7BC3] bg-opacity-100 ">
                                <ProgressBar label="Game Score" value={4} maxValue={10} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col text-white w-3/5 z-10 overflow-y-auto max-h-screen scrollbar-hidden">
                <div className="m-4">

                    <div className='mx-16 flex flex-col'>
                        <div className="relative text-white text-center  p-4 overflow-hidden group font-serif font-bold text-xl">
                            {username}' blogs
                        </div>

                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="relative h-28 my-2 shadow-black shadow-md overflow-hidden group cursor-pointer flex justify-between items-center "
                            >
                                <img
                                    src={blog.image || getRandomBackground()}
                                    alt="Blog Background"
                                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-purple-950 bg-opacity-45 flex items-center justify-center">
                                    <p className="text-white text-lg font-serif">{blog.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}