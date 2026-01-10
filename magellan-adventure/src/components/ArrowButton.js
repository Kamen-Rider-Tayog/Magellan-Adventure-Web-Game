import React from 'react';

const ArrowButton = ({ direction, onPress, onRelease, imageLoader }) => {
  const getImage = () => {
    switch (direction) {
      case 'UP': return imageLoader.get('arrowUp');
      case 'DOWN': return imageLoader.get('arrowDown');
      case 'LEFT': return imageLoader.get('arrowLeft');
      case 'RIGHT': return imageLoader.get('arrowRight');
      default: return null;
    }
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: 'rgba(139, 69, 19, 0.8)',
    border: '2px solid #FFD700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'manipulation'
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
          style={{ width: '40px', height: '40px' }}
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