import React from 'react';

const SettingsPanel = ({ showSettings, onResume, onQuit, imageLoader }) => {
  if (!showSettings) return null;

  const backgroundImage = imageLoader?.get('settingsBackground');

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: backgroundImage 
        ? `url(${backgroundImage.src}) center/cover`
        : 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      zIndex: 3000
    }}>
      <h1 style={{ 
        color: '#FFD700', 
        fontSize: '48px', 
        marginBottom: '40px',
        textShadow: '2px 2px 4px #000'
      }}>
        SETTINGS
      </h1>
      <button
        onClick={onResume}
        style={{
          padding: '15px 40px',
          fontSize: '24px',
          background: imageLoader?.get('resumeButton') 
            ? `url(${imageLoader.get('resumeButton').src}) center/cover`
            : '#8B4513',
          color: '#FFF',
          border: '2px solid #FFD700',
          borderRadius: '5px',
          cursor: 'pointer',
          minWidth: '200px',
          minHeight: '60px'
        }}
      >
        RESUME
      </button>
      <button
        onClick={onQuit}
        style={{
          padding: '15px 40px',
          fontSize: '24px',
          background: imageLoader?.get('quitButton') 
            ? `url(${imageLoader.get('quitButton').src}) center/cover`
            : '#8B0000',
          color: '#FFF',
          border: '2px solid #FFD700',
          borderRadius: '5px',
          cursor: 'pointer',
          minWidth: '200px',
          minHeight: '60px'
        }}
      >
        QUIT
      </button>
    </div>
  );
};

export default SettingsPanel;