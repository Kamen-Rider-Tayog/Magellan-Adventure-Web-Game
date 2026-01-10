import React from 'react';

const DialogueBox = ({ currentObject, showDialogue }) => {
  if (!showDialogue || !currentObject) return null;

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
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      zIndex: 1000
    }}>
      <div style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#4A2C2A',
        marginBottom: '10px'
      }}>
        {currentObject.getCurrentSpeaker()}:
      </div>
      <div style={{
        fontSize: '16px',
        color: '#6F4E37',
        lineHeight: 1.5
      }}>
        {currentObject.getCurrentDialogue()}
      </div>
    </div>
  );
};

export default DialogueBox;