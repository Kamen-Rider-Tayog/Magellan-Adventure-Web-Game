import { TileType } from '../game/TileType';
import MissionManager from '../game/MissionManager';

const SceneSix = {
  currentScene: null,
  
  setup(scene) {
    this.currentScene = scene;
    const exitX = 0;
    const exitY = Math.floor(scene.rows / 2);
    
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    this.updateExitTile(exitX, exitY);
  },

  updateExitTile(x, y) {
    if (!this.currentScene) return;
    
    if (MissionManager.hasTalkedToHumabon) {
      this.currentScene.setTile(x, y, TileType.DOOR);
      this.currentScene.setExitTile(x, y, true);
    }
  },

  getMissionText() {
    return MissionManager.hasTalkedToHumabon
      ? "The blood compact is complete. Your historic journey has reached its conclusion."
      : "Meet with Rajah Humabon to establish an alliance.";
  }
};

export default SceneSix;