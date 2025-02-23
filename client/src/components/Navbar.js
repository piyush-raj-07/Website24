import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CgProfile } from 'react-icons/cg';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  const hamburgerVariants = {
    open: { rotate: 45, y: 5 },
    closed: { rotate: 0, y: 0 }
  };

  const navbarClass = 'bg-transparent text-white';

  const animatedUnderlineClass = `
    relative
    before:content-['']
    before:absolute
    before:block
    before:w-full
    before:h-[2px]
    before:bottom-0
    before:left-0
    before:bg-purple-600
    before:transform
    before:scale-x-0
    before:transition-transform
    before:duration-300
    before:origin-left
    hover:before:scale-x-100
  `;

  return (
    <nav className={`relative w-full z-50 transition-all duration-300 ${navbarClass} `}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex-shrink-0">
            <img
              className="h-14 w-14 rounded-md transition-transform duration-300 hover:scale-110"
              src="https://media.licdn.com/dms/image/v2/D4E0BAQFf2jcJ2oNktw/company-logo_200_200/company-logo_200_200/0/1698123847006/electrical_engineering_students_association_logo?e=2147483647&v=beta&t=zzl7X_9804zqoLHSmQMj9MEx4R-Uhn21av4FI-atops"
              alt="Logo"
            />
          </Link>

          <div className="hidden md:flex items-center justify-center flex-grow ">
            {['Home', 'Blogs', 'Activities', 'Projects', 'Team', 'Notices', 'Gallery'].map((item) => (
              <motion.div key={item} variants={linkVariants} whileHover="hover" className="mx-3 bg-opacity-10 backdrop-filter backdrop-blur-lg">
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`text-2xl font-semibold px-0 py-2 ${animatedUnderlineClass} ${
                    isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                      ? 'before:scale-x-100'
                      : ''
                  }`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:block">
            {isAuthenticated ? (
              user && (
                <Link to={`/profile/${user._id}`} >
                  <CgProfile className="h-14 w-14 transition-transform duration-300 hover:scale-110" />
                </Link>
              )
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 text-white bg-purple-600 rounded-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <motion.button
              animate={isMenuOpen ? "open" : "closed"}
              variants={hamburgerVariants}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10"
            >
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 ${isMenuOpen ? 'rotate-90 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 ${isMenuOpen ? '-rotate-180 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"
        >
          <div className="flex flex-col items-center">
            {['Home', 'Blogs', 'Activities', 'Projects', 'Team', 'Notices', 'Gallery'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`block text-2xl font-semibold px-4 py-2 transition-all duration-300 ${animatedUnderlineClass} ${
                  isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                    ? 'before:scale-x-100'
                    : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {isAuthenticated ? (
              user && (
                <Link to={`/profile/${user._id}`} onClick={() => setIsMenuOpen(false)}>
                  <CgProfile className="h-14 w-14 transition-transform duration-300 hover:scale-110 mt-4" />
                </Link>
              )
            ) : (
              <Link to="/login" className="mt-4" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 text-white bg-purple-600 rounded-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
