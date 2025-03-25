import React from 'react';
import './FallingStarsBackground.css';  // Import the CSS for the animations

const AnimatedBackground = () => (
  <svg className="animated-background" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <radialGradient id="purpleGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#000000" />
    <circle className="glow-circle" cx="50" cy="50" r="30" fill="url(#purpleGlow)" />
    <path className="interactive-path" d="M20,50 Q50,20 80,50" stroke="#8B5CF6" strokeWidth="0.5" fill="none" />
  </svg>
);

export default AnimatedBackground;