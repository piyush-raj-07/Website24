import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Linkedin } from 'lucide-react';

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
  // const [teamData, setTeamData] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/team")
  //     .then((response) => response.json())
  //     .then((data) => setTeamData(data))
  //     .catch((error) => console.error("Error fetching team data:", error));
  // }, []);

  // if (!teamData) {
  //   return <div className="text-center text-white">Loading...</div>;
  // }
  const teamData = {
    presidentFounder: [
      { id: "1", name: "Dr. Vijay", role: "Founder", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1734711523/Screenshot_2024-12-20_214659_bddpps.png", linkedinUrl: "https://www.linkedin.com/in/dr-vijay" },
      { id: "2", name: "Name of president", role: "President", imageUrl: "https://example.com/images/president1.jpg", linkedinUrl: "https://www.linkedin.com/in/president" },
    ],
    heads: [
      { id: "1", name: "Name of head", role: "Head of Web Team", imageUrl: "https://example.com/images/head1.jpg", linkedinUrl: "https://www.linkedin.com/in/head1" },
      { id: "2", name: "Name of head", role: "Head of Design Team", imageUrl: "https://example.com/images/head2.jpg", linkedinUrl: "https://www.linkedin.com/in/head2" },
      { id: "3", name: "Name of head", role: "Head of Content Team", imageUrl: "https://example.com/images/head3.jpg", linkedinUrl: "https://www.linkedin.com/in/head3" },
      { id: "4", name: "Name of head", role: "Head of Autonomy Team", imageUrl: "https://example.com/images/head4.jpg", linkedinUrl: "https://www.linkedin.com/in/head4" },
      { id: "5", name: "Name of head", role: "Head of Marketing", imageUrl: "https://example.com/images/head5.jpg", linkedinUrl: "https://www.linkedin.com/in/head5" },
    ],
    web: [
      { name: "Web Developer 1", role: "Frontend Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev1" },
      { name: "Web Developer 2", role: "Backend Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev2" },
      { name: "Web Developer 3", role: "Full Stack Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev3" },
      { name: "Web Developer 4", role: "UI Developer", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev4" },
      { name: "Web Developer 5", role: "API Specialist", imageUrl: "http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev5" },
      { name: "Piyush Raj ",role:"Full Stack",imageUrl:"http://res.cloudinary.com/duir0ktqb/image/upload/v1734531379/h78jpdjqrfd1udiwafd7.jpg", linkedinUrl: "https://www.linkedin.com/in/piyushraj" }
      // Add more web team members as needed
    ],
    design: [
      { name: "Designer 1", role: "UI Designer", imageUrl: "https://example.com/images/design1.jpg", linkedinUrl: "https://www.linkedin.com/in/design1" },
      { name: "Designer 2", role: "UX Designer", imageUrl: "https://example.com/images/design2.jpg", linkedinUrl: "https://www.linkedin.com/in/design2" },
      { name: "Designer 3", role: "Graphic Designer", imageUrl: "https://example.com/images/design3.jpg", linkedinUrl: "https://www.linkedin.com/in/design3" },
      { name: "Designer 4", role: "Motion Designer", imageUrl: "https://example.com/images/design4.jpg", linkedinUrl: "https://www.linkedin.com/in/design4" },
      { name: "Designer 5", role: "Product Designer", imageUrl: "https://example.com/images/design5.jpg", linkedinUrl: "https://www.linkedin.com/in/design5" },
      // Add more design team members as needed
    ],
    content: [
      { name: "Content Creator 1", role: "Copywriter", imageUrl: "https://example.com/images/content1.jpg", linkedinUrl: "https://www.linkedin.com/in/content1" },
      { name: "Content Creator 2", role: "Content Strategist", imageUrl: "https://example.com/images/content2.jpg", linkedinUrl: "https://www.linkedin.com/in/content2" },
      { name: "Content Creator 3", role: "Social Media Specialist", imageUrl: "https://example.com/images/content3.jpg", linkedinUrl: "https://www.linkedin.com/in/content3" },
      { name: "Content Creator 4", role: "SEO Specialist", imageUrl: "https://example.com/images/content4.jpg", linkedinUrl: "https://www.linkedin.com/in/content4" },
      { name: "Content Creator 5", role: "Technical Writer", imageUrl: "https://example.com/images/content5.jpg", linkedinUrl: "https://www.linkedin.com/in/content5" },
      // Add more content team members as needed
    ],
    autonomy: [
      { name: "Autonomy Engineer 1", role: "Machine Learning Engineer", imageUrl: "https://example.com/images/autonomy1.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy1" },
      { name: "Autonomy Engineer 2", role: "Computer Vision Specialist", imageUrl: "https://example.com/images/autonomy2.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy2" },
      { name: "Autonomy Engineer 3", role: "Robotics Engineer", imageUrl: "https://example.com/images/autonomy3.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy3" },
      { name: "Autonomy Engineer 4", role: "Control Systems Engineer", imageUrl: "https://example.com/images/autonomy4.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy4" },
      { name: "Autonomy Engineer 5", role: "Sensor Fusion Specialist", imageUrl: "https://example.com/images/autonomy5.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy5" },
      // Add more autonomy team members as needed
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
`;

  return (
    <div className="bg-[#0c0c0c]">
      {/* Hero Section */}
      <div className="relative bg-[#312b31] h-[600px] ">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{
            backgroundImage: "url('https://res.cloudinary.com/duir0ktqb/image/upload/v1734713680/Screenshot_2024-12-20_222342_fjuoar.png')",
            filter: "brightness(80%)",
          }}
          role="img"
          aria-label="Team background image"
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Meet Our Team</h1>
          <p className="text-[white] text-2xl md:text-3xl lg:text-4xl mb-6 font-semibold font-serif">EESA IIT Indore</p>
          {/* <button className="bg-[#0f6cd6] text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-[#0f6cd6]">
            Learn More
          </button> */}
        </div>
      </div>

      {/* President and Founder Section */}
      <section className="bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black py-16">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">Meet President and Founder</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
          {teamData.presidentFounder.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                    <Linkedin size={32} />
                  </a>
                </div>
              </div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Heads Section */}
      <section className="bg-gradient-to-t from-black via-[rgba(142,44,192,0.9)] to-black py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white text-center">Meet Our Heads</h2>
        <div className="px-12">
          <Slider {...carouselSettings} className="py-8">
            {teamData.heads.map((member) => (
              <div key={member.id} className="text-center px-4">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                      <Linkedin size={32} />
                    </a>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg md:text-xl">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
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
      {/* Footer */}
      
    </div>
  );
}

function WebTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-t from-black via-[rgba(142,44,192,0.9)] to-black py-16">
      <h2 className="text-4xl font-bold mb-12 text-white text-center">
        Meet Our Web Team
      </h2>
      <div className="px-12">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                    <Linkedin size={32} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
              {/* <p className="text-gray-300 text-sm">{member.role || 'Web Developer'}</p> */}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function DesignTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black py-16">
      <h2 className="text-4xl font-bold mb-12 text-white text-center">
        Meet Our Design Team
      </h2>
      <div className="px-12">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                    <Linkedin size={32} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
              {/* <p className="text-gray-300 text-sm">{member.role || 'Design Developer'}</p> */}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function ContentTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-t from-black via-[rgba(142,44,192,0.9)] to-black py-16">
      <h2 className="text-4xl font-bold mb-12 text-white text-center">
        Meet Our Content Team
      </h2>
      <div className="px-12">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                    <Linkedin size={32} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
              {/* <p className="text-gray-300 text-sm">{member.role || 'Content Creator'}</p> */}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function AutonomyTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-t from-black via-[rgba(95,3,141,0.9)] to-black py-16">
      <h2 className="text-4xl font-bold mb-12 text-white text-center">
        Meet Our Autonomy Team
      </h2>
      <div className="px-12">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                    <Linkedin size={32} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
              {/* <p className="text-gray-300 text-sm">{member.role || 'Autonomy Engineer'}</p> */}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TeamPage;



