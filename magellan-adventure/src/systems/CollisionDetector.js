export const isValidPosition = (x, y, sceneRef, objectsRef) => {
  if (!sceneRef.current) return false;
  
  const scene = sceneRef.current;
  
  // Check bounds
  if (x < 0 || x >= scene.cols || y < 0 || y >= scene.rows) return false;
  
  // Check tile collision
  if (scene.isCollidable(x, y)) return false;
  
  // Check object collisions
  for (const obj of objectsRef.current) {
    if (obj.type.collidable) {
      for (let ox = 0; ox < obj.type.width; ox++) {
        for (let oy = 0; oy < obj.type.height; oy++) {
          if (x === obj.x + ox && y === obj.y + oy) return false;
        }
      }
    }
  }
  
  return true;
};

export const checkObjectInteraction = (playerX, playerY, direction, objectsRef) => {
  for (const obj of objectsRef.current) {
    if (obj.isPlayerFacing(playerX, playerY, direction)) {
      return obj;
    }
  }
  return null;
};