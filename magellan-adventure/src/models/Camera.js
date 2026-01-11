export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  update(playerX, playerY, sceneCols, sceneRows, viewportCols, viewportRows) {
    let camX = playerX - Math.floor(viewportCols / 2);
    let camY = playerY - Math.floor(viewportRows / 2);
    
    camX = Math.max(0, Math.min(camX, sceneCols - viewportCols));
    camY = Math.max(0, Math.min(camY, sceneRows - viewportRows));
    
    if (sceneCols <= viewportCols) camX = -Math.floor((viewportCols - sceneCols) / 2);
    if (sceneRows <= viewportRows) camY = -Math.floor((viewportRows - sceneRows) / 2);
    
    this.x = camX;
    this.y = camY;
    
    return { x: this.x, y: this.y };
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}