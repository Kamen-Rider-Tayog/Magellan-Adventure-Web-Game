import React, { useState, useEffect, useRef, useCallback } from 'react';
import GamePanel from './components/GamePanel';
import ControlsInfo from './components/ControlsInfo';
import TitleScreen from './components/TitleScreen';
import { imageLoader } from './utils/ImageLoader';
import { InputHandler } from './handlers/InputHandler';

const Game = () => {
  const [gameState, setGameState] = useState('loading');
  const inputHandlerRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // This will only run once
    if (initializedRef.current) return;
    
    console.log('🎮 Game component mounting...');
    initializedRef.current = true;
    
    const initializeGame = async () => {
      try {
        console.log('📦 Loading assets...');
        await imageLoader.preloadAllAssets();
        
        console.log('🎮 Initializing input handler...');
        inputHandlerRef.current = new InputHandler();
        
        console.log('🏁 Going to title screen...');
        setGameState('title');
        
      } catch (error) {
        console.error('❌ Game initialization failed:', error);
        setGameState('title');
      }
    };

    initializeGame();
  }, []);

  const handleStartGame = useCallback(() => {
    console.log('🚀 Starting game...');
    setGameState('playing');
  }, []);

  const handleArrowPress = useCallback((direction) => {
    if (inputHandlerRef.current && gameState === 'playing') {
      const keyMap = {
        'UP': 'up',
        'DOWN': 'down',
        'LEFT': 'left',
        'RIGHT': 'right'
      };
      inputHandlerRef.current.simulateKeyPress(keyMap[direction]);
    }
  }, [gameState]);

  const handleArrowRelease = useCallback((direction) => {
    if (inputHandlerRef.current && gameState === 'playing') {
      const keyMap = {
        'UP': 'up',
        'DOWN': 'down',
        'LEFT': 'left',
        'RIGHT': 'right'
      };
      inputHandlerRef.current.simulateKeyRelease(keyMap[direction]);
    }
  }, [gameState]);

  const handleQuitToTitle = useCallback(() => {
    setGameState('title');
    if (inputHandlerRef.current) {
      inputHandlerRef.current.clearKeys();
    }
  }, []);

  // Loading screen
  if (gameState === 'loading') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a2e38 0%, #1a1a2e 100%)',
        color: '#FFF',
        fontFamily: "'MagellanFont', 'Times New Roman', serif"
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '40px', color: '#FFD700' }}>
          Magellan's Adventure
        </h1>
        <div style={{
          width: '300px',
          height: '20px',
          backgroundColor: '#333',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <div style={{
            width: `${imageLoader.getProgress()}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <p>Loading game assets... {imageLoader.getProgress()}%</p>
      </div>
    );
  }

  // Title screen
  if (gameState === 'title') {
    return <TitleScreen onStartGame={handleStartGame} />;
  }

  // Main game
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <GamePanel 
        gameState={gameState}
        onQuitToTitle={handleQuitToTitle}
        inputHandler={inputHandlerRef.current}
      />
      
      {/* Controls overlay */}
      {gameState === 'playing' && (
        <ControlsInfo 
          imageLoader={imageLoader}
          onArrowPress={handleArrowPress}
          onArrowRelease={handleArrowRelease}
        />
      )}
    </div>
  );
};

export default Game;