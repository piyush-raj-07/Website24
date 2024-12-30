import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex w-full items-center transition-all duration-300 h-24 ${scrolled ? 'bg-opacity-60 bg-purple-700 text-white' : 'bg-black text-purple-300'} ${window.innerWidth < 768 ? 'h-auto bg-purple-700 bg-opacity-100 z-50 text-white border-white' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-14 w-14 rounded-md"
                src="https://media.licdn.com/dms/image/v2/D4E0BAQFf2jcJ2oNktw/company-logo_200_200/company-logo_200_200/0/1698123847006/electrical_engineering_students_association_logo?e=2147483647&v=beta&t=zzl7X_9804zqoLHSmQMj9MEx4R-Uhn21av4FI-atops"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${isActive('/') ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2` : 'hover:border-b-2 hover:border-b-purple-600'}`}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${isActive('/blogs') ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2` : 'hover:border-b-2 hover:border-b-purple-600'}`}
            >
              Blogs
            </Link>
            <Link
              to="/activities"
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${isActive('/activities') ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2` : 'hover:border-b-2 hover:border-b-purple-600'}`}
            >
              Activities
            </Link>
            <Link
              to="/projects"
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${isActive('/projects') ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2` : 'hover:border-b-2 hover:border-b-purple-600'}`}
            >
              Projects
            </Link>
            <Link
              to="/team"
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${isActive('/team') ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2` : 'hover:border-b-2 hover:border-b-purple-600'}`}
            >
              Team
            </Link>
            <Link
              to="/notices"
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${isActive('/notices') ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2` : 'hover:border-b-2 hover:border-b-purple-600'}`}
            >
              Notices
            </Link>
            <Link
              to="/Gallery"
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${
                isActive('/Gallery')
                  ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2`
                  : 'hover:border-b-2 hover:border-b-purple-600'
              }`}
            >
              Gallery
            </Link>
            {isAuthenticated ? (
              <Link to="/profilepage" className="h-10 w-10">
                <CgProfile className="h-full w-full" />
              </Link>
            ) : (
              <Link to="/login" >
              <button className="p-3 text-white bg-purple-600 rounded-md transition-all duration-300 transform hover:bg-purple-700 hover:scale-105 hover:shadow-lg">
                Login
              </button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="text-3xl font-bold text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '×' : '≡'}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-6 mt-6 bg-purple-700 py-6">
            <Link
              to="/"
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${isActive('/') ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${isActive('/blogs') ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/activities"
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${isActive('/activities') ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Activities
            </Link>
            <Link
              to="/projects"
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${isActive('/projects') ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/team"
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${isActive('/team') ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link
              to="/notices"
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${isActive('/notices') ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Notices
            </Link>
            <Link
              to="/contact"
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${isActive('/contact') ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
