import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profilePic from "./ProfileImg/ProfilePic.jpg"
import background from "./ProfileImg/Background.jpg"
import blogBg1 from "./ProfileImg/blog_bg1.jpg"
import blogBg2 from "./ProfileImg/blog_bg2.jpg"
import blogBg3 from "./ProfileImg/blog_bg3.jpg"
import blogBg4 from "./ProfileImg/blog_bg4.jpg"
import blogBg5 from "./ProfileImg/blog_bg5.jpg"
import { Trash2 } from 'lucide-react';
import profileCSS from "../css/Profile.css"


export default function ProfilePage() {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [intro, setIntro] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(null);
    const [degree, setDegree] = useState(null);
    const [batch, setBatch] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const backgroundImages = [
        blogBg1,
        blogBg2,
        blogBg3,
        blogBg4,
        blogBg5,
    ];
    const [progressData, setProgressData] = useState({ blogsCount: 0 });
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showBlogModal, setShowBlogModal] = useState(false);

    const [isProj, setIsProj] = useState(false);
    const [tempUsername, setTempUsername] = useState(username);
    const [tempDegree, setTempDegree] = useState(degree);
    const [tempBatch, setTempBatch] = useState(batch);
    const [tempIntro, setTempIntro] = useState(intro);
    const [tempImage, setTempImage] = useState(image);


    const openModal = () => {
        setTempUsername(username);
        setTempDegree(degree);
        setTempBatch(batch);
        setTempIntro(intro);
        setTempImage(image);
        setShowModal(true);
    };


    const handleTempImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSaveChanges = async () => {
        console.log({ tempUsername, tempDegree, tempBatch, tempIntro, tempImage });
        try {
            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: tempUsername,
                    degree: tempDegree,
                    batch: tempBatch,
                    intro: tempIntro,
                    imageUrl: tempImage,
                }),
            });

            if (response.ok) {
                const data = await response.json();


                setUsername(data.Name);
                setDegree(data.Degree);
                setBatch(data.Grad_Year);
                setIntro(data.About);
                setImage(data.Img_URL);

                setShowModal(false);
                console.log('Profile updated successfully');

            } else {

            }
        } catch (err) {
            console.error('Error updating profile:', err);

        }
    };


    useEffect(() => {



        const fetchUserInfo = async () => {
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
                    setIntro(data.About || "Add your introduction here.");
                    setDegree(data.Degree || "B.Tech");
                    setBatch(data.Grad_Year || "2026");
                    setImage(data.Img_URL || profilePic);

                    console.log(data);
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };


        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/blog/myBlog', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
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

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
        setShowBlogModal(true);
    };


    const handleDeleteClick = (blogId) => {
        setBlogToDelete(blogId);
        setShowConfirm(true);
    };

    const confirmDeleteBlog = async () => {
        if (!blogToDelete) return;
        try {
            const response = await fetch(`http://localhost:5000/blog/delete/${blogToDelete}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                setBlogs(blogs.filter(blog => blog._id !== blogToDelete));
                setProgressData(prev => ({ ...prev, blogsCount: prev.blogsCount - 1 }));
                setShowConfirm(false);
                setBlogToDelete(null);
            } else {
                console.error('Failed to delete blog');
            }
        } catch (err) {
            console.error('Error deleting blog:', err);
        }
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result;
                setImage(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };
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
                                {isProj && (
                                    <div className="open-to-project-icon absolute top-0 right-0 bg-purple-500 text-white rounded-full p-2">
                                        <i className="fas fa-briefcase"></i>
                                    </div>
                                )}

                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <h1 className='px-2 py-1 text-3xl font-serif'>{username}</h1>
                            <h4 className='p-1 text-base font-serif'>{degree} | {batch}'</h4>
                        </div>
                    </div>
                    <div className='mx-2 my-2 flex flex-col items-center justify-center'>
                        <div className="px-2  pt-2 w-full">
                            <textarea
                                value={intro}
                                className="w-full h-24 bg-black bg-opacity-70 text-white border-2 border-white p-2 rounded-lg"
                                placeholder="Enter your introduction here..."
                                disabled={!editMode}
                            />
                        </div>


                        <div className="w-full">
                            <div className='flex justify-center'>
                                <button
                                    onClick={openModal}
                                    className="my-4 bg-purple-950 text-white px-4 py-2 rounded-lg cursor-pointer border-2 border-white"
                                >
                                    Edit Profile
                                </button>

                            </div>
                        </div>

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
                            My Blogs
                        </div>

                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="relative h-28 my-2 shadow-black shadow-md overflow-hidden group cursor-pointer flex justify-between items-center "
                                onClick={() => handleBlogClick(blog)}

                            >

                                <img
                                    src={blog.image || getRandomBackground()}
                                    alt="Blog Background"
                                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-purple-950 bg-opacity-45 flex items-center justify-center">
                                    <p className="text-white text-lg font-serif">{blog.title}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('Deleting Blog ID:', blog._id);
                                        handleDeleteClick(blog._id);
                                    }}
                                    className="absolute right-2 text-center border-white border-2 text-white px-2 py-2 rounded-full opacity-0 group-hover:opacity-100 bg-black transition duration-300 hover:bg-[#AE7BC3]">
                                    <Trash2 size={20} />
                                </button>



                            </div>


                        ))}

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => navigate('/writeBlog')}
                                className="bg-[#3B1E54] text-white px-4 py-2 w-full rounded-md text-lg font-serif border-2 border-white transition duration-300 hover:bg-[#8967B3]"
                            >
                                Write a Blog
                            </button>
                        </div>


                    </div>


                </div>

                {showBlogModal && selectedBlog && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                        <div className="bg-[#A888B5] text-black p-8 rounded-lg shadow-lg w-1/2">
                            <h2 className="text-3xl text-[#441752] font-serif font-bold border-b mb-4 pb-2 text-center">{selectedBlog.title}</h2>
                            <div className='bg-black bg-opacity-10 rounded-lg '>
                                <p className="text-black  p-2 text-lg mb-2"><strong>Category:</strong> {selectedBlog.cat}</p>
                                <div className="p-2">
                                    <p className="text-black text-lg"><strong>Body: </strong>{selectedBlog.body}</p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setShowBlogModal(false)}
                                    className="bg-[#441752] text-white px-4 py-2 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showConfirm && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
                            <p className="mb-4">Are you sure you want to delete this blog?</p>
                            <div className="flex justify-end">
                                <button className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2" onClick={confirmDeleteBlog}>Confirm</button>
                                <button className="bg-gray-400 text-black px-4 py-2 rounded-lg" onClick={() => setShowConfirm(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-purple-200 text-black p-8 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>


                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Username</label>
                            <input
                                type="text"
                                value={tempUsername}
                                onChange={(e) => setTempUsername(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Degree</label>
                            <select
                                value={tempDegree}
                                onChange={(e) => setTempDegree(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="B. Tech">B. Tech</option>
                                <option value="M. Tech">M. Tech</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Batch</label>
                            <select
                                value={tempBatch}
                                onChange={(e) => setTempBatch(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="2028">2028</option>
                                <option value="2027">2027</option>
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleTempImageChange}
                                className="w-full p-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Introduction</label>
                            <textarea
                                value={tempIntro}
                                onChange={(e) => setTempIntro(e.target.value)}
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>


                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditMode(false);
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="bg-purple-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}