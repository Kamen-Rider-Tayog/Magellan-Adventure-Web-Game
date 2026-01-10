import { TileType } from '../game/TileType';
import { ObjectType } from '../game/ObjectType';

const TILE_SIZE = 32;

export const renderGame = (canvasRef, sceneRef, gameState, objectsRef, imageLoader) => {
  const canvas = canvasRef.current;
  if (!canvas || !sceneRef.current) return;
  
  const ctx = canvas.getContext('2d');
  const scene = sceneRef.current;
  const { camera, player } = gameState;
  
  // Calculate viewport dimensions
  const VIEWPORT_COLS = Math.floor(canvas.width / TILE_SIZE);
  const VIEWPORT_ROWS = Math.floor(canvas.height / TILE_SIZE);
  
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw tiles
  for (let vx = 0; vx < VIEWPORT_COLS; vx++) {
    for (let vy = 0; vy < VIEWPORT_ROWS; vy++) {
      const worldX = camera.x + vx;
      const worldY = camera.y + vy;
      
      if (worldX >= 0 && worldX < scene.cols && worldY >= 0 && worldY < scene.rows) {
        const tile = scene.getTile(worldX, worldY);
        if (tile) {
          const tileKey = tile.name.toLowerCase();
          const tileImage = imageLoader && imageLoader.get ? imageLoader.get(tileKey) : null;
          
          if (tileImage && tile.name !== 'DOOR') {
            ctx.drawImage(tileImage, vx * TILE_SIZE, vy * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          } else {
            // Fallback to color if image not loaded
            ctx.fillStyle = tile.color;
            ctx.fillRect(vx * TILE_SIZE, vy * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
  }
  
  // Draw special doors
  for (let vx = 0; vx < VIEWPORT_COLS; vx++) {
    for (let vy = 0; vy < VIEWPORT_ROWS; vy++) {
      const worldX = camera.x + vx;
      const worldY = camera.y + vy;
      
      if (worldX >= 0 && worldX < scene.cols && worldY >= 0 && worldY < scene.rows) {
        const tile = scene.getTile(worldX, worldY);
        if (tile && tile.name === 'DOOR') {
          const doorImage = imageLoader && imageLoader.get ? imageLoader.get('door') : null;
          if (doorImage) {
            ctx.drawImage(doorImage, vx * TILE_SIZE, vy * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          } else {
            ctx.fillStyle = tile.color;
            ctx.fillRect(vx * TILE_SIZE, vy * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = '#D2B48C';
            ctx.fillRect(vx * TILE_SIZE + 8, vy * TILE_SIZE + 4, TILE_SIZE - 16, TILE_SIZE - 8);
          }
        }
      }
    }
  }
  
  // Draw objects
  for (const obj of objectsRef.current) {
    const screenX = (obj.x - camera.x) * TILE_SIZE;
    const screenY = (obj.y - camera.y) * TILE_SIZE;
    const objectWidth = obj.type.width * TILE_SIZE;
    const objectHeight = obj.type.height * TILE_SIZE;
    
    if (screenX >= -objectWidth && screenX < canvas.width && 
        screenY >= -objectHeight && screenY < canvas.height) {
      
      // Try to use object image
      const objImage = getObjectImage(obj.type, imageLoader);
      if (objImage) {
        ctx.drawImage(objImage, screenX, screenY, objectWidth, objectHeight);
      } else {
        // Fallback to colored rectangle
        ctx.fillStyle = obj.type.color;
        ctx.fillRect(screenX, screenY, objectWidth, objectHeight);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(screenX, screenY, objectWidth, objectHeight);
        
        // Draw symbol
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(obj.type.symbol, screenX + 5, screenY + 15);
      }
    }
  }
  
  // Draw player with image
  const screenX = (player.x - camera.x) * TILE_SIZE;
  const screenY = (player.y - camera.y) * TILE_SIZE;
  
  const playerImage = getPlayerImage(player.direction, imageLoader);
  if (playerImage) {
    ctx.drawImage(playerImage, screenX, screenY, TILE_SIZE, TILE_SIZE);
  } else {
    // Fallback to colored rectangle
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
    
    // Direction indicator
    ctx.fillStyle = '#FFFF00';
    switch (player.direction) {
      case 'UP': ctx.fillRect(screenX + 14, screenY, 4, 3); break;
      case 'DOWN': ctx.fillRect(screenX + 14, screenY + 29, 4, 3); break;
      case 'LEFT': ctx.fillRect(screenX, screenY + 14, 3, 4); break;
      case 'RIGHT': ctx.fillRect(screenX + 29, screenY + 14, 3, 4); break;
    }
  }
  
  // Draw FPS
  ctx.fillStyle = '#FFF';
  ctx.font = '14px Arial';
  ctx.fillText(`FPS: ${gameState.fps}`, 10, canvas.height - 10);
};

// Helper function to get player image based on direction
const getPlayerImage = (direction, imageLoader) => {
  if (!imageLoader || !imageLoader.get) return null;
  
  switch (direction) {
    case 'UP': return imageLoader.get('playerUp');
    case 'DOWN': return imageLoader.get('playerDown');
    case 'LEFT': return imageLoader.get('playerLeft');
    case 'RIGHT': return imageLoader.get('playerRight');
    default: return imageLoader.get('playerDown');
  }
};

// Helper function to get object image
const getObjectImage = (type, imageLoader) => {
  if (!imageLoader || !imageLoader.get) return null;
  
  if (type === ObjectType.NPC_KING) return imageLoader.get('manuel');
  if (type === ObjectType.CHARLES) return imageLoader.get('charles');
  if (type === ObjectType.KAWAL) return imageLoader.get('kawal');
  if (type === ObjectType.SAILOR1) return imageLoader.get('sailor1');
  if (type === ObjectType.SAILOR2) return imageLoader.get('sailor2');
  if (type === ObjectType.HUMABON) return imageLoader.get('humabon');
  return null;
};