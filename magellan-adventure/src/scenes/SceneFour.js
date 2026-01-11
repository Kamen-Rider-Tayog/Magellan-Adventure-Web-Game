import { TileType } from '../types/TileType';
import MissionManager from '../game/MissionManager';

const SceneFour = {
  currentScene: null,
  
  setup(scene) {
    this.currentScene = scene;
    const exitX = Math.floor(scene.cols / 2);
    const exitY = 20;
    
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    // Some water obstacles
    for (let x = 15; x <= 40; x++) scene.setTile(x, 5, TileType.WATER);

    this.updateExitTile(exitX, exitY);
  },

  updateExitTile(x, y) {
    if (!this.currentScene) return;
    
    if (MissionManager.hasDealtWithMutineers) {
      this.currentScene.setTile(x, y, TileType.DOOR);
      this.currentScene.setExitTile(x, y, true);
    } else {
      this.currentScene.setTile(x, y, TileType.GRASS);
      this.currentScene.setExitTile(x, y, false);
    }
  },

  getMissionText() {
    return MissionManager.hasDealtWithMutineers
      ? "The mutiny has been crushed. Continue your journey."
      : "Confront the mutineers who are plotting against your command.";
  }
};

export default SceneFour;