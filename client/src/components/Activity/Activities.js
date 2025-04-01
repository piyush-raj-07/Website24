import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import Loader from "../../components/status_pages/Loader";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API}/GetActivity`);
      setActivities(res.data);
      setError(null);
    } catch (error) {
      console.error("Detailed error:", error);
      setError(`Error fetching activities: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Memoized particle options with improved visibility
  const particleOptions = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: { 
        value: 50,
        density: { enable: true, area: 800 } 
      },
      color: { value: ["#AE7BC3", "#ffffff"] },
      shape: { type: ["circle"] },
      opacity: { 
        value: { min: 3, max: 5 },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 1,
          sync: false
        }
      },
      size: { 
        value: { min: 2, max: 5 },
        random: { enable: true },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "bottom",
        random: true,
        straight: false,
        outMode: "out",
        bounce: false,
        attract: {
          enable: false
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: { 
        onHover: {
          enable: true, 
          mode: "repulse" 
        },
        onClick: {
          enable: true,
          mode: "push"
        }
      },
      modes: { 
        repulse: { 
          distance: 100,
          duration: 0.4,
          factor: 5
        },
        push: {
          quantity: 4
        }
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          particles: {
            number: { value: 30 }
          }
        }
      }
    ],
    detectRetina: true
  }), []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl gap-10 sm:gap-12 md:gap-16">
        {activities.map((activity, index) => (
          <div
            key={activity._id}
            className="w-full mb-8"
          >
            {/* Mobile View */}
            <div className="block sm:hidden">
              <div className="relative rounded-lg shadow-lg w-full overflow-hidden h-[400px]">
                {/* Image Section */}
                <div className="absolute top-0 left-0 right-0 h-[60%] overflow-hidden">
                  <div className="absolute top-4 left-4 right-4 bottom-4 overflow-hidden group">
                    <div
                      className="w-full h-full relative"
                      style={{
                        position: "relative",
                        paddingLeft: "20px",
                        paddingTop: "8px",
                      }}
                    >
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          content: '""',
                          position: "absolute",
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
                          maskImage:
                            "linear-gradient(135deg, transparent 10%, black 10%)",
                          WebkitMaskImage:
                            "linear-gradient(135deg, transparent 10%, black 10%)",
                          borderTop: "2px solid #9F7AEA",
                        }}
                      >
                        <img
                          src={activity.url1}
                          alt={activity.title}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <a
                        href={activity.url2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full font-semibold hover:bg-black transition-colors duration-300"
                      >
                        <img
                          src="/insta.jpeg"
                          alt="Instagram"
                          className="w-4 h-4"
                        />
                        <span className="text-sm">visit @EESA for more..</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-opacity-60 bg-black text-white font-serif p-4 overflow-auto">
                  <h3 className="text-xl font-bold mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-libre">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Tablet and Desktop View */}
            <div className={`hidden sm:flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } w-full justify-between items-start gap-6`}>
              <div className="relative p-4 rounded-lg shadow-lg sm:w-[65%] md:w-[50%] overflow-hidden h-[350px] md:h-[400px]">
                <div className="absolute top-4 left-4 w-[80%] h-[80%] overflow-hidden group">
                  <div
                    className="w-full h-full relative"
                    style={{
                      position: "relative",
                      paddingLeft: "20px",
                      paddingTop: "8px",
                    }}
                  >
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        content: '""',
                        position: "absolute",
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
                        maskImage:
                          "linear-gradient(135deg, transparent 10%, black 10%)",
                        WebkitMaskImage:
                          "linear-gradient(135deg, transparent 10%, black 10%)",
                        borderTop: "2px solid #9F7AEA",
                      }}
                    >
                      <img
                        src={activity.url1}
                        alt={activity.title}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href={activity.url2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full font-semibold hover:bg-black transition-colors duration-300"
                    >
                      <img
                        src="/insta.jpeg"
                        alt="Instagram"
                        className="w-5 h-5"
                      />
                      <span>visit @EESA for more..</span>
                    </a>
                  </div>
                </div>
                <div 
                  className="absolute bottom-4 right-4 bg-opacity-60 bg-black text-white font-serif p-4 rounded-lg w-[60%]"
                  style={{
                    maxHeight: '45%',
                    overflow: 'auto'
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed font-libre">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
