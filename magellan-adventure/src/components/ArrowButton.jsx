import React from 'react';

const ArrowButton = ({ direction, onPress, onRelease, imageLoader }) => {
  const getImage = () => {
    switch (direction) {
      case 'UP': return imageLoader.getImage('arrow_up');
      case 'DOWN': return imageLoader.getImage('arrow_down');
      case 'LEFT': return imageLoader.getImage('arrow_left');
      case 'RIGHT': return imageLoader.getImage('arrow_right');
      default: return null;
    }
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: 'rgba(139, 69, 19, 0.9)', // Darker brown, more opaque
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'manipulation',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
  };

  const arrowImage = getImage();

  return (
    <div
      style={buttonStyle}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onTouchStart={onPress}
      onTouchEnd={onRelease}
    >
      {arrowImage ? (
        <img 
          src={arrowImage.src} 
          alt={direction}
          style={{ width: '35px', height: '35px' }}
        />
      ) : (
        <span style={{ color: '#FFF', fontSize: '24px', fontWeight: 'bold' }}>
          {direction === 'UP' && '↑'}
          {direction === 'DOWN' && '↓'}
          {direction === 'LEFT' && '←'}
          {direction === 'RIGHT' && '→'}
        </span>
      )}
    </div>
  );
};

export default ArrowButton;