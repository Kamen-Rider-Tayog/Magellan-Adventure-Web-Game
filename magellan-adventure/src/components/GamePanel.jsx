import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameStateManager } from '../managers/GameStateManager';
import { SceneManager } from '../managers/SceneManager';
import { SoundManager } from '../managers/SoundManager';  // Import the class
import { InputHandler } from '../handlers/InputHandler';
import { FPSCounter } from '../utils/FPSCounter';
import { CollisionDetector } from '../utils/CollisionDetector';
import { InteractiveObjectFactory } from '../factories/InteractiveObjectFactory';
import { imageLoader } from '../utils/ImageLoader';
import { objectImageLoader } from '../utils/ObjectImageLoader';
import DialogueBox from './DialogueBox';
import NarrativeScreen from './NarrativeScreen';
import SettingsPanel from './SettingsPanel';
import MapOverlay from './MapOverlay';
import InfoBox from './InfoBox';
import TitleScreen from './TitleScreen';
import { GameRenderer } from '../renderers/GameRenderer';

const TILE_SIZE = 32;
const FRAME_DELAY = 200;
const MOVE_DELAY = 75;

const GamePanel = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState(() => new GameStateManager().getState());
  const [showTitleScreen, setShowTitleScreen] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for game systems
  const gameStateRef = useRef(new GameStateManager());
  const sceneManagerRef = useRef(new SceneManager());
  const soundManagerRef = useRef(null);  // Initialize as null
  const inputHandlerRef = useRef(new InputHandler());
  const fpsCounterRef = useRef(new FPSCounter());
  const gameRendererRef = useRef(new GameRenderer());
  const lastMoveTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  
  // Game data refs
  const sceneRef = useRef(null);
  const objectsRef = useRef([]);
  
  const VIEWPORT_COLS = Math.floor(window.innerWidth / TILE_SIZE);
  const VIEWPORT_ROWS = Math.floor(window.innerHeight / TILE_SIZE);

  // Narratives
  const NARRATIVES = [
    ["Portugal and Spain, two formidable maritime powers,",
     "found themselves in a fierce contest.",
     "Both sought new lands and lucrative trade routes to the East,",
     "particularly for the coveted spices that fueled European nobility.",
     "",
     "A young, determined FERDINAND MAGELLAN",
     "stands before the Portuguese monarch..."],
    ["Denied by his homeland, Magellan made a momentous decision:",
     "He renounced his allegiance to Portugal and became a naturalized Spanish citizen,",
     "determined to find support for his ambitious westward voyage."],
    ["Magellan's fleet set sail, crossing the Atlantic from Seville, Spain.",
     "They navigated south along the American coastline, seeking the elusive passage to the Pacific."],
    ["During the harsh winter months, while anchored at Port Julian in southern Argentina, tensions flared.",
     "A plot to overthrow Magellan's command, led by Portuguese captains in his fleet, began to unfold."],
    ["Another ship was lost at Port Julian. Then, on October 21st, 1520,",
     "after months of relentless searching, Magellan finally located the long-sought waterway:",
     "the Strait of Magellan. For thirty-eight harrowing days, they navigated the treacherous passage,",
     "finally emerging into the vast expanse of the Pacific Ocean."],
    ["On March 6th, 1521, Magellan's expedition made landfall on the island of Guam,",
     "finding much-needed fresh provisions and rest.",
     "Ten days later, on March 16th, 1521, they arrived in the Philippines,",
     "marking a pivotal moment in their epic voyage of discovery."],
    ["As a gesture of goodwill and to formalize their alliance,",
     "Magellan and Rajah Humabon performed the ancient ritual of the blood compact,",
     "mixing their blood as a testament to their unbreakable friendship.",
     "This marked the beginning of a complex and fateful chapter",
     "in the history of the Philippines.",
     "",
     "Thank you for playing Magellan's Journey!",
     "",
     "Script written by Kate, Marianne, Khim, Iya, and Tina.",
     "Voice by Chlowen, Johan, and Ryan.",
     "Art by Rhea.",
     "Made with love by Kagame"]
  ];

  // Initialize game and load assets
  useEffect(() => {
    const loadAssets = async () => {
      try {
        setIsLoading(true);
        
        console.log('Starting asset loading...');
        console.log('Public URL:', process.env.PUBLIC_URL);
        
        // Initialize SoundManager only once
        if (!soundManagerRef.current) {
          soundManagerRef.current = new SoundManager();
        }
        
        // Load images with progress tracking
        await imageLoader.preloadAllAssets();
        await objectImageLoader.preload();
        
        // Debug: Check what loaded
        console.log('Images loaded:', imageLoader.images.size);
        console.log('Object images loaded:', objectImageLoader.objectImages.size);
        
        setIsLoading(false);
        console.log('All assets loaded successfully');
        
      } catch (error) {
        console.error('Asset loading failed:', error);
        setIsLoading(false);
        // Game will use fallback rendering
      }
    };
    
    loadAssets();
    
    // Start background music after a short delay
    setTimeout(() => {
      if (soundManagerRef.current) {
        soundManagerRef.current.play();
      }
    }, 500);
    
    // Handle window resize
    const handleResize = () => {
      // Recalculate viewport
      const newViewportCols = Math.floor(window.innerWidth / TILE_SIZE);
      const newViewportRows = Math.floor(window.innerHeight / TILE_SIZE);
      
      // Update camera if needed
      updateCamera();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (soundManagerRef.current) {
        soundManagerRef.current.pause();
      }
    };
  }, []);

  const initializeGame = () => {
    const scene = sceneManagerRef.current.createScene(0);
    sceneRef.current = scene;
    objectsRef.current = InteractiveObjectFactory.createSceneObjects(0, scene.cols);
    
    // Set initial camera position
    updateCamera();
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showTitleScreen || isLoading) return;
      
      const key = e.key.toLowerCase();
      
      if (key === 'escape') {
        toggleSettings();
      }
      
      if (key === 'e') {
        if (gameState.showNarrative) {
          advanceNarrative();
        } else if (gameState.showDialogue) {
          advanceDialogue();
        } else {
          checkInteraction();
        }
      }
      
      if (key === 'm') {
        toggleMap();
      }

      if (key === 'q') {
        toggleInfoBox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState, showTitleScreen, isLoading]);

  // Game loop
  useEffect(() => {
    if (showTitleScreen || isLoading) return;
    
    let animationFrameId;
    
    const gameLoop = (timestamp) => {
      fpsCounterRef.current.update();
      
      if (!gameState.showNarrative && !gameState.showDialogue && !gameState.showSettings) {
        updatePlayer(timestamp);
        updateCamera();
      }
      
      // Update state with current FPS
      setGameState(prev => ({
        ...prev,
        fps: fpsCounterRef.current.getFPS()
      }));
      
      // Render
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        GameRenderer.render(
          ctx, 
          sceneRef.current, 
          objectsRef.current, 
          gameState, 
          VIEWPORT_COLS, 
          VIEWPORT_ROWS, 
          TILE_SIZE
        );
      }
      
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    animationFrameId = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [gameState, showTitleScreen, isLoading]);

  const updatePlayer = (timestamp) => {
    const canMove = (timestamp - lastMoveTimeRef.current) >= MOVE_DELAY;
    const movement = inputHandlerRef.current.getMovement();
    const { dx, dy } = movement;
    
    if ((dx !== 0 || dy !== 0) && canMove) {
      const newX = gameState.player.x + dx;
      const newY = gameState.player.y + dy;
      
      if (CollisionDetector.isValidPosition(newX, newY, sceneRef.current, objectsRef.current)) {
        // Update direction
        let direction = gameState.player.direction;
        const newDirection = inputHandlerRef.current.getDirection();
        if (newDirection) direction = newDirection;
        
        // Check for exit
        if (CollisionDetector.checkExitTile(newX, newY, sceneRef.current)) {
          transitionToNextScene();
          return;
        }
        
        // Update player position
        setGameState(prev => ({
          ...prev,
          player: { 
            ...prev.player, 
            x: newX, 
            y: newY, 
            direction 
          }
        }));
        
        lastMoveTimeRef.current = timestamp;
      }
    }
    
    // Animation update
    if ((dx !== 0 || dy !== 0) && (timestamp - lastFrameTimeRef.current) > FRAME_DELAY) {
      setGameState(prev => ({
        ...prev,
        player: { 
          ...prev.player, 
          frame: prev.player.frame === 0 ? 2 : 0 
        }
      }));
      lastFrameTimeRef.current = timestamp;
    } else if (dx === 0 && dy === 0) {
      setGameState(prev => ({
        ...prev,
        player: { ...prev.player, frame: 1 }
      }));
    }
  };

  const updateCamera = useCallback(() => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    const { player } = gameState;
    
    let camX = player.x - Math.floor(VIEWPORT_COLS / 2);
    let camY = player.y - Math.floor(VIEWPORT_ROWS / 2);
    
    camX = Math.max(0, Math.min(camX, scene.cols - VIEWPORT_COLS));
    camY = Math.max(0, Math.min(camY, scene.rows - VIEWPORT_ROWS));
    
    if (scene.cols <= VIEWPORT_COLS) camX = -Math.floor((VIEWPORT_COLS - scene.cols) / 2);
    if (scene.rows <= VIEWPORT_ROWS) camY = -Math.floor((VIEWPORT_ROWS - scene.rows) / 2);
    
    setGameState(prev => ({ ...prev, camera: { x: camX, y: camY } }));
  }, [gameState.player, VIEWPORT_COLS, VIEWPORT_ROWS]);

  const advanceNarrative = () => {
    setGameState(prev => {
      const currentNarrative = NARRATIVES[prev.currentScene] || [];
      if (prev.narrativeIndex < currentNarrative.length - 1) {
        return { ...prev, narrativeIndex: prev.narrativeIndex + 1 };
      } else {
        // Narrative finished
        if (prev.currentScene >= 6) {
          // Game complete
          return { ...prev, showNarrative: false };
        }
        return { ...prev, showNarrative: false, narrativeIndex: 0 };
      }
    });
  };

  const advanceDialogue = () => {
    if (!gameState.currentObject) return;
    
    const finished = gameState.currentObject.advance();
    if (finished) {
      setGameState(prev => ({ 
        ...prev, 
        showDialogue: false, 
        currentObject: null 
      }));
      
      // Recreate scene with updated mission state
      sceneRef.current = sceneManagerRef.current.createScene(gameState.currentScene);
    } else {
      setGameState(prev => ({ ...prev }));
    }
  };

  const checkInteraction = () => {
    const { player } = gameState;
    const interactingObject = CollisionDetector.checkInteraction(
      player.x, player.y, player.direction, objectsRef.current
    );
    
    if (interactingObject) {
      interactingObject.reset();
      setGameState(prev => ({
        ...prev,
        showDialogue: true,
        currentObject: interactingObject
      }));
    }
  };

  const transitionToNextScene = () => {
    setGameState(prev => {
      const nextScene = prev.currentScene + 1;
      
      if (nextScene >= 6) { // 6 scenes total (0-5)
        // Show final narrative
        return {
          ...prev,
          showNarrative: true,
          narrativeIndex: 0,
          currentScene: 6
        };
      }
      
      // Setup new scene
      const scene = sceneManagerRef.current.createScene(nextScene);
      sceneRef.current = scene;
      objectsRef.current = InteractiveObjectFactory.createSceneObjects(nextScene, scene.cols);
      
      // Position player based on scene
      const startPositions = [
        { x: 10, y: 15 },
        { x: 25, y: 45 },
        { x: 25, y: 20 },
        { x: 24, y: 20 },
        { x: 25, y: 15 },
        { x: 32, y: 32 }
      ];
      
      // Show narrative for new scene
      return {
        ...prev,
        currentScene: nextScene,
        showNarrative: true,
        narrativeIndex: 0,
        player: { ...prev.player, ...startPositions[nextScene] }
      };
    });
  };

  const toggleSettings = () => {
    setGameState(prev => ({ 
      ...prev, 
      showSettings: !prev.showSettings 
    }));
  };

  const toggleMap = () => {
    setGameState(prev => ({ 
      ...prev, 
      showMap: !prev.showMap 
    }));
  };

  const toggleInfoBox = () => {
    setGameState(prev => ({ 
      ...prev, 
      showInfoBox: !prev.showInfoBox 
    }));
  };

  const toggleMute = () => {
    if (soundManagerRef.current) {
      const muted = soundManagerRef.current.toggleMute();
      setGameState(prev => ({ ...prev, muted }));
    }
  };

  const handleResume = () => {
    setGameState(prev => ({ ...prev, showSettings: false }));
  };

  const handleQuit = () => {
    window.location.reload();
  };

  const startGame = () => {
    setShowTitleScreen(false);
    initializeGame();
  };

  const getMissionText = () => {
    return sceneManagerRef.current.getMissionText(gameState.currentScene);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #000428, #004e92)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        fontFamily: 'serif'
      }}>
        <h1 style={{
          fontSize: '48px',
          marginBottom: '40px',
          color: '#FFD700',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          MAGELLAN'S JOURNEY
        </h1>
        <div style={{
          width: '300px',
          height: '30px',
          background: '#333',
          borderRadius: '15px',
          marginBottom: '20px',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              height: '100%',
              width: `${loadingProgress}%`,
              background: 'linear-gradient(to right, #228B22, #32CD32)',
              transition: 'width 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {loadingProgress}%
          </div>
        </div>
        <p style={{
          fontSize: '18px',
          color: '#DDD'
        }}>
          Loading assets... {loadingProgress}%
        </p>
        <p style={{
          marginTop: '40px',
          fontSize: '14px',
          color: '#AAA',
          fontStyle: 'italic'
        }}>
          Please wait while the game loads
        </p>
      </div>
    );
  }

  // Title Screen
  if (showTitleScreen) {
    return <TitleScreen onStartGame={startGame} />;
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      background: '#000' 
    }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: 'block' }}
      />
      
      {/* Narrative Screen */}
      {gameState.showNarrative && (
        <NarrativeScreen
          narratives={NARRATIVES[gameState.currentScene] || []}
          narrativeIndex={gameState.narrativeIndex}
          onContinue={advanceNarrative}
        />
      )}
      
      {/* Dialogue Box */}
      {gameState.showDialogue && gameState.currentObject && (
        <DialogueBox
          speaker={gameState.currentObject.getCurrentSpeaker()}
          dialogue={gameState.currentObject.getCurrentDialogue()}
          onContinue={advanceDialogue}
        />
      )}
      
      {/* Settings Panel */}
      {gameState.showSettings && (
        <SettingsPanel
          muted={gameState.muted}
          onResume={handleResume}
          onToggleMute={toggleMute}
          onQuit={handleQuit}
        />
      )}
      
      {/* Map Overlay */}
      {gameState.showMap && (
        <MapOverlay
          currentScene={gameState.currentScene}
          onClose={() => setGameState(prev => ({ ...prev, showMap: false }))}
        />
      )}
      
      {/* Mission Info */}
      {gameState.showInfoBox && (
        <InfoBox
          currentScene={gameState.currentScene}
          getMissionText={getMissionText}
        />
      )}
      
      {/* Controls Help */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '12px',
        borderRadius: '8px',
        color: '#FFF',
        fontSize: '13px',
        fontFamily: 'monospace',
        lineHeight: 1.6
      }}>
        <div><strong>WASD / Arrow Keys</strong> - Move</div>
        <div><strong>E</strong> - Interact / Continue</div>
        <div><strong>M</strong> - Toggle Map</div>
        <div><strong>Q</strong> - Toggle Mission Info</div>
        <div><strong>ESC</strong> - Settings</div>
        <div><strong>FPS: {gameState.fps}</strong></div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GamePanel;