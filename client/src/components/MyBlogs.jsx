import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function MyBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/blog/myBlog`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setBlogs(data); 
        } else {
          setMessage('Failed to fetch blogs');
        }
      } catch (error) {
        setMessage('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [blogs]);

  const handleEdit = (blogId) => {
    navigate(`/edit/${blogId}`);
  };

  const handleDeleteClick = (blogId) => {
    setBlogToDelete(blogId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (blogToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/blog/delete/${blogToDelete}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        const data = await response.json();
        console.log(data);
        setIsModalOpen(false);
      } catch (error) {
        setMessage('Error deleting the blog');
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-black relative overflow-hidden">
      {/* Purple animated elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-600 rounded-full"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: { duration: 10 + Math.random() * 20, repeat: Infinity }
          }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-purple-600 bg-opacity-50 text-white text-center p-6">
          <h1 className="text-3xl font-bold">My Blog Dashboard</h1>
        </div>

        {message && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 mb-4 text-white rounded-lg ${
              message.includes('success') ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <p>{message}</p>
          </motion.div>
        )}

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-center text-xl font-semibold text-white">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              Loading...
            </div>
          ) : (
            blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-3">{blog.title}</h2>
                <p className="text-gray-300 mb-4">{blog.body}</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      blog.approval === 'Approved' ? 'bg-green-500 text-white' : 
                      blog.approval === 'Denied' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                    }`}>
                      {blog.approval}
                    </span>
                    <span className="ml-4 text-sm text-gray-400">
                      Posted on: {new Date(blog.posted).toLocaleDateString()}
                    </span>
                  </div>

                  {blog.approval !== 'Approved' && (
  <div className="flex gap-3">
    <button
      onClick={() => handleEdit(blog._id)}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
    >
      Edit
    </button>
    <button
      onClick={() => handleDeleteClick(blog._id)}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
    >
      Delete
    </button>
  </div>
)}

                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Comments</h3>
                  {blog.comment && blog.comment.length > 0 ? (
                    <div className="space-y-3">
                      {blog.comment.map((comment, index) => (
                        <div key={index} className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                          <p className="text-gray-300">{comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No comments yet.</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white bg-opacity-20 p-8 rounded-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Are you sure you want to delete this blog?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default MyBlog;
