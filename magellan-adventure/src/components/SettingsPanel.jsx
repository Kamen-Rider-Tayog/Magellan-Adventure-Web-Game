import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SettingsPanel = ({ muted, onResume, onToggleMute, onQuit }) => {
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
      gap: '20px',
      zIndex: 1000
    }}>
      <h1 style={{ color: '#FFD700', fontSize: '48px', marginBottom: '40px', fontFamily: 'serif' }}>SETTINGS</h1>
      <button
        onClick={onResume}
        style={{
          padding: '15px 50px',
          fontSize: '24px',
          background: '#228B22',
          color: '#FFF',
          border: '3px solid #FFD700',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        RESUME
      </button>
      <button
        onClick={onToggleMute}
        style={{
          padding: '15px 50px',
          fontSize: '24px',
          background: '#4169E1',
          color: '#FFF',
          border: '3px solid #FFD700',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        {muted ? 'UNMUTE' : 'MUTE'}
      </button>
      <button
        onClick={onQuit}
        style={{
          padding: '15px 50px',
          fontSize: '24px',
          background: '#8B0000',
          color: '#FFF',
          border: '3px solid #FFD700',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        QUIT TO TITLE
      </button>
    </div>
  );
};

export default SettingsPanel;