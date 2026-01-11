import React from 'react';

const UIManager = ({ children }) => {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  );
};

export default UIManager;