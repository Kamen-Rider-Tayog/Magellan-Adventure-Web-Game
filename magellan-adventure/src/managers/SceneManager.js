import { SceneTile } from '../models/SceneTile';
import { TileType } from '../types/TileType';
import { MissionManager } from './MissionManager';

export class SceneManager {
  constructor() {
    this.scenes = [
      { cols: 21, rows: 30 },
      { cols: 64, rows: 64 },
      { cols: 61, rows: 32 },
      { cols: 48, rows: 48 },
      { cols: 61, rows: 32 },
      { cols: 64, rows: 64 }
    ];
    this.currentSceneIndex = 0;
    this.currentScene = null;
  }

  getSceneConfig(sceneIndex) {
    return this.scenes[sceneIndex] || this.scenes[0];
  }

  createScene(sceneIndex) {
    const config = this.getSceneConfig(sceneIndex);
    const scene = new SceneTile(config.cols, config.rows);
    this.setupScene(sceneIndex, scene);
    this.currentSceneIndex = sceneIndex;
    this.currentScene = scene;
    return scene;
  }

  setupScene(sceneIndex, scene) {
    switch(sceneIndex) {
      case 0: this.setupSceneOne(scene); break;
      case 1: this.setupSceneTwo(scene); break;
      case 2: this.setupSceneThree(scene); break;
      case 3: this.setupSceneFour(scene); break;
      case 4: this.setupSceneFive(scene); break;
      case 5: this.setupSceneSix(scene); break;
      default: this.setupSceneOne(scene);
    }
  }

  setupSceneOne(scene) {
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

    const exitX = Math.floor(scene.cols / 2);
    const exitY = scene.rows - 1;
    
    if (MissionManager.hasTalkedToKingManuel) {
      scene.setTile(exitX, exitY, TileType.DOOR);
      scene.setExitTile(exitX, exitY, true);
    } else {
      scene.setTile(exitX, exitY, TileType.CARPET_MIDDLE);
      scene.setExitTile(exitX, exitY, false);
    }
  }

  setupSceneTwo(scene) {
    scene.setBackgroundImage('assets/backgrounds/dock.png');
    
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

    const exitX = 59, exitY = 45;
    if (MissionManager.hasTalkedToKingCharles) {
      scene.setTile(exitX, exitY, TileType.DOOR);
      scene.setExitTile(exitX, exitY, true);
    } else {
      scene.setTile(exitX, exitY, TileType.WATER);
      scene.setExitTile(exitX, exitY, false);
    }
  }

  setupSceneThree(scene) {
    scene.setBackgroundImage('assets/backgrounds/ship.png');
    
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    // Water areas (ship deck)
    for (let x = 0; x <= 20; x++) scene.setTile(x, 10, TileType.WATER);
    for (let x = 20; x <= 44; x++) scene.setTile(x, 11, TileType.WATER);
    for (let x = 44; x <= 61; x++) scene.setTile(x, 10, TileType.WATER);

    for (let x = 0; x <= 8; x++) scene.setTile(x, 22, TileType.WATER);
    for (let x = 8; x <= 20; x++) scene.setTile(x, 23, TileType.WATER);
    for (let x = 45; x <= 61; x++) scene.setTile(x, 23, TileType.WATER);

    const exitX = 45, exitY = 17;
    if (MissionManager.hasTalkedToSailor) {
      scene.setTile(exitX, exitY, TileType.DOOR);
      scene.setExitTile(exitX, exitY, true);
    } else {
      scene.setTile(exitX, exitY, TileType.GRASS);
      scene.setExitTile(exitX, exitY, false);
    }
  }

  setupSceneFour(scene) {
    scene.setBackgroundImage('assets/backgrounds/island.png');
    
    const exitX = Math.floor(scene.cols / 2);
    const exitY = 20;
    
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    // Some water obstacles
    for (let x = 15; x <= 40; x++) scene.setTile(x, 5, TileType.WATER);

    if (MissionManager.hasDealtWithMutineers) {
      scene.setTile(exitX, exitY, TileType.DOOR);
      scene.setExitTile(exitX, exitY, true);
    } else {
      scene.setTile(exitX, exitY, TileType.GRASS);
      scene.setExitTile(exitX, exitY, false);
    }
  }

  setupSceneFive(scene) {
    scene.setBackgroundImage('assets/backgrounds/ship.png');
    
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    for (let x = 0; x <= 20; x++) scene.setTile(x, 10, TileType.WATER);
    for (let x = 20; x <= 44; x++) scene.setTile(x, 11, TileType.WATER);

    const exitX = 45, exitY = 17;
    if (MissionManager.hasTalkedToAllSailors) {
      scene.setTile(exitX, exitY, TileType.DOOR);
      scene.setExitTile(exitX, exitY, true);
    } else {
      scene.setTile(exitX, exitY, TileType.GRASS);
      scene.setExitTile(exitX, exitY, false);
    }
  }

  setupSceneSix(scene) {
    scene.setBackgroundImage('assets/backgrounds/cebu.png');
    
    const exitX = 0;
    const exitY = Math.floor(scene.rows / 2);
    
    for (let x = 0; x < scene.cols; x++) {
      for (let y = 0; y < scene.rows; y++) {
        scene.setTile(x, y, TileType.GRASS);
      }
    }

    // Water collision on right
    for (let y = 0; y <= 64; y++) {
      scene.setTile(50, y, TileType.WATER);
    }

    if (MissionManager.hasTalkedToHumabon) {
      scene.setTile(exitX, exitY, TileType.DOOR);
      scene.setExitTile(exitX, exitY, true);
    }
  }

  getCurrentScene() {
    return this.currentScene;
  }

  getMissionText(sceneIndex) {
    switch(sceneIndex) {
      case 0:
        return MissionManager.hasTalkedToKingManuel
          ? "King Manuel has rejected your proposal. Travel to Spain to seek support from King Charles V."
          : "Present your westward route proposal to King Manuel I of Portugal.";
      case 1:
        return MissionManager.hasTalkedToKingCharles
          ? "King Charles has granted you ships and crew! Sail from the eastern dock to begin your historic journey."
          : "Find King Charles V and convince him to support your westward voyage to the Spice Islands.";
      case 2:
        return MissionManager.hasTalkedToSailor
          ? "Continue sailing south. The crew is concerned about finding the passage."
          : "Navigate south along the American coastline. Talk to your crew member for updates.";
      case 3:
        return MissionManager.hasDealtWithMutineers
          ? "The mutiny has been crushed. Continue your journey."
          : "Confront the mutineers who are plotting against your command.";
      case 4:
        return MissionManager.hasTalkedToAllSailors
          ? "Land has been sighted! Continue to Guam for provisions."
          : "Check on your crew members suffering from hunger after the Pacific crossing.";
      case 5:
        return MissionManager.hasTalkedToHumabon
          ? "The blood compact is complete. Your historic journey has reached its conclusion."
          : "Meet with Rajah Humabon to establish an alliance.";
      default:
        return "Explore the world and complete your mission.";
    }
  }
}