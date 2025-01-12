import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaPlus } from 'react-icons/fa';

const AdminPanel = () => {
  const [admin, setAdmin] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('blogs');
  const [activityForm, setActivityForm] = useState({
    url: '',
    title: '',
    description: ''
  });
  const [formMessage, setFormMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const url = 'http://localhost:5000/api/admin/';
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.status === 200) {
          setAdmin(true);
          fetchBlogs();
        } else {
          setAdmin(false);
          navigate('/');
        }
      } catch (err) {
        navigate('/');
        setAdmin(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const blogData = await response.json();
        if (Array.isArray(blogData)) {
          setBlogs(blogData);
        } else {
          console.error('Error: Blog data is not an array', blogData);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchAdminStatus();
  }, [navigate]);

  const handleApprove = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/blog/approve/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId ? { ...blog, approval: 'Approved' } : blog
          )
        );
      }
    } catch (err) {
      console.error("Error approving blog:", err);
    }
  };

  const handleReject = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/blog/reject/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId ? { ...blog, approval: 'Rejected' } : blog
          )
        );
      }
    } catch (err) {
      console.error("Error rejecting blog:", err);
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/SaveActivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityForm),
      });

      if (response.ok) {
        setFormMessage('Activity added successfully!');
        setActivityForm({ url: '', title: '', description: '' });
      } else {
        setFormMessage('Error adding activity. Please try again.');
      }
    } catch (error) {
      setFormMessage('Error: ' + error.message);
    }
  };

  const handleActivityFormChange = (e) => {
    setActivityForm({
      ...activityForm,
      [e.target.name]: e.target.value
    });
  };

  if (!admin) {
    return <p className="text-center text-red-500">You are not authorized to view this page.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-300">Admin Panel</h1>
      
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('blogs')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'blogs' 
            ? 'bg-purple-500 text-white' 
            : 'bg-gray-200 text-gray-700'}`}
        >
          Manage Blogs
        </button>
        <button 
          onClick={() => setActiveTab('activities')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'activities' 
            ? 'bg-purple-500 text-white' 
            : 'bg-gray-200 text-gray-700'}`}
        >
          Manage Activities
        </button>
      </div>

      {activeTab === 'blogs' ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Pending Blog Approvals</h2>
          <div className="space-y-4">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white border-4 border-purple-500 shadow-md rounded-lg p-4 flex justify-between items-center transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl animate-fadeIn"
                >
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold">{blog.title}</h3>
                    <p className="text-gray-600">{blog.body}</p>
                    <span className="text-sm text-gray-500">Category: {blog.cat}</span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full"
                      onClick={() => handleApprove(blog._id)}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-full"
                      onClick={() => handleReject(blog._id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No blogs available for approval.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Add New Activity</h2>
          
          {formMessage && (
            <div className={`p-4 mb-4 rounded ${formMessage.includes('Error') 
              ? 'bg-red-100 text-red-600' 
              : 'bg-green-100 text-green-600'}`}>
              {formMessage}
            </div>
          )}

          <form onSubmit={handleActivitySubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="url"
                value={activityForm.url}
                onChange={handleActivityFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={activityForm.title}
                onChange={handleActivityFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={activityForm.description}
                onChange={handleActivityFormChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200 flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Activity
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;