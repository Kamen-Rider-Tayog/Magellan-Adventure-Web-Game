import { MissionManager } from './MissionManager';

export class GameStateManager {
  constructor() {
    this.currentScene = 0;
    this.player = { x: 10, y: 15, direction: 'DOWN', frame: 1 };
    this.camera = { x: 0, y: 0 };
    this.showNarrative = true;
    this.narrativeIndex = 0;
    this.showDialogue = false;
    this.currentObject = null;
    this.showSettings = false;
    this.showMap = false;
    this.showInfoBox = true;
    this.muted = false;
    this.fps = 60;
    this.isPaused = false;
  }

  getState() {
    return {
      currentScene: this.currentScene,
      player: { ...this.player },
      camera: { ...this.camera },
      showNarrative: this.showNarrative,
      narrativeIndex: this.narrativeIndex,
      showDialogue: this.showDialogue,
      currentObject: this.currentObject,
      showSettings: this.showSettings,
      showMap: this.showMap,
      showInfoBox: this.showInfoBox,
      muted: this.muted,
      fps: this.fps,
      isPaused: this.isPaused
    };
  }

  updateState(updates) {
    Object.assign(this, updates);
  }

  resetMission() {
    MissionManager.reset();
  }

  nextScene() {
    this.currentScene++;
    if (this.currentScene > 6) this.currentScene = 6;
    return this.currentScene;
  }

  setScene(sceneIndex) {
    this.currentScene = Math.max(0, Math.min(sceneIndex, 6));
  }
}