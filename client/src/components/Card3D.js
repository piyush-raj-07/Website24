import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Card3D({ cardTitle, coverImage, description }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const cardRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    particlesRef.current = Array(10)
      .fill()
      .map(() => ({
        x: Math.random() * 250, // Updated for new card width
        y: Math.random() * 350, // Updated for new card height
        size: Math.random() * 4 + 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    setParticles(particlesRef.current);
  }, []);

  useEffect(() => {
    const updateParticles = () => {
      particlesRef.current = particlesRef.current.map((particle) => ({
        ...particle,
        x: (particle.x + particle.vx + 250) % 250, // Updated width
        y: (particle.y + particle.vy + 350) % 350, // Updated height
      }));
      setParticles([...particlesRef.current]);
    };

    const intervalId = setInterval(updateParticles, 50);
    return () => clearInterval(intervalId);
  }, []);

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000 group cursor-pointer"
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-[250px] h-[350px] bg-white rounded-xl shadow-xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Cover Image */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <motion.img
            src={coverImage || "/placeholder.svg"}
            alt={cardTitle}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-70"></div>
        </div>

        {/* Particle Effect */}
        <svg className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
          {particles.map((particle, index) => (
            <circle key={index} cx={particle.x} cy={particle.y} r={particle.size} fill="rgba(216, 180, 254, 0.5)" />
          ))}
        </svg>

        {/* Content Layer */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4 text-[#f9f9f8a0]"
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.h2
            className="text-lg font-bold mb-2 font-raleway shadow-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {cardTitle}
          </motion.h2>
          <motion.p
            className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {description || "This is a description"}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

