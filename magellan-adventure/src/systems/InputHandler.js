import { useRef, useEffect } from 'react';

export const useInputHandler = (gameState, setGameState, checkInteraction, advanceNarrative, advanceDialogue) => {
  const keysRef = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = true;
      
      // Handle special keys
      if (e.key === 'Escape') {
        setGameState(prev => ({ ...prev, showSettings: !prev.showSettings }));
        return;
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
        setGameState(prev => ({ ...prev, showMap: !prev.showMap }));
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, setGameState, checkInteraction, advanceNarrative, advanceDialogue]);

  return keysRef;
};