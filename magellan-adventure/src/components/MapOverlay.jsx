import React from 'react';
import { X } from 'lucide-react';

const MapOverlay = ({ currentScene, onClose }) => {
  const sceneNames = [
    'Portuguese Throne Room',
    'Spanish Dock',
    'Ship - Atlantic',
    'Port St. Julian',
    'Ship - Pacific',
    'Cebu, Philippines'
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      background: 'rgba(139, 69, 19, 0.95)',
      border: '4px solid #FFD700',
      borderRadius: '10px',
      padding: '30px',
      color: '#FFF',
      zIndex: 999
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'serif' }}>WORLD MAP</h2>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}
        >
          <X size={28} />
        </button>
      </div>
      <div style={{ fontSize: '18px', marginBottom: '10px' }}>
        <strong>Current Scene:</strong> {currentScene + 1} / 6
      </div>
      <div style={{ fontSize: '16px' }}>
        {sceneNames[currentScene] || 'Unknown Scene'}
      </div>
    </div>
  );
};

export default MapOverlay;