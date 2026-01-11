export class InputHandler {
  constructor() {
    this.keys = {};
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  isKeyPressed(key) {
    return this.keys[key] || false;
  }

  getMovement() {
    let dx = 0, dy = 0;
    
    if (this.isKeyPressed('w') || this.isKeyPressed('arrowup')) dy = -1;
    if (this.isKeyPressed('s') || this.isKeyPressed('arrowdown')) dy = 1;
    if (this.isKeyPressed('a') || this.isKeyPressed('arrowleft')) dx = -1;
    if (this.isKeyPressed('d') || this.isKeyPressed('arrowright')) dx = 1;
    
    return { dx, dy };
  }

  getDirection() {
    const { dx, dy } = this.getMovement();
    if (dx > 0) return 'RIGHT';
    if (dx < 0) return 'LEFT';
    if (dy > 0) return 'DOWN';
    if (dy < 0) return 'UP';
    return null;
  }

  clearKeys() {
    this.keys = {};
  }
}