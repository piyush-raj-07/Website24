import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const AdminActivities = () => {
const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editValues, setEditValues] = useState({ title: '', description: '', url1: '', url2: '' });
  const [activityForm, setActivityForm] = useState({
      url1: '',
      url2: '',
      title: '',
      description: '',
    });
    const [formMessage, setFormMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
          try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/GetActivity');
            setActivities(res.data);
            setError(null);
          } catch (err) {
            setError(`Error fetching activities: ${err.message}`);
          } finally {
            setLoading(false);
          }
        };
    
        fetchActivities();
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditValues((prev) => ({ ...prev, [name]: value }));
    };

      const handleEditClick = (activity) => {
        setEditingActivity(activity._id);
        setEditValues({
          title: activity.title,
          description: activity.description,
          url1: activity.url1,
          url2: activity.url2,
        });
      };

      const handleCancelEdit = () => {
        setEditingActivity(null);
        setEditValues({ title: '', description: '', url1: '', url2: '' });
      };

      const handleSaveEdit = async () => {
        try {
          const res = await axios.put(
            `http://localhost:5000/EditActivity/${editingActivity}`,
            editValues
          );
          if (res.status === 200) {
            setActivities((prev) =>
              prev.map((activity) =>
                activity._id === editingActivity ? { ...activity, ...editValues } : activity
              )
            );
            handleCancelEdit();
          }
        } catch (err) {
          console.error('Error updating activity:', err);
        }
      };

      const handleDeleteActivity = async (activityId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this activity?');
        
        if (isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:5000/DeleteActivity/${activityId}`);
            if (response.status === 200) {
              setActivities((prevActivities) =>
                prevActivities.filter((activity) => activity._id !== activityId)
              );
              alert('Activity deleted successfully!');
            }
          } catch (err) {
            console.error("Error deleting activity:", err);
            alert('Failed to delete activity.');
          }
        }
      };

      const handleActivitySubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/SaveActivity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityForm),
          });
    
          if (response.ok) {
            setFormMessage('Activity added successfully!');
            setActivityForm({ url1: '', url2: '', title: '', description: '' });
          } else {
            setFormMessage('Error adding activity. Please try again.');
          }
        } catch (error) {
          setFormMessage('Error: ' + error.message);
        }
      };
    
      const handleActivityFormChange = (e) => {
        setActivityForm({ ...activityForm, [e.target.name]: e.target.value });
      };

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-purple-600 text-xl">Loading activities...</div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-red-600 text-xl">{error}</div>
          </div>
        );
      } 
      return (
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
                        name="url1"
                        value={activityForm.url1}
                        onChange={handleActivityFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        placeholder='size approx 4096*2731'
                      />
                    </div>
        
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Insta URL
                      </label>
                      <input
                        type="text"
                        name="url2"
                        value={activityForm.url2}
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
                        rows="3"
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
                  {/* Edit Activities Section */}
                <div className="w-full mt-8">
                  <h2 className="text-2xl font-bold mb-6 text-purple-600">Edit Existing Activities</h2>
                  {activities.map((activity) => (
                    <div
                      key={activity._id}
                      className="flex flex-col sm:flex-row w-full justify-between items-center sm:items-start gap-6 mb-8"
                    >
                      {editingActivity === activity._id ? (
                        <div className="flex flex-col w-full sm:w-[60%] gap-4">
                          <input
                            type="text"
                            name="url1"
                            value={editValues.url1}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Image URL"
                          />
                          <input
                            type="text"
                            name="url2"
                            value={editValues.url2}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Insta URL"
                          />
                          <input
                            type="text"
                            name="title"
                            value={editValues.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Title"
                          />
                          <textarea
                            name="description"
                            value={editValues.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Description"
                            rows="3"
                          />
                          
                          <div className="flex gap-4">
                            <button
                              onClick={handleSaveEdit}
                              className="bg-green-500 text-white py-2 px-4 rounded-lg"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-red-500 text-white py-2 px-4 rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative p-4 rounded-lg shadow-lg w-full sm:w-[40%]">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2">{activity.title}</h3>
                          <p className="text-sm leading-relaxed mb-4">{activity.description}</p>
                          <img
                            src={activity.url1}
                            alt={activity.title}
                            className="w-full h-60 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleEditClick(activity)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                                    onClick={() => handleDeleteActivity(activity._id)}
                                    className="ml-5 mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Delete
                                </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                </div>
      );
};

export default AdminActivities;