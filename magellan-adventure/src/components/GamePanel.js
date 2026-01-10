import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInputHandler } from '../systems/InputHandler';
import { isValidPosition, checkObjectInteraction } from '../systems/CollisionDetector';
import { renderGame } from '../systems/GameRenderer';
import { setupScene, NARRATIVES, getMissionText, getSceneName } from '../systems/GameStateManager';
import { ImageLoader } from '../utils/ImageLoader';
import DialogueBox from '../components/DialogueBox';
import NarrativeScreen from '../components/NarrativeScreen';
import SettingsPanel from '../components/SettingsPanel';
import MapOverlay from '../components/MapOverlay';
import InfoBox from '../components/InfoBox';
import ControlsInfo from '../components/ControlsInfo';

const TILE_SIZE = 32;
const FRAME_DELAY = 200;
const MOVE_DELAY = 75;
const TARGET_FPS = 60;

const GamePanel = () => {
  const canvasRef = useRef(null);
  const imageLoaderRef = useRef(new ImageLoader());
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [gameState, setGameState] = useState({
    player: { x: 10, y: 15, direction: 'DOWN', frame: 1 },
    camera: { x: 0, y: 0 },
    currentScene: 0,
    showNarrative: true,
    narrativeIndex: 0,
    showDialogue: false,
    currentObject: null,
    showSettings: false,
    showMap: false,
    fps: 0,
    loadingProgress: 0
  });

  const sceneRef = useRef(null);
  const objectsRef = useRef([]);
  const lastMoveTime = useRef(0);
  const lastFrameTime = useRef(0);
  const fpsUpdateTime = useRef(0);
  const frameCount = useRef(0);

  const SCENE_COUNT = 6;

  // Load assets on mount
  useEffect(() => {
    const loadAssets = async () => {
      await imageLoaderRef.current.loadAll();
      setAssetsLoaded(true);
      
      // Initialize first scene after assets are loaded
      const newState = setupScene(0, sceneRef, objectsRef);
      setGameState(prev => ({
        ...prev,
        ...newState,
        player: newState.player
      }));
    };
    
    loadAssets();
  }, []);

  // Input handling
  const checkInteraction = useCallback(() => {
    const { player } = gameState;
    const obj = checkObjectInteraction(player.x, player.y, player.direction, objectsRef);
    
    if (obj) {
      obj.reset();
      setGameState(prev => ({
        ...prev,
        showDialogue: true,
        currentObject: obj
      }));
    }
  }, [gameState]);

  const advanceNarrative = useCallback(() => {
    setGameState(prev => {
      const currentNarrative = NARRATIVES[prev.currentScene];
      if (prev.narrativeIndex < currentNarrative.length - 1) {
        return { ...prev, narrativeIndex: prev.narrativeIndex + 1 };
      } else {
        return { ...prev, showNarrative: false, narrativeIndex: 0 };
      }
    });
  }, []);

  const advanceDialogue = useCallback(() => {
    if (!gameState.currentObject) return;
    
    const finished = gameState.currentObject.advance();
    if (finished) {
      setGameState(prev => ({ ...prev, showDialogue: false, currentObject: null }));
    } else {
      setGameState(prev => ({ ...prev }));
    }
  }, [gameState.currentObject]);

  const keysRef = useInputHandler(gameState, setGameState, checkInteraction, advanceNarrative, advanceDialogue);

  const transitionToNextScene = useCallback(() => {
    setGameState(prev => {
      const nextScene = prev.currentScene + 1;
      
      if (nextScene >= SCENE_COUNT) {
        // Show final narrative
        return {
          ...prev,
          showNarrative: true,
          narrativeIndex: 0,
          currentScene: 6
        };
      }
      
      const newState = setupScene(nextScene, sceneRef, objectsRef);
      
      return {
        ...prev,
        currentScene: nextScene,
        ...newState
      };
    });
  }, []);

  // Optimized game loop with FPS throttling
  useEffect(() => {
    if (!assetsLoaded) return;

    let animationId;
    let lastTime = 0;
    const frameInterval = 1000 / TARGET_FPS;

    const gameLoop = (currentTime) => {
      animationId = requestAnimationFrame(gameLoop);
      
      // Throttle to target FPS
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      
      lastTime = currentTime - (deltaTime % frameInterval);
      
      // FPS counter - count every frame that gets rendered
      frameCount.current++;
      if (currentTime - fpsUpdateTime.current >= 1000) {
        setGameState(prev => ({ ...prev, fps: frameCount.current }));
        frameCount.current = 0;
        fpsUpdateTime.current = currentTime;
      }

      if (!gameState.showNarrative && !gameState.showDialogue && !gameState.showSettings) {
        // Player movement
        const canMove = (currentTime - lastMoveTime.current) >= MOVE_DELAY;
        let dx = 0, dy = 0;
        
        if (keysRef.current['w'] || keysRef.current['arrowup']) dy = -1;
        if (keysRef.current['s'] || keysRef.current['arrowdown']) dy = 1;
        if (keysRef.current['a'] || keysRef.current['arrowleft']) dx = -1;
        if (keysRef.current['d'] || keysRef.current['arrowright']) dx = 1;
        
        if ((dx !== 0 || dy !== 0) && canMove) {
          setGameState(prev => {
            const newX = prev.player.x + dx;
            const newY = prev.player.y + dy;
            
            if (!isValidPosition(newX, newY, sceneRef, objectsRef)) {
              return prev;
            }
            
            let direction = prev.player.direction;
            if (dx > 0) direction = 'RIGHT';
            else if (dx < 0) direction = 'LEFT';
            else if (dy > 0) direction = 'DOWN';
            else if (dy < 0) direction = 'UP';
            
            // Check for exit
            if (sceneRef.current && sceneRef.current.isExitTile(newX, newY)) {
              transitionToNextScene();
              return prev;
            }
            
            return {
              ...prev,
              player: { ...prev.player, x: newX, y: newY, direction }
            };
          });
          lastMoveTime.current = currentTime;
        }
        
        // Animation
        if ((dx !== 0 || dy !== 0) && (currentTime - lastFrameTime.current) > FRAME_DELAY) {
          setGameState(prev => ({
            ...prev,
            player: { ...prev.player, frame: prev.player.frame === 0 ? 2 : 0 }
          }));
          lastFrameTime.current = currentTime;
        } else if (dx === 0 && dy === 0) {
          setGameState(prev => ({
            ...prev,
            player: { ...prev.player, frame: 1 }
          }));
        }
      }

      // Update camera
      setGameState(prev => {
        if (!sceneRef.current) return prev;
        
        const VIEWPORT_COLS = Math.floor(window.innerWidth / TILE_SIZE);
        const VIEWPORT_ROWS = Math.floor(window.innerHeight / TILE_SIZE);
        
        let camX = prev.player.x - Math.floor(VIEWPORT_COLS / 2);
        let camY = prev.player.y - Math.floor(VIEWPORT_ROWS / 2);
        
        camX = Math.max(0, Math.min(camX, sceneRef.current.cols - VIEWPORT_COLS));
        camY = Math.max(0, Math.min(camY, sceneRef.current.rows - VIEWPORT_ROWS));
        
        if (sceneRef.current.cols <= VIEWPORT_COLS) camX = -Math.floor((VIEWPORT_COLS - sceneRef.current.cols) / 2);
        if (sceneRef.current.rows <= VIEWPORT_ROWS) camY = -Math.floor((VIEWPORT_ROWS - sceneRef.current.rows) / 2);
        
        return {
          ...prev,
          camera: { x: camX, y: camY }
        };
      });
      
      // Render
      renderGame(canvasRef, sceneRef, gameState, objectsRef, imageLoaderRef.current);
    };

    // Initialize FPS timer
    fpsUpdateTime.current = performance.now();
    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState, transitionToNextScene, assetsLoaded]);

  // Loading screen
  if (!assetsLoaded) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        fontSize: '24px'
      }}>
        <div style={{ marginBottom: '20px' }}>Loading Magellan's Adventure...</div>
        <div style={{
          width: '300px',
          height: '20px',
          backgroundColor: '#333',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${gameState.loadingProgress}%`,
            height: '100%',
            backgroundColor: '#FFD700',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: 'block' }}
      />
      
      <NarrativeScreen 
        showNarrative={gameState.showNarrative}
        narrativeText={NARRATIVES[gameState.currentScene]?.[gameState.narrativeIndex]}
      />
      
      <DialogueBox 
        currentObject={gameState.currentObject}
        showDialogue={gameState.showDialogue}
      />
      
      <SettingsPanel 
        showSettings={gameState.showSettings}
        onResume={() => setGameState(prev => ({ ...prev, showSettings: false }))}
        onQuit={() => window.location.reload()}
        imageLoader={imageLoaderRef.current}
      />
      
      <MapOverlay 
        showMap={gameState.showMap}
        currentScene={gameState.currentScene}
        totalScenes={SCENE_COUNT}
        sceneName={getSceneName(gameState.currentScene)}
      />
      
      <InfoBox 
        title="MISSION INFO"
        content={getMissionText(gameState.currentScene)}
      />
      
      <ControlsInfo />
      
      {/* FPS Display */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        color: '#0F0',
        fontSize: '14px',
        fontFamily: 'monospace',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '5px 10px',
        borderRadius: '5px',
        zIndex: 1000
      }}>
        FPS: {gameState.fps}
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default GamePanel;