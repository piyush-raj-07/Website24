import React, { useEffect } from "react";
import Slider from "react-slick";
import { motion, useAnimation } from "framer-motion";
import { Linkedin, Instagram } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VantaBackground from "./Background/AnimatedBg";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import AnimatedBackground from "./Background/AnimatedBg";
// import { AnimatedBackground, AnimatedText } from 'animated-backgrounds';


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
    { name: "Autonomy Engineer 1", role: "Machine Learning Engineer", imageUrl: "https://example.com/images/autonomy1.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy1", instagramUrl: "https://www.instagram.com/autonomy1" },
    { name: "Autonomy Engineer 2", role: "Computer Vision Specialist", imageUrl: "https://example.com/images/autonomy2.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy2", instagramUrl: "https://www.instagram.com/autonomy2" },
    { name: "Autonomy Engineer 3", role: "Robotics Engineer", imageUrl: "https://example.com/images/autonomy3.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy3", instagramUrl: "https://www.instagram.com/autonomy3" },
    { name: "Autonomy Engineer 4", role: "Control Systems Engineer", imageUrl: "https://example.com/images/autonomy4.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy4", instagramUrl: "https://www.instagram.com/autonomy4" },
    { name: "Autonomy Engineer 5", role: "Sensor Fusion Specialist", imageUrl: "https://example.com/images/autonomy5.jpg", linkedinUrl: "https://www.linkedin.com/in/autonomy5", instagramUrl: "https://www.instagram.com/autonomy5" },
  ],
};

function TeamPage() {
  
  return (
    <div className=" min-h-screen overflow-hidden">
      <VantaBackground/>
      <div className="relative z-10">
        <HeroSection />
        <PresidentFounderSection teamData={teamData} />
        <HeadsSection teamData={teamData} />
        <TeamSection title="Web Team" team={teamData.web} />
        <TeamSection title="Design Team" team={teamData.design} />
        <TeamSection title="Content Team" team={teamData.content} />
        <TeamSection title="Autonomy Team" team={teamData.autonomy} />
      </div>
    </div>
  );
}

// function AnimatedBackground() {
//   return (
//     <div className="fixed inset-0 z-0">
//       <div className="absolute inset-0 bg-black"></div>
//       <div className="absolute inset-0 opacity-30">
//         {[...Array(50)].map((_, i) => (
//           <div key={i} className="firefly"></div>
//         ))}
//       </div>
//     </div>
//   );
// }

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-[600px] flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Meet Our Team</h1>
        <p className="text-purple-400 text-xl md:text-2xl lg:text-3xl mb-6">EESA IIT Indore</p>
      </div>
    </motion.div>
  );
}

function PresidentFounderSection({ teamData }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 relative"
    >
      <h2 className="text-4xl font-bold mb-12 text-white text-center">President and Founder</h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
        {teamData.presidentFounder.map((member) => (
          <AnimatedCard key={member.id} member={member} />
        ))}
      </div>
    </motion.section>
  );
}

function HeadsSection({ teamData }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 relative"
    >
      <h2 className="text-4xl font-bold mb-12 text-white text-center">Our Heads</h2>
      <Slider {...carouselSettings} className="py-8">
        {teamData.heads.map((member) => (
          <div key={member.id} className="px-4">
            <AnimatedCard member={member} />
          </div>
        ))}
      </Slider>
    </motion.section>
  );
}

function TeamSection({ title, team }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 relative"
    >
      <h2 className="text-4xl font-bold mb-12 text-white text-center">{title}</h2>
      <Slider {...carouselSettings} className="py-8">
        {team.map((member) => (
          <div key={member.name} className="px-4">
            <AnimatedCard member={member} />
          </div>
        ))}
      </Slider>
    </motion.section>
  );
}

function AnimatedCard({ member }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    });
  }, [controls]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={controls}
      className="text-center"
    >
      <div className="relative w-48 h-48 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg group">
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
      <h3 className="text-white font-semibold text-lg">{member.name}</h3>
      <p className="text-purple-300">{member.role}</p>
    </motion.div>
  );
}

const customStyles = `
  @keyframes firefly {
    0% { transform: translateY(0) scale(0); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(-100vh) scale(1); opacity: 0; }
  }
  .firefly {
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: #a855f7;
    border-radius: 50%;
    animation: firefly 5s linear infinite;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    animation-delay: ${Math.random() * 5}s;
  }
`;

export default TeamPage;
