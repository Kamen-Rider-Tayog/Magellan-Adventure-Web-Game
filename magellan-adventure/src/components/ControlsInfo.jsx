import React, { useState, useEffect } from 'react';
import ArrowButton from './ArrowButton';

const ControlsInfo = ({ imageLoader, onArrowPress, onArrowRelease, onInteract, onToggleFullscreen }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    
    // Check fullscreen status
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', checkFullscreen);
    return () => document.removeEventListener('fullscreenchange', checkFullscreen);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
    if (onToggleFullscreen) onToggleFullscreen();
  };

  // Show fullscreen button only on mobile AND when not in fullscreen
  const showFullscreenButton = isMobile && !isFullscreen;

  return (
    <>
      {/* Arrow controls - LOWER LEFT (Always visible) */}
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

      {/* Interact button - LOWER RIGHT (Always visible) */}
      {onInteract && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 1000
        }}>
          {/* Fullscreen button - ABOVE E button (Mobile only, hidden when fullscreen) */}
          {showFullscreenButton && (
            <button
              onTouchStart={handleFullscreen}
              onClick={handleFullscreen}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '30px',
                backgroundColor: 'rgba(100, 100, 100, 0.9)',
                border: '3px solid #FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                touchAction: 'manipulation',
                boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                fontSize: '24px'
              }}
            >
              ⛶
            </button>
          )}
          
          {/* E button - Always visible */}
          <button
            onTouchStart={onInteract}
            onClick={(e) => {
              // Prevent double trigger on touch devices
              if (e.type === 'click' && isMobile) {
                e.preventDefault();
                return;
              }
              onInteract();
            }}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '35px',
              backgroundColor: 'rgba(255, 215, 0, 0.9)',
              border: '3px solid #FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              touchAction: 'manipulation',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000'
            }}
          >
            E
          </button>
        </div>
      )}
    </>
  );
};

export default ControlsInfo;