import React from 'react';
import ArrowButton from './ArrowButton';

const ControlsInfo = ({ imageLoader, onArrowPress, onArrowRelease }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      {/* Arrow controls - LOWER LEFT (Mobile Only) */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          zIndex: 1000,
          padding: '10px',
          borderRadius: '10px'
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