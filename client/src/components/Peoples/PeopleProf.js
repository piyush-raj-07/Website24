import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profilePic from "../../components/ProfileImg/ProfilePic.jpg";
//import background from "../../components/ProfileImg/Background.jpg";
import blogBg1 from '../../components/ProfileImg/blog_bg1.jpg';
import blogBg2 from '../../components/ProfileImg/blog_bg2.jpg';
import blogBg3 from '../../components/ProfileImg/blog_bg3.jpg';
import blogBg4 from '../../components/ProfileImg/blog_bg4.jpg';
import blogBg5 from '../../components/ProfileImg/blog_bg5.jpg';
import blogBg6 from '../../components/ProfileImg/blog_bg6.jpg';
import blogBg7 from '../../components/ProfileImg/blog_bg7.jpg';
import blogBg8 from '../../components/ProfileImg/blog_bg8.jpg';
import blogBg9 from '../../components/ProfileImg/blog_bg9.jpg';
import blogBg10 from '../../components/ProfileImg/blog_bg10.jpg';
import blogBg11 from '../../components/ProfileImg/blog_bg11.jpg';
import blogBg12 from '../../components/ProfileImg/blog_bg12.jpg';
import blogBg13 from '../../components/ProfileImg/blog_bg13.jpg';
import blogBg14 from '../../components/ProfileImg/blog_bg14.jpg';
import blogBg15 from '../../components/ProfileImg/blog_bg15.jpg';

import { Shield, BookText, Target } from "lucide-react"

export default function ProfilePage2() {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [intro, setIntro] = useState("")
    const [username, setUsername] = useState(null);
    const [degree, setDegree] = useState(null);
    const [batch, setBatch] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [role, setRole] = useState(null);
    const [quizScore, setQuizScore] = useState(0);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showBlogModal, setShowBlogModal] = useState(false);
    const backgroundImages = [
        blogBg1,
        blogBg2,
        blogBg3,
        blogBg4,
        blogBg5,
        blogBg6,
        blogBg7,
        blogBg8,
        blogBg9,
        blogBg10,
        blogBg11,
        blogBg12,
        blogBg13,
        blogBg14,
        blogBg15
    ]

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
                    setIntro(data.About);
                    setRole(data.Role || null);
                    setQuizScore(data.quizScore || 0);

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

    const Badge = ({ icon: Icon, label, value, variant = "default" }) => {
        const variants = {
            admin: "bg-white/10 text-yellow-100 hover:bg-white/20",
            blog: "bg-white/10 text-blue-200 hover:bg-white/20",
            quiz: "bg-white/10 text-emerald-200 hover:bg-white/20",
            default: "bg-white/10 text-gray-200 hover:bg-white/20",
        }

        return (
            <div
                className={` group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${variants[variant]} backdrop-blur-sm border border-white/10 shadow-lg shadow-white/10`}
            >
                <Icon className="w-4 h-4" />
                <span>{value}</span>
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-10 backdrop-blur-sm ">
                    {label}
                </div>
            </div>
        )
    }


    return (
        <div className="flex bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black text-white max-h-screen w-full ">
            <div className="absolute inset-0">
                <img
                    // src={background}
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
                    <div className="mx-2 my-2 flex flex-col items-center justify-center">
                        <div className="px-2 pt-2 w-full">
                            <textarea
                                value={intro}
                                readOnly
                                className="w-full h-32 bg-black bg-opacity-70 text-white border-2 border-white p-2 rounded-lg resize-y"
                            />
                        </div>

                        <div className="w-full my-4">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <h3 className="text-base font-medium text-white/80 mb-4 text-center uppercase tracking-wider shadow shadow-white/5">
                                    Achievements
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 justify-center">
                                    {(role === "admin" || role === "eesa") && (
                                        <Badge icon={Shield} label="Admin Access" value={role.toUpperCase()} variant="admin" />
                                    )}
                                    <Badge icon={BookText} label="Total blogs published" value={`${blogs.length} Blogs`} variant="blog" />
                                    <Badge
                                        icon={Target}
                                        label="Quiz performance"
                                        value={`Score: ${quizScore || 0}`}
                                        variant="quiz"
                                    />
                                </div>
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
                                onClick={() => {
                                    setSelectedBlog(blog);
                                    setShowBlogModal(true);
                                  }}
                            >
                                <img
                                    src={blog.image || getRandomBackground()}
                                    alt="Blog Background"
                                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-purple-950 bg-opacity-45 flex flex-col items-center justify-center">
                                <h2 className="text-xl font-bold">{blog.title}</h2>
                                <p className="text-sm">Category: {blog.cat}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Blog Modal */}
            {showBlogModal && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-3xl text-[#441752] font-serif font-bold border-b mb-4 pb-2 text-center">
              {selectedBlog.title}
            </h2>
            <div className="bg-black bg-opacity-10 rounded-lg p-4">
              <p className="text-black text-lg mb-2">
                <strong>Category:</strong> {selectedBlog.cat}
              </p>
              <p className="text-black text-lg">
                {selectedBlog.body}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowBlogModal(false)}
                className="bg-[#441752] text-white px-4 py-2 rounded hover:bg-[#5c2070] transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
        </div>

    )
}