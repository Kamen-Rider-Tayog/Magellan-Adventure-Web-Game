import { imageLoader } from '../utils/ImageLoader';
import { objectImageLoader } from '../utils/ObjectImageLoader';

export class GameRenderer {
  constructor() {
    this.useImages = false;
    this.imageCache = new Map();
  }

  /**
   * Initialize renderer with image loading
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      await imageLoader.preloadAllAssets();
      await objectImageLoader.preload();
      this.useImages = true;
      console.log('Renderer initialized with images');
    } catch (error) {
      console.warn('Failed to load images, falling back to color rendering:', error);
      this.useImages = false;
    }
  }

  static render(ctx, scene, objects, gameState, viewportCols, viewportRows, tileSize) {
    if (!ctx || !scene) return;
    
    const { camera, player } = gameState;
    
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw background if exists
    if (scene.useBackgroundImage && scene.backgroundImage) {
      this.renderBackground(ctx, scene, camera, viewportCols, viewportRows, tileSize);
    }
    
    // Draw tiles
    this.renderTiles(ctx, scene, camera, viewportCols, viewportRows, tileSize);
    
    // Draw objects
    this.renderObjects(ctx, objects, camera, viewportCols, viewportRows, tileSize);
    
    // Draw player
    this.renderPlayer(ctx, player, camera, tileSize);
  }

  static renderBackground(ctx, scene, camera, viewportCols, viewportRows, tileSize) {
    const bgKey = this.getBackgroundKey(scene.backgroundImage);
    const bgImage = imageLoader.getImage(bgKey);
    
    if (bgImage && bgImage.complete) {
      // Draw the background image
      ctx.drawImage(bgImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
    } else {
      // Fallback to colored background
      ctx.fillStyle = '#1a472a';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Debug: Show what image we tried to load
      if (bgKey) {
        console.log(`⚠️ Background not loaded: ${bgKey}`);
      }
    }
  }

  static getBackgroundKey(imagePath) {
    const mapping = {
      'assets/backgrounds/dock.png': 'background_dock',
      'assets/backgrounds/ship.png': 'background_ship',
      'assets/backgrounds/island.png': 'background_island',
      'assets/backgrounds/cebu.png': 'background_cebu',
      'assets/backgrounds/title.png': 'background_title'
    };
    
    return mapping[imagePath] || imagePath;
  }

  static renderTiles(ctx, scene, camera, viewportCols, viewportRows, tileSize) {
    for (let vx = 0; vx < viewportCols; vx++) {
      for (let vy = 0; vy < viewportRows; vy++) {
        const worldX = camera.x + vx;
        const worldY = camera.y + vy;
        
        if (worldX >= 0 && worldX < scene.cols && worldY >= 0 && worldY < scene.rows) {
          const tile = scene.getTile(worldX, worldY);
          if (tile) {
            this.renderTile(ctx, vx, vy, tile, tileSize);
          }
        }
      }
    }
  }

  static renderTile(ctx, x, y, tile, tileSize) {
    if (tile.name === 'DOOR') {
      // Draw door
      ctx.fillStyle = tile.color;
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(x * tileSize + 8, y * tileSize + 4, tileSize - 16, tileSize - 8);
      
      // Try to draw door image if available
      const doorImage = imageLoader.getImage('tile_door');
      if (doorImage && doorImage.complete) {
        ctx.drawImage(doorImage, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    } else {
      // Try to draw tile image if available
      const tileImage = this.getTileImage(tile);
      if (tileImage && tileImage.complete) {
        ctx.drawImage(tileImage, x * tileSize, y * tileSize, tileSize, tileSize);
      } else {
        // Fallback to color
        ctx.fillStyle = tile.color;
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  static getTileImage(tile) {
    const mapping = {
      'GRASS': 'tile_grass',
      'WATER': 'tile_water',
      'SAND': 'tile_sand',
      'TILE1': 'tile_tile1',
      'TILE2': 'tile_tile2',
      'CARPET_LEFT': 'tile_carpet_left',
      'CARPET_MIDDLE': 'tile_carpet_middle',
      'CARPET_RIGHT': 'tile_carpet_right',
      'DOOR': 'tile_door'
    };
    
    const imageKey = mapping[tile.name];
    return imageKey ? imageLoader.getImage(imageKey) : null;
  }

  static renderObjects(ctx, objects, camera, viewportCols, viewportRows, tileSize) {
    for (const obj of objects) {
      const screenX = (obj.x - camera.x) * tileSize;
      const screenY = (obj.y - camera.y) * tileSize;
      
      // Only render if object is within or near viewport
      if (screenX >= -tileSize * 3 && screenX < ctx.canvas.width && 
          screenY >= -tileSize * 3 && screenY < ctx.canvas.height) {
        
        // Try to draw object image
        const objectImage = objectImageLoader.getImageForObjectType(obj.type);
        if (objectImage && objectImage.complete) {
          ctx.drawImage(
            objectImage, 
            screenX, 
            screenY, 
            obj.type.width * tileSize, 
            obj.type.height * tileSize
          );
        } else {
          // Fallback to colored rectangle
          ctx.fillStyle = obj.type.color;
          ctx.fillRect(screenX, screenY, obj.type.width * tileSize, obj.type.height * tileSize);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(screenX, screenY, obj.type.width * tileSize, obj.type.height * tileSize);
          
          ctx.fillStyle = '#000';
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            obj.type.symbol, 
            screenX + (obj.type.width * tileSize) / 2, 
            screenY + (obj.type.height * tileSize) / 2 + 6
          );
        }
      }
    }
  }

  static renderPlayer(ctx, player, camera, tileSize) {
    const screenX = (player.x - camera.x) * tileSize;
    const screenY = (player.y - camera.y) * tileSize;
    
    // Try to draw player image based on direction
    const playerImageKey = `player_${player.direction.toLowerCase()}`;
    const playerImage = imageLoader.getImage(playerImageKey);
    
    if (playerImage && playerImage.complete) {
      // Apply frame-based animation if available
      const frame = player.frame;
      if (frame !== 1) { // If not standing still
        // For animated sprites, you might have different frames
        // For now, just draw the base image
        ctx.drawImage(playerImage, screenX, screenY, tileSize, tileSize);
      } else {
        ctx.drawImage(playerImage, screenX, screenY, tileSize, tileSize);
      }
    } else {
      // Fallback to colored rectangle
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(screenX, screenY, tileSize, tileSize);
      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(screenX, screenY, tileSize, tileSize);
      
      // Direction indicator
      ctx.fillStyle = '#FFFF00';
      switch (player.direction) {
        case 'UP': ctx.fillRect(screenX + 14, screenY, 4, 3); break;
        case 'DOWN': ctx.fillRect(screenX + 14, screenY + 29, 4, 3); break;
        case 'LEFT': ctx.fillRect(screenX, screenY + 14, 3, 4); break;
        case 'RIGHT': ctx.fillRect(screenX + 29, screenY + 14, 3, 4); break;
        default: // Added default case to fix ESLint warning
          break;
      }
      
      // Player symbol
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('M', screenX + tileSize / 2, screenY + tileSize / 2 + 5);
    }
  }

  
}

// Singleton instance
export const gameRenderer = new GameRenderer();