import React from 'react';

const TitleScreen = ({ onStartGame }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, #000428, #004e92)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFF',
      fontFamily: 'serif',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '72px',
        marginBottom: '20px',
        textShadow: '3px 3px 5px rgba(0,0,0,0.5)',
        color: '#FFD700'
      }}>
        MAGELLAN'S JOURNEY
      </h1>
      <p style={{
        fontSize: '24px',
        marginBottom: '50px',
        maxWidth: '800px',
        lineHeight: 1.6
      }}>
        Follow the historic voyage of Ferdinand Magellan as he searches for a westward route to the Spice Islands
      </p>
      <button
        onClick={onStartGame}
        style={{
          padding: '20px 60px',
          fontSize: '28px',
          background: 'linear-gradient(to bottom, #228B22, #006400)',
          color: '#FFF',
          border: '4px solid #FFD700',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        BEGIN VOYAGE
      </button>
      <div style={{
        position: 'absolute',
        bottom: 30,
        fontSize: '14px',
        color: '#CCC'
      }}>
        Use WASD/Arrow Keys to move • E to interact • ESC for settings
      </div>
    </div>
  );
};

export default TitleScreen;