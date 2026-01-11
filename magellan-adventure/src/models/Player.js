export class Player {
  constructor(x = 10, y = 15) {
    this.x = x;
    this.y = y;
    this.direction = 'DOWN';
    this.frame = 1;
    this.speed = 1;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  updateFrame(frame) {
    this.frame = frame;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}