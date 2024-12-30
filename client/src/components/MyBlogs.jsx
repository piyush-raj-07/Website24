import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyBlog() {
    const navigate=useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/blog/myBlog', {
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

        const data=await response.json();
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
    <div className="min-h-screen p-6 bg-gradient-to-tr bg-purple-200 bg-purple-300">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 text-white text-center p-4">
          <h1 className="text-2xl font-semibold">My Blog Dashboard</h1>
        </div>

        {message && (
          <div className={`p-4 mb-4 text-white rounded-lg ${
            message.includes('success') ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <p>{message}</p>
          </div>
        )}

        <div className="p-6 space-y-4">
          {loading ? (
            <div className="text-center text-lg font-semibold">Loading...</div>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
                  blog.approval === 'Approved' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                <p className="mt-2 text-gray-700">{blog.body}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Status: <span className={`font-semibold ${blog.approval === 'Approved' ? 'text-green-600' : blog.approval === 'Denied' ? 'text-red-600' : 'text-yellow-600'}`}>{blog.approval}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Posted on: {new Date(blog.posted).toLocaleDateString()}
                </div>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(blog._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this blog?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBlog;
