import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import toast from "react-hot-toast"

const WriteBlog = () => {
  const [formData, setFormData] = useState({ title: '', body: '', cat: 'internship' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/blog/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        setSuccess('Blog written successfully!');
        setError('');
        toast.success("Blog Sent Successfully")

        navigate('/profile');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to write the blog');
        toast.error("Error Posting Blog")
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      // setError('Error occurred while writing the blog');
      toast.error("Error Posting Blog")
      setSuccess('');
    }
  };

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#8B5CF6",
      },
      links: {
        color: "#8B5CF6",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl w-full space-y-8 relative z-10"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-extrabold text-center text-white mb-6">Write a Blog</h1>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            {success && <p className="text-green-400 text-center mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="flex flex-col"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="title" className="text-lg text-white mb-2">Blog Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-2 border-purple-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-700"
                  required
                />
              </motion.div>
              <motion.div 
                className="flex flex-col"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="body" className="text-lg text-white mb-2">Blog Body</label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-2 border-purple-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-700"
                  rows="6"
                  required
                />
              </motion.div>
              <motion.div 
                className="flex flex-col"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="cat" className="text-lg text-white mb-2">Category</label>
                <select
                  id="cat"
                  name="cat"
                  value={formData.cat}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-2 border-purple-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-700"
                  required
                >
                  <option value="internship">Internship</option>
                  <option value="placement">Placement</option>
                  <option value="organization">Course</option>
                  <option value="tech">Technical</option>
                  <option value="general">Journey</option>
                </select>
              </motion.div>
              <div className="flex space-x-4">
                <motion.button 
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Publish Blog
                </motion.button>
                <motion.button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => navigate('/profile')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WriteBlog;
