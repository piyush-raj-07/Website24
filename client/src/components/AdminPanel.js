import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, } from 'react-icons/fa';
import Admin_Gallery from './Gallery/Admin_Gallery';
import AdminActivities from './Activity/AdminActivities';
const AdminPanel = () => {
  const [admin, setAdmin] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('blogs');
  const [formMessage, setFormMessage] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');
  const [blogToReject, setBlogToReject] = useState(null);
  const navigate = useNavigate();

  // Fetch Admin Status
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const url = `${process.env.REACT_APP_API}/api/admin/`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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

    fetchAdminStatus();
  }, [navigate]);


  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const blogData = await response.json();
      if (Array.isArray(blogData)) {
        setBlogs(blogData);
      } else {
        console.error('Error: Blog data is not an array', blogData);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleApprove = async (blogId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/blog/approve/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId ? { ...blog, approval: 'Approved' } : blog
          )
        );
        fetchBlogs();
      }
    } catch (err) {
      console.error('Error approving blog:', err);
    }
  };

  const handleReject = async () => {
    if (!rejectionComment) {
      setFormMessage('Please provide a comment for rejection.');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/blog/reject/${blogToReject}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: rejectionComment }),
        
        credentials: 'include',
      });
  
      if (response.ok) {
        // Immediately remove the rejected blog from the state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogToReject));
        setShowRejectModal(false);
        setRejectionComment('');
      } else {
        setFormMessage('Error rejecting the blog. Please try again.');
      }
    } catch (err) {
      console.error("Error rejecting blog:", err);
      setFormMessage('Error rejecting the blog. Please try again.');
      console.error('Error rejecting blog:', err);
    }
  };
  

  if (!admin) {
    return <p className="text-center text-red-500">You are not authorized to view this page.</p>;
  }
  
  return (
    <div className="container mx-auto p-1">
      <h1 className="text-3xl font-bold text-center mb-4 text-purple-300">Admin Panel</h1>
      
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
        <button 
          onClick={() => setActiveTab('Gallery')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'Gallery' 
            ? 'bg-purple-500 text-white' 
            : 'bg-gray-200 text-gray-700'}`}
        >
          Manage Gallery
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
                      onClick={() => {
                        setBlogToReject(blog._id);
                        setShowRejectModal(true);
                      }}
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
      ) : (<></>)}
        
      {activeTab === 'activities' ? (
        <AdminActivities/>
      ): (<></>)}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Why are you rejecting this blog?</h2>
            <textarea
              value={rejectionComment}
              onChange={(e) => setRejectionComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Write your comment here"
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Reject
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{activeTab === 'Gallery' ? (
  <Admin_Gallery />
):(<></>)}
    </div>

   
  );
};

export default AdminPanel;