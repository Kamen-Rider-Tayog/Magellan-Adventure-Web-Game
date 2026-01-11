import { TileType } from '../types/TileType';
import MissionManager from '../game/MissionManager';

const SceneFive = {
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

    this.updateExitTile();
  },

  updateExitTile() {
    if (!this.currentScene) return;
    
    if (MissionManager.hasTalkedToAllSailors) {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.DOOR);
      this.currentScene.setExitTile(this.exitX, this.exitY, true);
    } else {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.GRASS);
      this.currentScene.setExitTile(this.exitX, this.exitY, false);
    }
  },

  getMissionText() {
    return MissionManager.hasTalkedToAllSailors
      ? "Land has been sighted! Continue to Guam for provisions."
      : "Check on your crew members suffering from hunger after the Pacific crossing.";
  }
};

export default SceneFive;