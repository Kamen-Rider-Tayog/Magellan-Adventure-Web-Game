export class FPSCounter {
  constructor() {
    this.count = 0;
    this.lastTime = 0;
    this.fps = 0;
    this.frameTimes = [];
    this.maxSamples = 60;
  }

  update() {
    this.count++;
    const now = performance.now();
    
    if (now - this.lastTime >= 1000) {
      this.fps = this.count;
      this.count = 0;
      this.lastTime = now;
      
      // Keep track of frame times for averaging
      this.frameTimes.push(this.fps);
      if (this.frameTimes.length > this.maxSamples) {
        this.frameTimes.shift();
      }
    }
  }

  getFPS() {
    return this.fps;
  }

  getAverageFPS() {
    if (this.frameTimes.length === 0) return 0;
    const sum = this.frameTimes.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.frameTimes.length);
  }

  getFrameTime() {
    return this.fps > 0 ? (1000 / this.fps).toFixed(2) : '0';
  }
}