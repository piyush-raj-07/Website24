import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Linkedin, Instagram } from 'lucide-react';

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function TeamPage() {
  const teamData = {
    presidentFounder: [
      { id: "1", name: "Dr. Vijay", role: "Founder", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1734711523/Screenshot_2024-12-20_214659_bddpps.png", linkedinUrl: "https://www.linkedin.com/in/dr-vijay", instagramUrl: "https://www.instagram.com/dr.vijay" },
      { id: "2", name: "Name of president", role: "President", imageUrl: "https://example.com/images/president1.jpg", linkedinUrl: "https://www.linkedin.com/in/president", instagramUrl: "https://www.instagram.com/president" },
    ],
    heads: [
      { id: "1", name: "Name of head", role: "Head of Web Team", imageUrl: "https://example.com/images/head1.jpg", linkedinUrl: "https://www.linkedin.com/in/head1", instagramUrl: "https://www.instagram.com/head1" },
      { id: "2", name: "Name of head", role: "Head of Design Team", imageUrl: "https://example.com/images/head2.jpg", linkedinUrl: "https://www.linkedin.com/in/head2", instagramUrl: "https://www.instagram.com/head2" },
      { id: "3", name: "Name of head", role: "Head of Content Team", imageUrl: "https://example.com/images/head3.jpg", linkedinUrl: "https://www.linkedin.com/in/head3", instagramUrl: "https://www.instagram.com/head3" },
      { id: "4", name: "Name of head", role: "Head of Autonomy Team", imageUrl: "https://example.com/images/head4.jpg", linkedinUrl: "https://www.linkedin.com/in/head4", instagramUrl: "https://www.instagram.com/head4" },
      { id: "5", name: "Name of head", role: "Head of Marketing", imageUrl: "https://example.com/images/head5.jpg", linkedinUrl: "https://www.linkedin.com/in/head5", instagramUrl: "https://www.instagram.com/head5" },
    ],
    web: [
      { name: "Web Developer 1", role: "Frontend Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev1", instagramUrl: "https://www.instagram.com/webdev1" },
      { name: "Web Developer 2", role: "Backend Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev2", instagramUrl: "https://www.instagram.com/webdev2" },
      { name: "Web Developer 3", role: "Full Stack Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev3", instagramUrl: "https://www.instagram.com/webdev3" },
      { name: "Web Developer 4", role: "UI Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev4", instagramUrl: "https://www.instagram.com/webdev4" },
      { name: "Web Developer 5", role: "API Specialist", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev5", instagramUrl: "https://www.instagram.com/webdev5" },
      { name: "Piyush Raj", role: "Full Stack", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/piyushraj", instagramUrl: "https://www.instagram.com/piyushraj" }
    ],
    design: [
      { name: "Designer 1", role: "UI Designer", imageUrl: "https://example.com/images/design1.jpg", linkedinUrl: "https://www.linkedin.com/in/design1", instagramUrl: "https://www.instagram.com/design1" },
      { name: "Designer 2", role: "UX Designer", imageUrl: "https://example.com/images/design2.jpg", linkedinUrl: "https://www.linkedin.com/in/design2", instagramUrl: "https://www.instagram.com/design2" },
      { name: "Designer 3", role: "Graphic Designer", imageUrl: "https://example.com/images/design3.jpg", linkedinUrl: "https://www.linkedin.com/in/design3", instagramUrl: "https://www.instagram.com/design3" },
      { name: "Designer 4", role: "Motion Designer", imageUrl: "https://example.com/images/design4.jpg", linkedinUrl: "https://www.linkedin.com/in/design4", instagramUrl: "https://www.instagram.com/design4" },
      { name: "Designer 5", role: "Product Designer", imageUrl: "https://example.com/images/design5.jpg", linkedinUrl: "https://www.linkedin.com/in/design5", instagramUrl: "https://www.instagram.com/design5" },
    ],
    content: [
      { name: "Content Creator 1", role: "Copywriter", imageUrl: "https://example.com/images/content1.jpg", linkedinUrl: "https://www.linkedin.com/in/content1", instagramUrl: "https://www.instagram.com/content1" },
      { name: "Content Creator 2", role: "Content Strategist", imageUrl: "https://example.com/images/content2.jpg", linkedinUrl: "https://www.linkedin.com/in/content2", instagramUrl: "https://www.instagram.com/content2" },
      { name: "Content Creator 3", role: "Social Media Specialist", imageUrl: "https://example.com/images/content3.jpg", linkedinUrl: "https://www.linkedin.com/in/content3", instagramUrl: "https://www.instagram.com/content3" },
      { name: "Content Creator 4", role: "SEO Specialist", imageUrl: "https://example.com/images/content4.jpg", linkedinUrl: "https://www.linkedin.com/in/content4", instagramUrl: "https://www.instagram.com/content4" },
      { name: "Content Creator 5", role: "Technical Writer", imageUrl: "https://example.com/images/content5.jpg", linkedinUrl: "https://www.linkedin.com/in/content5", instagramUrl: "https://www.instagram.com/content5" },
    ],
    autonomy: [
      { name: "Autonomy Engineer 1", role: "Machine Learning Engineer", imageUrl: "https://res.cloudinary.com/dzjd6gh2q/raw/upload/v1740401719/open_yggbzx", linkedinUrl: "https://www.linkedin.com/in/autonomy1", instagramUrl: "https://www.instagram.com/autonomy1" },
      { name: "Autonomy Engineer 2", role: "Computer Vision Specialist", imageUrl: "https://example.com/images/autonomy2.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy2", instagramUrl: "https://www.instagram.com/autonomy2" },
      { name: "Autonomy Engineer 3", role: "Robotics Engineer", imageUrl: "https://example.com/images/autonomy3.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy3", instagramUrl: "https://www.instagram.com/autonomy3" },
      { name: "Autonomy Engineer 4", role: "Control Systems Engineer", imageUrl: "https://example.com/images/autonomy4.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy4", instagramUrl: "https://www.instagram.com/autonomy4" },
      { name: "Autonomy Engineer 5", role: "Sensor Fusion Specialist", imageUrl: "https://example.com/images/autonomy5.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy5", instagramUrl: "https://www.instagram.com/autonomy5" },
    ],
  };  

  const customStyles = `
  .slick-slide {
    opacity: 0.7;
    transition: all 0.5s ease;
    transform: scale(0.95);
  }
  .slick-slide.slick-active {
    opacity: 1;
    transform: scale(1);
  }
  .slick-prev, .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 40px;
    height: 40px;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    z-index: 1;
    transition: all 0.3s ease;
  }
  .slick-prev:hover, .slick-next:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  .slick-prev {
    left: -50px;
  }
  .slick-next {
    right: -50px;
  }
  .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 30px;
    line-height: 1;
    opacity: 0.75;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }
  .slick-dots {
    bottom: -40px;
  }
  .slick-dots li button:before {
    font-size: 12px;
    color: white;
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    transform: scale(1.2);
  }
  .group:hover .group-hover\\:scale-110 {
    transform: scale(1.1);
  }
  .group:hover .group-hover\\:opacity-100 {
    opacity: 1;
  }
  .animate-gradient-x {
    animation: gradient-x 15s ease infinite;
  }
  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  `;

  return (
    <div className="bg-[#0c0c0c]">
      {/* Hero Section */}
      <div className="relative  h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-50" 
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dzjd6gh2q/image/upload/v1740392604/EESA_team_os3f17.jpg')",
          }}
          role="img"
          aria-label="Team background image"
        ></div>
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-2xl font-raleway font-bold md:text-3xl lg:text-4xl text-[white] mb-2">Meet Our Team</h1>
          <p className="text-purple-400 text-xl md:text-2xl lg:text-3xl mb-6 font-semibold font-raleway">EESA IIT Indore</p>
        </div>
      </div>

      {/* President and Founder Section */}
      <section className="bg-gradient-to-b from-black via-purple-900 to-indigo-900 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
        <h2 className="text-4xl font-raleway font-bold mb-20 text-white text-center relative z-10">Meet President and Founder</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4 relative z-10">
          {teamData.presidentFounder.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white font-raleway font-semibold">{member.name}</h3>
              <p className="text-gray-400 font-libre">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Heads Section */}
      <section className="bg-gradient-to-b from-indigo-900 via-purple-900 to-black py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white text-center relative z-10">Meet Our Heads</h2>
        <div className="px-12 relative z-10">
          <Slider {...carouselSettings} className="py-8">
            {teamData.heads.map((member) => (
              <div key={member.id} className="text-center px-4">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                  <img
                    src={member.imageUrl || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                      <Linkedin size={24} />
                    </a>
                    <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                      <Instagram size={24} />
                    </a>
                  </div>
                </div>
                <h3 className="text-white font-raleway font-semibold text-lg md:text-xl">{member.name}</h3>
                <p className="text-gray-400 font-libre text-sm">{member.role}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Teams Sections */}
      <WebTeamSection team={teamData.web} />
      <DesignTeamSection team={teamData.design} />
      <ContentTeamSection team={teamData.content} />
      <AutonomyTeamSection team={teamData.autonomy} />
      <style jsx>{customStyles}</style>
    </div>
  );
}

function WebTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-black via-purple-900 to-indigo-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2 className="text-4xl font-raleway font-bold mb-12 text-white text-center relative z-10">
        Meet Our Web Team
      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold font-raleway text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function DesignTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-indigo-900 via-purple-900 to-black py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2 className="text-4xl font-raleway font-bold mb-12 text-white text-center relative z-10">
        Meet Our Design Team
      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function ContentTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-black via-purple-900 to-indigo-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2 className="text-4xl font-raleway font-bold mb-12 text-white text-center relative z-10">
        Meet Our Content Team
      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function AutonomyTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-indigo-900 via-purple-900 to-black py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2 className="text-4xl font-raleway font-bold mb-12 text-white text-center relative z-10">
        Meet Our Autonomy Team
      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TeamPage;





