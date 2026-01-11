export class CollisionDetector {
  static isValidPosition(x, y, scene, objects) {
    if (!scene) return false;
    
    if (x < 0 || x >= scene.cols || y < 0 || y >= scene.rows) return false;
    if (scene.isCollidable(x, y)) return false;
    
    // Check object collisions
    for (const obj of objects) {
      if (obj.type.collidable) {
        for (let ox = 0; ox < obj.type.width; ox++) {
          for (let oy = 0; oy < obj.type.height; oy++) {
            if (x === obj.x + ox && y === obj.y + oy) return false;
          }
        }
      }
    }
    
    return true;
  }

  static checkExitTile(x, y, scene) {
    if (!scene) return false;
    return scene.isExitTile(x, y);
  }

  static checkInteraction(playerX, playerY, direction, objects) {
    for (const obj of objects) {
      if (obj.isPlayerFacing(playerX, playerY, direction)) {
        return obj;
      }
    }
    return null;
  }
}