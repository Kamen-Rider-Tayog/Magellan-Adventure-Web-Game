export class ImageLoader {
  constructor() {
    this.images = new Map();
    this.loaded = false;
    this.loadingPromises = [];
  }

  /**
   * Load a single image
   * @param {string} key - Unique key for the image
   * @param {string} url - Image URL
   * @returns {Promise<HTMLImageElement>}
   */
  loadImage(key, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.images.set(key, img);
        resolve(img);
      };
      
      img.onerror = (error) => {
        console.error(`Failed to load image: ${url}`, error);
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      img.src = url;
    });
  }

  /**
   * Load multiple images
   * @param {Array<{key: string, url: string}>} imageList - List of images to load
   * @returns {Promise<Map<string, HTMLImageElement>>}
   */
  loadImages(imageList) {
    const promises = imageList.map(({ key, url }) => 
      this.loadImage(key, url)
    );
    
    return Promise.all(promises).then(() => this.images);
  }

  /**
   * Get a loaded image
   * @param {string} key - Image key
   * @returns {HTMLImageElement|null}
   */
  getImage(key) {
    return this.images.get(key) || null;
  }

  /**
   * Check if all images are loaded
   * @returns {boolean}
   */
  isLoaded() {
    return this.loaded;
  }

  /**
   * Preload all game assets
   * @returns {Promise<void>}
   */
  preloadAllAssets() {
    const assets = [
      // Backgrounds
      { key: 'background_dock', url: 'assets/backgrounds/dock.png' },
      { key: 'background_ship', url: 'assets/backgrounds/ship.png' },
      { key: 'background_island', url: 'assets/backgrounds/island.png' },
      { key: 'background_cebu', url: 'assets/backgrounds/cebu.png' },
      
      // Tiles
      { key: 'tile_grass', url: 'assets/tiles/grass.png' },
      { key: 'tile_water', url: 'assets/tiles/water.png' },
      { key: 'tile_sand', url: 'assets/tiles/sand.png' },
      { key: 'tile_tile1', url: 'assets/tiles/tile1.png' },
      { key: 'tile_tile2', url: 'assets/tiles/tile2.png' },
      { key: 'tile_carpet_left', url: 'assets/tiles/carpetLeft.png' },
      { key: 'tile_carpet_middle', url: 'assets/tiles/carpetMiddle.png' },
      { key: 'tile_carpet_right', url: 'assets/tiles/carpetRight.png' },
      { key: 'tile_door', url: 'assets/tiles/door.png' },
      
      // Player
      { key: 'player_up', url: 'assets/player/up.png' },
      { key: 'player_down', url: 'assets/player/down.png' },
      { key: 'player_left', url: 'assets/player/left.png' },
      { key: 'player_right', url: 'assets/player/right.png' },
      
      // UI
      { key: 'ui_button', url: 'assets/ui/button.png' },
      { key: 'ui_panel', url: 'assets/ui/panel.png' },
    ];

    return this.loadImages(assets).then(() => {
      this.loaded = true;
      console.log('All assets loaded successfully');
    }).catch(error => {
      console.error('Failed to load assets:', error);
      throw error;
    });
  }

  /**
   * Clear all loaded images
   */
  clear() {
    this.images.clear();
    this.loaded = false;
  }

  /**
   * Get progress of image loading
   * @returns {number} Progress percentage (0-100)
   */
  getProgress() {
    if (this.loaded) return 100;
    const loaded = this.images.size;
    // Assuming we know the total number of assets to load
    const total = 16; // Adjust based on actual asset count
    return Math.min(Math.round((loaded / total) * 100), 100);
  }
}

// Singleton instance
export const imageLoader = new ImageLoader();