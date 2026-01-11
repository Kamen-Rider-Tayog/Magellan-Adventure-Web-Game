export class ImageLoader {
  constructor() {
    this.images = new Map();
    this.loaded = false;
  }

  loadImage(key, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      // Use process.env.PUBLIC_URL for correct path
      const fullUrl = `${process.env.PUBLIC_URL}/${url}`;
      
      img.onload = () => {
        this.images.set(key, img);
        console.log(`✓ Loaded: ${key} from ${fullUrl}`);
        resolve(img);
      };
      
      img.onerror = (e) => {
        console.error(`✗ Failed: ${key} from ${fullUrl}`, e);
        reject(new Error(`Failed to load: ${key}`));
      };
      
      img.src = fullUrl;
    });
  }

  async preloadAllAssets() {
    const assets = [
      // Backgrounds
      { key: 'background_dock', url: 'assets/backgrounds/dock.png' },
      { key: 'background_ship', url: 'assets/backgrounds/ship.png' },
      { key: 'background_island', url: 'assets/backgrounds/island.png' },
      { key: 'background_cebu', url: 'assets/backgrounds/cebu.png' },
      { key: 'background_title', url: 'assets/backgrounds/title.png' },
      
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
      { key: 'player_up', url: 'assets/player/MagellanUp.png' },
      { key: 'player_down', url: 'assets/player/MagellanDown.png' },
      { key: 'player_left', url: 'assets/player/MagellanLeft.png' },
      { key: 'player_right', url: 'assets/player/MagellanRight.png' },
      
      // UI elements (if needed)
      { key: 'ui_button', url: 'assets/ui/resumeButton.png' },
      { key: 'ui_settings', url: 'assets/ui/settingsIcon.png' },
    ];

    try {
      await this.loadImages(assets);
      this.loaded = true;
      console.log('✅ All game assets loaded successfully');
    } catch (error) {
      console.warn('⚠️ Some assets failed to load, using fallback colors');
      // Don't throw, just continue with fallback
    }
    
    return this;
  }

  loadImages(imageList) {
    const promises = imageList.map(({ key, url }) => 
      this.loadImage(key, url)
    );
    return Promise.all(promises);
  }

  getImage(key) {
    return this.images.get(key) || null;
  }

  getProgress() {
    return this.loaded ? 100 : 0;
  }
}

export const imageLoader = new ImageLoader();