// Simple singleton SoundManager
let audioInstance = null;
let muted = false;

export class SoundManager {
  constructor() {
    // Only create audio instance once
    if (!audioInstance) {
      audioInstance = new Audio('/assets/sound/backgroundMusic.wav');
      audioInstance.loop = true;
      audioInstance.volume = 0.5;
      audioInstance.preload = 'auto';
      audioInstance.load(); // Load but don't play yet
    }
  }

  play() {
    if (!muted && audioInstance) {
      audioInstance.play().catch(e => {
        // Ignore autoplay errors
        console.log('Audio play requires user interaction');
      });
    }
  }

  pause() {
    if (audioInstance) {
      audioInstance.pause();
    }
  }

  setMuted(isMuted) {
    muted = isMuted;
    if (audioInstance) {
      audioInstance.muted = isMuted;
    }
  }

  toggleMute() {
    muted = !muted;
    if (audioInstance) {
      audioInstance.muted = muted;
    }
    return muted;
  }

  setVolume(volume) {
    if (audioInstance) {
      audioInstance.volume = Math.max(0, Math.min(1, volume));
    }
  }
}