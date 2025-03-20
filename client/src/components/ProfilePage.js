

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import profilePic from "./ProfileImg/ProfilePic.jpg"
import { Shield, BookText, Target } from "lucide-react"
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
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
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
    formDataToSend.append("is_Proj", formData.is_Proj ? "true" : "false")

    if (formData.file) {
      formDataToSend.append("image", formData.file)
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("Upload successful:", response.data)
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

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black text-white min-h-screen w-full">
      <div className="flex flex-col text-white md:w-2/5 z-10 overflow-y-auto md:h-full scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
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
                  className="my-4 bg-purple-950 text-white px-4 py-2 rounded-lg cursor-pointer border-2 border-white hover:bg-purple-900 transition-colors duration-200"
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
                    <div className="bg-white/10 text-yellow-100 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>{user.Role.toUpperCase()}</span>
                    </div>
                  )}
                  <div className="bg-white/10 text-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                    <BookText className="w-4 h-4" />
                    <span>{`${blogs.length} Blogs`}</span>
                  </div>
                  <div className="bg-white/10 text-emerald-200 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{`Score: ${user?.quizScore || 0}`}</span>
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
      </div>

      <div className="flex flex-col text-white md:w-3/5 z-10 overflow-y-auto md:h-full scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
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
                className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg my-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
                onClick={() => handleBlogClick(blog)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-200">{blog.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-gradient-to-b from-purple-950 to-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-purple-500/30">
              <form onSubmit={handleSaveChanges} className="px-6 pt-5 pb-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white text-center mb-4">Edit Profile</h3>
                  <div className="space-y-4">
                    {/* Username field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Degree field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Degree</label>
                      <select
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Degree</option>
                        <option value="B. Tech">B. Tech</option>
                        <option value="M. Tech">M. Tech</option>
                      </select>
                    </div>

                    {/* Batch field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Batch</label>
                      <select
                        name="batch"
                        value={formData.batch}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Batch</option>
                        <option value="2028">2028</option>
                        <option value="2027">2027</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>

                    {/* Profile Picture field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Profile Picture</label>
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-white file:bg-purple-600 hover:file:bg-purple-700 file:cursor-pointer"
                      />
                    </div>

                    {/* Introduction field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Introduction</label>
                      <textarea
                        name="intro"
                        value={formData.intro}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-transparent border border-purple-500/30 rounded-md hover:bg-purple-500/10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showBlogModal && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-3xl text-[#441752] font-serif font-bold border-b mb-4 pb-2 text-center">
              {selectedBlog.title}
            </h2>
            <div className="bg-black bg-opacity-10 rounded-lg p-4">
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

