import React from 'react';
import './FallingStarsBackground.css';  // Import the CSS for the animations

const FallingStars = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="falling-stars">
          {[...Array(60)].map((_, index) => (
            <div
              key={index}
              className="star absolute rounded-full bg-purple-400 animate-fall"
              style={{
                animationDelay: `${Math.random() * 5}s`, // Random delay
                left: `${Math.random() * 100}%`, // Random horizontal position
                top: `${Math.random() * 100}%`, // Random vertical position
                width: `${Math.random() * 20 + 5}px`, // Random size (5px to 25px)
                height: `${Math.random() * 20 + 5}px`, // Random size (5px to 25px)
                filter: `blur(${10}px)` // Random blur (1px to 3px)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FallingStars;
