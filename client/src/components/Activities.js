import React, { useEffect, useState } from "react";
import axios from "axios";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
        setLoading(true);
        console.log('Fetching activities...'); 
        const res = await axios.get('http://localhost:5000/GetActivity');
        console.log('Response:', res.data); 
        setActivities(res.data);
        setError(null);
    } catch (error) {
        console.log('Detailed error:', error); 
        setError(`Error fetching activities: ${error.message}`);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    fetchActivities();
  }, []);

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
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-12 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 animate-bgMove"
        style={{
          backgroundImage: "url('/black.png')",
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      <div className="relative z-10 w-full text-center mb-12">
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl gap-16">
        {activities.map((activity, index) => (
          <div 
            key={activity._id} 
            className={`flex flex-col ${
              index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
            } w-full justify-between items-center sm:items-start gap-6`}
          >
            <div className="relative p-4 rounded-lg shadow-lg w-full sm:w-[60%] overflow-hidden h-[350px] max-w-lg">
              <div className="absolute top-4 left-4 w-[80%] h-[80%] overflow-hidden group">
                <div
                  className="w-full h-full relative"
                  style={{
                    position: 'relative',
                    paddingLeft: '10px',
                    paddingTop: '2px',
                  }}
                >
                  <div
                    className="absolute inset-0 z-0"
                    style={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, transparent 10%, #9F7AEA 10%, #9F7AEA 80%, transparent 80%)`,
                      zIndex: -1,
                    }}
                  ></div>

                  <div
                    className="w-full h-full"
                    style={{
                      maskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                      WebkitMaskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                      borderTop: '2px solid #9F7AEA'
                    }}
                  >
                    <img
                      src={activity.url}
                      alt={activity.title}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href="https://www.instagram.com/eesa_iiti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full font-semibold hover:bg-black transition-colors duration-300"
                  >
                    <img src="/insta.jpeg" alt="Instagram" className="w-5 h-5" />
                    <span>visit @EESA for more..</span>
                  </a>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-opacity-75 text-white p-4 rounded-lg w-[60%]">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {activity.title}
                </h3>
                <p className="text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;