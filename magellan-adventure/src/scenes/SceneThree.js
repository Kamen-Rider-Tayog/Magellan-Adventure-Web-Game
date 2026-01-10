import { TileType } from '../game/TileType';
import MissionManager from '../game/MissionManager';

const SceneThree = {
  exitX: 45,
  exitY: 17,
  currentScene: null,

  setup(scene) {
    this.currentScene = scene;
    
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    // Water areas (ship deck)
    for (let x = 0; x <= 20; x++) scene.setTile(x, 10, TileType.WATER);
    for (let x = 20; x <= 44; x++) scene.setTile(x, 11, TileType.WATER);
    for (let x = 44; x <= 61; x++) scene.setTile(x, 10, TileType.WATER);

    this.updateExitTile();
  },

  updateExitTile() {
    if (!this.currentScene) return;
    
    if (MissionManager.hasTalkedToSailor) {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.DOOR);
      this.currentScene.setExitTile(this.exitX, this.exitY, true);
    } else {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.GRASS);
      this.currentScene.setExitTile(this.exitX, this.exitY, false);
    }
  },

  getMissionText() {
    return MissionManager.hasTalkedToSailor
      ? "Continue sailing south. The crew is concerned about finding the passage."
      : "Navigate south along the American coastline. Talk to your crew member for updates.";
  }
};

export default SceneThree;