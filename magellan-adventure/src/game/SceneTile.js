import { TileType } from './TileType';

export default class SceneTile {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.tiles = Array(cols).fill(null).map(() => Array(rows).fill(TileType.GRASS));
    this.exitTiles = Array(cols).fill(null).map(() => Array(rows).fill(false));
    this.useBackgroundImage = false;
  }

  getTile(x, y) {
    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      return this.tiles[x][y];
    }
    return null;
  }

  setTile(x, y, tileType) {
    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      this.tiles[x][y] = tileType;
    }
  }

  setExitTile(x, y, isExit) {
    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      this.exitTiles[x][y] = isExit;
    }
  }

  isExitTile(x, y) {
    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      return this.exitTiles[x][y];
    }
    return false;
  }

  isCollidable(x, y) {
    const tile = this.getTile(x, y);
    return tile ? tile.collidable : false;
  }
}