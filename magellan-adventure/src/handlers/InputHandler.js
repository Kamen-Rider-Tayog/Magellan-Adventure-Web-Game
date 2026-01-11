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

  // NEW METHODS FOR ARROW BUTTONS
  simulateKeyPress(key) {
    this.keys[key] = true;
  }

  simulateKeyRelease(key) {
    this.keys[key] = false;
  }

  isKeyPressed(key) {
    return this.keys[key] || false;
  }

  getMovement() {
    let dx = 0, dy = 0;
    
    // Support both keyboard and simulated button presses
    if (this.isKeyPressed('w') || this.isKeyPressed('arrowup') || this.isKeyPressed('up')) dy = -1;
    if (this.isKeyPressed('s') || this.isKeyPressed('arrowdown') || this.isKeyPressed('down')) dy = 1;
    if (this.isKeyPressed('a') || this.isKeyPressed('arrowleft') || this.isKeyPressed('left')) dx = -1;
    if (this.isKeyPressed('d') || this.isKeyPressed('arrowright') || this.isKeyPressed('right')) dx = 1;
    
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

  // Check for specific actions
  isInteractPressed() {
    return this.isKeyPressed('e') || this.isKeyPressed(' ');
  }

  isMapPressed() {
    return this.isKeyPressed('m');
  }

  isPausePressed() {
    return this.isKeyPressed('escape');
  }
}