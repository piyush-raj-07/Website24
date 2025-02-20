

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import profilePic from "./ProfileImg/ProfilePic.jpg"
import blogBg1 from "./ProfileImg/blog_bg1.jpg"
import blogBg2 from "./ProfileImg/blog_bg2.jpg"
import blogBg3 from "./ProfileImg/blog_bg3.jpg"
import blogBg4 from "./ProfileImg/blog_bg4.jpg"
import blogBg5 from "./ProfileImg/blog_bg5.jpg"
import { Trash2, Shield, BookText, Target } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"
import axios from "axios"

export default function ProfilePage() {
  const { id } = useParams()
  const [image, setImage] = useState(null)
  const [intro, setIntro] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [username, setUsername] = useState(null)
  const [degree, setDegree] = useState(null)
  const [batch, setBatch] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState(null)
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const backgroundImages = [blogBg1, blogBg2, blogBg3, blogBg4, blogBg5]
  const [progressData, setProgressData] = useState({ blogsCount: 0 })
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [isProj, setIsProj] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    degree: "",
    batch: "",
    intro: "",
    is_Proj: false,
    file: null,
  })

  const openModal = () => {
    setFormData({
      username: username || "",
      degree: degree || "",
      batch: batch || "",
      intro: intro || "",
      is_Proj: isProj,
      file: null,
    })
    setShowModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] })
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()

    formDataToSend.append("username", formData.username)
    formDataToSend.append("degree", formData.degree)
    formDataToSend.append("batch", formData.batch)
    formDataToSend.append("intro", formData.intro)
    formDataToSend.append("is_Proj", formData.is_Proj)

    if (formData.file) {
      formDataToSend.append("file", formData.file)
    }

    try {
      const response = await axios.put("http://localhost:5000/api/user", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      // Update local state with the new data
      setUsername(formData.username)
      setDegree(formData.degree)
      setBatch(formData.batch)
      setIntro(formData.intro)
      setIsProj(formData.is_Proj)
      if (formData.file) {
        setImage(URL.createObjectURL(formData.file))
      }

      setShowModal(false)
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Failed to update profile.")
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUsername(data.Name || "User")
          setIntro(data.About || "No bio yet")
          setDegree(data.Degree || "B.Tech")
          setBatch(data.Grad_Year || "2026")
          setImage(data.Img_URL || profilePic)
          setIsProj(data.is_Proj || false)

          setFormData((prevState) => ({
            ...prevState,
            username: data.Name || "",
            degree: data.Degree || "",
            batch: data.Grad_Year || "",
            intro: data.About || "",
            is_Proj: data.is_Proj || false,
          }))
        } else {
          console.error("Failed to fetch user info")
        }
      } catch (err) {
        console.error("Error fetching user info:", err)
      }
    }

    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blog/myBlog", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setBlogs(data)
          setProgressData({ blogsCount: data.length })
        } else {
          console.error("Failed to fetch blogs")
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
      }
    }

    fetchBlogs()
    fetchUserInfo()
  }, [])

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog)
    setShowBlogModal(true)
  }

  const handleDeleteClick = (blogId) => {
    setBlogToDelete(blogId)
    setShowConfirm(true)
  }

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return
    try {
      const response = await fetch(`http://localhost:5000/blog/delete/${blogToDelete}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== blogToDelete))
        setProgressData((prev) => ({ ...prev, blogsCount: prev.blogsCount - 1 }))
        setShowConfirm(false)
        setBlogToDelete(null)
        toast.success("Blog deleted successfully")
      } else {
        console.error("Failed to delete blog")
        toast.error("Failed to delete blog")
      }
    } catch (err) {
      console.error("Error deleting blog:", err)
      toast.error("Error deleting blog")
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  const getRandomBackground = () => {
    return backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
  }

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
    <div className="flex bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black text-white min-h-screen w-full">
      {/* Remove the following div containing the background image */}
      {/* <div className="absolute">
        <img
          src={background || "/placeholder.svg"}
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div> */}

      <div className="flex flex-col text-white w-2/5 z-10 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
        <div className="m-4">
          <div className="">
            <div className="px-4 py-4 mx-4 my-2 flex flex-col justify-center items-center">
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
              </div>
              <h1 className="px-2 py-1 text-3xl font-serif">{username}</h1>
              <h4 className="p-1 text-base font-serif">
                {degree} | {batch}'
              </h4>
            </div>
          </div>
          <div className="mx-2 my-2 flex flex-col items-center justify-center">
            <div className="px-2 pt-2 w-full">
              <textarea
                value={intro}
                className="w-full h-24 bg-black bg-opacity-70 text-white border-2 border-white p-2 rounded-lg"
                placeholder="Enter your introduction here..."
                disabled={!editMode}
              />
            </div>
            <div className="w-full">
              <div className="flex justify-center">
                <button
                  onClick={openModal}
                  className="my-4 bg-purple-950 text-white px-4 py-2 rounded-lg cursor-pointer border-2 border-white"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="w-full my-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <h3 className="text-base font-medium text-white/80 mb-4 text-center uppercase tracking-wider shadow shadow-white/5">
                  Achievements
                </h3>
                <div className="flex flex-wrap items-center gap-2 justify-center">
                  {(user?.Role === "admin" || user?.Role === "eesa") && (
                    <Badge icon={Shield} label="Admin Access" value={user.Role.toUpperCase()} variant="admin" />
                  )}
                  <Badge icon={BookText} label="Total blogs published" value={`${blogs.length} Blogs`} variant="blog" />
                  <Badge
                    icon={Target}
                    label="Quiz performance"
                    value={`Score: ${user?.quizScore || 0}`}
                    variant="quiz"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#3B1E54] text-white px-4 py-2 w-full rounded-md text-lg font-serif border-2 border-white transition duration-300 hover:bg-[#8967B3] mt-2 mb-12"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col text-white w-3/5 z-10 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
        <div className="m-4">
          <div className="mx-16 flex flex-col">
            <button
              onClick={() => navigate("/writeBlog")}
              className="bg-[#3B1E54] text-white px-4 py-2 w-full rounded-md text-lg font-serif border-2 border-white transition duration-300 hover:bg-[#8967B3]"
            >
              Write a Blog
            </button>
            <button
              onClick={() => navigate(`/myBlog`)}
              className="bg-[#3B1E54] text-white px-4 py-2 w-full rounded-md text-lg font-serif border-2 border-white transition duration-300 hover:bg-[#8967B3] mt-2"
            >
              See Status
            </button>
            <div className="relative text-white text-center p-4 overflow-hidden group font-serif font-bold text-2xl">
              My Blogs
            </div>
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="relative h-28 my-2 shadow-black shadow-md overflow-hidden group cursor-pointer flex justify-between items-center"
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
                    e.stopPropagation()
                    handleDeleteClick(blog._id)
                  }}
                  className="absolute right-2 text-center border-white border-2 text-white px-2 py-2 rounded-full opacity-0 group-hover:opacity-100 bg-black transition duration-300 hover:bg-[#AE7BC3]"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBlogModal && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#A888B5] text-black p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-3xl text-[#441752] font-serif font-bold border-b mb-4 pb-2 text-center">
              {selectedBlog.title}
            </h2>
            <div className="bg-black bg-opacity-10 rounded-lg ">
              <p className="text-black p-2 text-lg mb-2">
                <strong>Category:</strong> {selectedBlog.cat}
              </p>
              <div className="p-2">
                <p className="text-black text-lg">
                  <strong>Body: </strong>
                  {selectedBlog.body}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowBlogModal(false)} className="bg-[#441752] text-white px-4 py-2 rounded">
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
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2" onClick={confirmDeleteBlog}>
                Confirm
              </button>
              <button className="bg-gray-400 text-black px-4 py-2 rounded-lg" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            <form onSubmit={handleSaveChanges}>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Degree</label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="B. Tech">B. Tech</option>
                  <option value="M. Tech">M. Tech</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Batch</label>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Batch</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Profile Picture</label>
                <input type="file" name="file" accept="image/*" onChange={handleFileChange} className="w-full p-2" />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Introduction</label>
                <textarea
                  name="intro"
                  value={formData.intro}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditMode(false)
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

