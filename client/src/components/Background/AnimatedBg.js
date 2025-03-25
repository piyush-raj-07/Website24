import React from 'react';
import './AnimatedBg.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-background z-50">
      {[...Array(50)].map((_, index) => (
        <div key={index} className="particle"></div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
