import React from 'react';

const DialogueBox = ({ speaker, dialogue, onContinue, isMobile }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: 30,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      maxWidth: '800px',
      background: 'linear-gradient(to bottom, #DEB887, #D2B48C)',
      border: '4px solid #8B4513',
      borderRadius: '10px',
      padding: '20px 30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.7)',
      zIndex: 100
    }}>
      <div style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#4A2C2A',
        marginBottom: '12px',
        fontFamily: 'serif'
      }}>
        {speaker}:
      </div>
      <div style={{
        fontSize: '18px',
        color: '#6F4E37',
        lineHeight: 1.6
      }}>
        {dialogue}
      </div>
      <div style={{
        marginTop: '15px',
        textAlign: 'right',
        fontSize: '14px',
        color: '#8B4513',
        fontStyle: 'italic',
        animation: 'pulse 1.5s infinite',
        paddingRight: '100px'
      }}>
        {isMobile ? 'Tap E button to continue' : 'Press E to continue'}
      </div>
    </div>
  );
};

export default DialogueBox;