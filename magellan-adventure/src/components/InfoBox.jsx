import React from 'react';

const InfoBox = ({ currentScene, getMissionText }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      width: '320px',
      background: 'linear-gradient(to bottom, #DEB887, #D2B48C)',
      border: '4px solid #8B4513',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
      zIndex: 100
    }}>
      <div style={{
        background: '#654321',
        color: '#FFF',
        padding: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '12px',
        borderRadius: '5px',
        fontSize: '16px',
        fontFamily: 'serif'
      }}>
        MISSION INFO
      </div>
      <div style={{ color: '#4A2C2A', fontSize: '14px', lineHeight: 1.5 }}>
        {getMissionText()}
      </div>
    </div>
  );
};

export default InfoBox;