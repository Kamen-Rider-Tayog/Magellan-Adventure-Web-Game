import React, { useEffect } from 'react';

const TitleScreen = ({ onStartGame }) => {
  // Handle keyboard input (Enter key)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onStartGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onStartGame]);

  // Handle touch/mobile input
  const handleTouchStart = (e) => {
    e.preventDefault();
    onStartGame();
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url('${process.env.PUBLIC_URL}/assets/backgrounds/title.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        fontFamily: "'MagellanFont', Georgia, serif"  // Custom font added
      }}
      onClick={onStartGame}
      onTouchStart={handleTouchStart}
      title="Click or press Enter to start"
    />
  );
};

export default TitleScreen;