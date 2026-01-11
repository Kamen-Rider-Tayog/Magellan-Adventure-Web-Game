import React from 'react';

const NarrativeScreen = ({ narratives, narrativeIndex, onContinue }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      color: '#DDD',
      fontSize: '24px',
      textAlign: 'center',
      lineHeight: 1.8,
      fontFamily: "'MagellanFont', serif", // Add custom font
      zIndex: 200
    }}>
      <div style={{ maxWidth: '900px' }}>
        {(narratives[narrativeIndex] || '').split('\n').map((line, i) => (
          <p key={i} style={{ marginBottom: '20px' }}>{line}</p>
        ))}
      </div>
      <div style={{
        position: 'absolute',
        bottom: 30,
        right: 30,
        color: '#FFD700',
        fontSize: '18px',
        animation: 'pulse 1.5s infinite',
        fontFamily: "'MagellanFont', serif" // Add custom font
      }}>
        Press E to continue
      </div>
    </div>
  );
};

export default NarrativeScreen;