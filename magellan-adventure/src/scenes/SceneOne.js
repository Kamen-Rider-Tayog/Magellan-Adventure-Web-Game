import { TileType } from '../types/TileType';
import MissionManager from '../game/MissionManager';

const SceneOne = {
  exitX: 0,
  exitY: 0,
  currentScene: null,

  setup(scene) {
    this.currentScene = scene;
    
    // Checkered floor
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, (x + y) % 2 === 0 ? TileType.TILE1 : TileType.TILE2);
      }
    }

    // Red carpet
    const middleStart = Math.floor(scene.cols / 2) - 2;
    for (let y = 4; y < scene.rows; y++) {
      scene.setTile(middleStart + 1, y, TileType.CARPET_LEFT);
      scene.setTile(middleStart + 2, y, TileType.CARPET_MIDDLE);
      scene.setTile(middleStart + 3, y, TileType.CARPET_RIGHT);
    }

    this.exitX = Math.floor(scene.cols / 2);
    this.exitY = scene.rows - 1;
    this.updateExitTiles();
  },

  updateExitTiles() {
    if (!this.currentScene) return;
    
    if (MissionManager.hasTalkedToKingManuel) {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.DOOR);
      this.currentScene.setExitTile(this.exitX, this.exitY, true);
    } else {
      this.currentScene.setTile(this.exitX, this.exitY, TileType.CARPET_MIDDLE);
      this.currentScene.setExitTile(this.exitX, this.exitY, false);
    }
  },

  getMissionText() {
    return MissionManager.hasTalkedToKingManuel
      ? "King Manuel has rejected your proposal. Travel to Spain to seek support from King Charles V."
      : "Present your westward route proposal to King Manuel I of Portugal.";
  }
};

export default SceneOne;