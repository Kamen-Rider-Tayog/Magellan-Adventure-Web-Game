import React, { useEffect } from 'react';
import { imageLoader } from '../utils/ImageLoader';

const TitleScreen = ({ onStartGame }) => {
  // Handle all input methods
  const handleStart = (e) => {
    e?.preventDefault();
    onStartGame();
  };

  useEffect(() => {
    // Only handle Enter key
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleStart(e);
      }
    };

    // Add listener
    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup - remove listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onStartGame]); // Only re-run if onStartGame changes

  // Get title background from image loader
  const titleBg = imageLoader.getImage('background_title');

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: titleBg ? `url(${titleBg.src})` : `url('${process.env.PUBLIC_URL}/assets/backgrounds/title.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
      onClick={handleStart}
      onTouchStart={handleStart}
      title="Click or press Enter to start"
    />
  );
};

export default TitleScreen;