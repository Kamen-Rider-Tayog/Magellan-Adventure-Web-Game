import React from 'react';

const NarrativeScreen = ({ showNarrative, narrativeText }) => {
  if (!showNarrative) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      color: '#DDD',
      fontSize: '24px',
      textAlign: 'center',
      lineHeight: 1.6,
      zIndex: 2000
    }}>
      <div style={{ maxWidth: '800px' }}>
        {narrativeText}
      </div>
      <div style={{
        position: 'absolute',
        bottom: 30,
        right: 30,
        color: '#FFD700',
        fontSize: '18px',
        animation: 'pulse 1.5s infinite'
      }}>
        Press E to continue
      </div>
    </div>
  );
};

export default NarrativeScreen;