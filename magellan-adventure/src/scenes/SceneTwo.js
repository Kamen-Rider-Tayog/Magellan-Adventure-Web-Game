import { TileType } from '../types/TileType';
import MissionManager from '../game/MissionManager';

const SceneTwo = {
  exitX: 59,
  exitY: 45,
  currentScene: null,

  setup(scene) {
    this.currentScene = scene;
    
    // All grass
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    // Water dock area
    for (let x = 20; x <= 60; x++) {
      scene.setTile(x, 41, TileType.WATER);
      scene.setTile(x, 48, TileType.WATER);
    }
    for (let y = 41; y <= 49; y++) {
      scene.setTile(20, y, TileType.WATER);
      scene.setTile(60, y, TileType.WATER);
    }

    this.updateExitTile();
  },

  updateExitTile() {
    if (!this.currentScene) return;
    
    if (MissionManager.hasTalkedToKingCharles) {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.DOOR);
      this.currentScene.setExitTile(this.exitX, this.exitY, true);
    } else {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.WATER);
      this.currentScene.setExitTile(this.exitX, this.exitY, false);
    }
  },

  getMissionText() {
    return MissionManager.hasTalkedToKingCharles
      ? "King Charles has granted you ships and crew! Sail from the eastern dock to begin your historic journey."
      : "Find King Charles V and convince him to support your westward voyage to the Spice Islands.";
  }
};

export default SceneTwo;