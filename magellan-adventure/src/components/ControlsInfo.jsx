import React from 'react';
import ArrowButton from './ArrowButton';

const ControlsInfo = ({ imageLoader, onArrowPress, onArrowRelease }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: '#FFF',
        fontSize: '14px',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000
      }}>
        <div>WASD / Arrow Keys - Move</div>
        <div>E - Interact / Continue</div>
        <div>M - Toggle Map</div>
        <div>ESC - Settings</div>
      </div>

      {/* Mobile controls */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          zIndex: 1000
        }}>
          <div></div>
          <ArrowButton 
            direction="UP" 
            imageLoader={imageLoader}
            onPress={() => onArrowPress('UP')}
            onRelease={() => onArrowRelease('UP')}
          />
          <div></div>
          <ArrowButton 
            direction="LEFT" 
            imageLoader={imageLoader}
            onPress={() => onArrowPress('LEFT')}
            onRelease={() => onArrowRelease('LEFT')}
          />
          <ArrowButton 
            direction="DOWN" 
            imageLoader={imageLoader}
            onPress={() => onArrowPress('DOWN')}
            onRelease={() => onArrowRelease('DOWN')}
          />
          <ArrowButton 
            direction="RIGHT" 
            imageLoader={imageLoader}
            onPress={() => onArrowPress('RIGHT')}
            onRelease={() => onArrowRelease('RIGHT')}
          />
        </div>
      )}
    </>
  );
};

export default ControlsInfo;