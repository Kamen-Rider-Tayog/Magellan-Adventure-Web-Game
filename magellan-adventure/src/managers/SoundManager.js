// Simple singleton SoundManager
let audioInstance = null;
let muted = false;
let isUserInteracted = false; // Track if user has interacted

export class SoundManager {
  constructor() {
    // Only create audio instance once
    if (!audioInstance) {
      // Use process.env.PUBLIC_URL for correct path
      const audioUrl = `${process.env.PUBLIC_URL}/assets/sound/backgroundMusic.wav`;
      audioInstance = new Audio(audioUrl);
      audioInstance.loop = true;
      audioInstance.volume = 0.3; // Lower volume to be less intrusive
      audioInstance.preload = 'auto';
      audioInstance.load(); // Load but don't play yet
      
      // Set initial state
      audioInstance.muted = muted;
      
      console.log(`Audio loaded from: ${audioUrl}`);
      
      // Setup user interaction tracking
      this.setupUserInteraction();
    }
  }

  setupUserInteraction() {
    // Listen for user interactions to enable audio
    const enableAudio = () => {
      if (!isUserInteracted) {
        isUserInteracted = true;
        console.log('User interaction detected, audio can now play');
        
        // Try to play if not muted
        if (!muted && audioInstance) {
          audioInstance.play().catch(e => {
            console.log('Still blocked after interaction:', e.message);
          });
        }
      }
    };

    // Add event listeners for user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, enableAudio, { once: true });
    });
  }

  play() {
    if (!muted && audioInstance) {
      if (isUserInteracted) {
        // User has interacted, we can play
        audioInstance.play().catch(e => {
          console.log('Audio play error:', e.message);
        });
      } else {
        // User hasn't interacted yet, wait for interaction
        console.log('Waiting for user interaction before playing audio...');
      }
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

  // New method to check if audio can play
  canPlay() {
    return isUserInteracted;
  }
}