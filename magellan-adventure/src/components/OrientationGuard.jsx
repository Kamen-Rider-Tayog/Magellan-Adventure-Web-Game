import React, { useState, useEffect } from 'react';

const OrientationGuard = ({ children }) => {
  const [isLandscape, setIsLandscape] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      if (mobile) {
        const landscape = window.innerWidth > window.innerHeight;
        setIsLandscape(landscape);
      } else {
        setIsLandscape(true);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (isMobile && !isLandscape) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #0a2e38 0%, #1a1a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        padding: '20px',
        textAlign: 'center',
        zIndex: 9999
      }}>
        <div style={{
          fontSize: '60px',
          marginBottom: '30px',
          animation: 'rotate 2s ease-in-out infinite'
        }}>
          📱↻
        </div>
        <h2 style={{
          fontSize: '28px',
          marginBottom: '20px',
          color: '#FFD700',
          fontFamily: "'MagellanFont', 'Times New Roman', serif"
        }}>
          Please Rotate Your Device
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#DDD',
          maxWidth: '400px',
          lineHeight: 1.6
        }}>
          This game is best experienced in landscape mode. Please rotate your device to continue.
        </p>
        <style>{`
          @keyframes rotate {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(90deg); }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default OrientationGuard;