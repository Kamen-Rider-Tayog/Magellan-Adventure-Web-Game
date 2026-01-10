import React from 'react';

const MapOverlay = ({ showMap, currentScene, totalScenes, sceneName }) => {
  if (!showMap) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      width: '200px',
      height: '150px',
      background: 'rgba(139, 69, 19, 0.8)',
      border: '2px solid #FFD700',
      borderRadius: '5px',
      padding: '10px',
      color: '#FFF',
      zIndex: 1000
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
        SCENE {currentScene + 1} / {totalScenes}
      </div>
      <div style={{ fontSize: '12px' }}>
        {sceneName}
      </div>
    </div>
  );
};

export default MapOverlay;