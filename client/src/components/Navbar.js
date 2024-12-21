import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
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
    <div className={`fixed flex w-full items-center transition-all duration-300 h-24 ${scrolled ? 'bg-opacity-60 bg-purple-700 text-white' : 'bg-black text-purple-300'} ${window.innerWidth < 768 ? 'h-auto bg-purple-700 bg-opacity-100 z-50 text-white border-white': ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img
              className="h-14 w-14"
              src="https://media.licdn.com/dms/image/v2/D4E0BAQFf2jcJ2oNktw/company-logo_200_200/company-logo_200_200/0/1698123847006/electrical_engineering_students_association_logo?e=2147483647&v=beta&t=zzl7X_9804zqoLHSmQMj9MEx4R-Uhn21av4FI-atops"
              alt="Workflow"
            />
            <div>
              <span className="text-3xl font-extrabold">EESA</span>
              <sub className="text-xl font-light">IIT Indore</sub>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {['/', '/blogs', '/activities', '/btp', '/study', '/team', '/notices', '/contact', '/about'].map((path, index) => (
              <Link
              key={index}
              to={path}
              className={`text-2xl font-semibold px-0 py-2 relative transition-all duration-300 ${
                isActive(path)
                  ? `${scrolled ? 'border-b-purple-600' : 'border-b-white'} border-b-2`
                  : 'hover:border-b-2 hover:border-b-purple-600'
              }`}
            >
              {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
            </Link>
            
            ))}
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
            {['/', '/blogs', '/activities', '/btp', '/study', '/team', '/notices', '/contact', '/about'].map((path, index) => (
              <Link
              key={index}
              to={path}
              className={`text-2xl font-semibold px-4 py-2 transition-all duration-300 ${
                isActive(path) ? 'border-b-2 border-b-purple-600' : 'hover:border-b-2 hover:border-b-purple-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
                {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
