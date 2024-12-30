import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FallingStarsBackground from './Background/FallingStar';

const EditBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.slice(6);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    cat: 'internship',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blog/single/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title,
            body: data.body,
            cat: data.cat,
          });
        } else {
          navigate('/');
          setError('Failed to fetch blog');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Error occurred while fetching the blog');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/blog/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('Blog updated successfully!');
        setError('');
        setTimeout(() => navigate('/myblog'), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update the blog');
        setSuccess('');
      }
    } catch (err) {
      console.error('Error occurred while updating the blog:', err);
      setError('Error occurred while updating the blog');
      setSuccess('');
    }
  };

  return (
    <div className="h-screen relative">
      <FallingStarsBackground />
      <div className="absolute top-0 bg-white bg-opacity-10 left-0 w-full h-full items-center justify-center">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-5 border-2 border-white backdrop-blur-sm text-white p-8 rounded-lg shadow-2xl z-10 mt-8">
          <h1 className="text-4xl font-bold text-center mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Edit Blog
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-lg">Blog Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 p-4 border-2 border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="body" className="text-lg">Blog Body</label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                className="mt-2 p-4 border-2 border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105"
                rows="6"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="cat" className="text-lg">Category</label>
              <select
                id="cat"
                name="cat"
                value={formData.cat}
                onChange={handleInputChange}
                className="mt-2 p-4 border-2 border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105"
                required
              >
                <option value="internship">Internship</option>
                <option value="placement">Placement</option>
                <option value="organization">Organization</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-800 hover:bg-purple-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
