import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import VANTA from 'vanta/dist/vanta.net.min';

function VantaBackground() {
    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);
    
    useEffect(() => {
        if (!vantaEffect) {
          setVantaEffect(
            VANTA.NET({
              el: myRef.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0xff3ff4,
              backgroundColor: 0x0
            })
          );
        }
        return () => {
          if (vantaEffect) vantaEffect.destroy();
          
        };
      }, [vantaEffect]);
      
  
    return <div ref={myRef} style={{ width: '100%', height: '100vh' }}></div>;
  }

export default VantaBackground;