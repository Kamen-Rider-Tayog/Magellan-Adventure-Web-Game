import React from 'react';

const InfoBox = ({ title, content }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      width: '300px',
      background: 'linear-gradient(to bottom, #DEB887, #D2B48C)',
      border: '3px solid #8B4513',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
      zIndex: 1000
    }}>
      <div style={{
        background: '#654321',
        color: '#FFF',
        padding: '5px',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '10px',
        borderRadius: '5px'
      }}>
        {title}
      </div>
      <div style={{ color: '#4A2C2A', fontSize: '14px', lineHeight: 1.4 }}>
        {content}
      </div>
    </div>
  );
};

export default InfoBox;