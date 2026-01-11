let instance = null;

export class ImageLoader {
  constructor() {
    if (instance) {
      return instance;
    }
    
    this.images = new Map();
    this.loaded = false;
    this.isLoading = false;
    this.loadingPromise = null;
    
    instance = this;
  }

  async preloadAllAssets() {
    // If already loaded, return immediately
    if (this.loaded) {
      console.log('✅ Assets already loaded');
      return this;
    }
    
    // If currently loading, return the existing promise
    if (this.isLoading && this.loadingPromise) {
      console.log('⚠️ Assets already loading, waiting...');
      return this.loadingPromise;
    }
    
    this.isLoading = true;
    console.log('🔄 Starting asset loading...');
    
    this.loadingPromise = new Promise(async (resolve, reject) => {
      try {
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
          
          // UI elements
          { key: 'arrow_up', url: 'assets/ui/arrowUp.png' },
          { key: 'arrow_down', url: 'assets/ui/arrowDown.png' },
          { key: 'arrow_left', url: 'assets/ui/arrowLeft.png' },
          { key: 'arrow_right', url: 'assets/ui/arrowRight.png' },
          { key: 'ui_resume_button', url: 'assets/ui/resumeButton.png' },
          { key: 'ui_quit_button', url: 'assets/ui/quitButton.png' },
          { key: 'ui_settings_icon', url: 'assets/ui/settingsIcon.png' },
          { key: 'ui_settings_background', url: 'assets/ui/settingsBackground.png' },
          
          // Dialogue boxes
          { key: 'dialogue_box', url: 'assets/image/dialogue.png' },
          { key: 'dialogue_box_short', url: 'assets/image/dialogue box short.png' },
          
          // Map
          { key: 'map_image', url: 'assets/image/map.png' },
        ];

        await this.loadImages(assets);
        this.loaded = true;
        this.isLoading = false;
        console.log('✅ All game assets loaded successfully');
        resolve(this);
      } catch (error) {
        console.error('❌ Asset loading failed:', error);
        this.isLoading = false;
        reject(error);
      }
    });
    
    return this.loadingPromise;
  }

  loadImages(imageList) {
    const promises = imageList.map(({ key, url }) => 
      this.loadImage(key, url).catch(error => {
        console.warn(`⚠️ Failed to load ${key}, using fallback`);
        return this.createFallbackImage(key);
      })
    );
    return Promise.all(promises);
  }

  loadImage(key, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const fullUrl = `${process.env.PUBLIC_URL}/${url}`;
      
      img.onload = () => {
        this.images.set(key, img);
        console.log(`✓ Loaded: ${key}`);
        resolve(img);
      };
      
      img.onerror = (e) => {
        console.error(`✗ Failed to load: ${key} from ${fullUrl}`, e);
        reject(new Error(`Failed to load: ${key}`));
      };
      
      img.src = fullUrl;
    });
  }

  createFallbackImage(key) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = this.getFallbackColor(key);
      ctx.fillRect(0, 0, 64, 64);
      
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 64, 64);
      
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(key.replace('_', ' '), 32, 32);
      
      const img = new Image();
      img.onload = () => {
        this.images.set(key, img);
        resolve(img);
      };
      img.src = canvas.toDataURL();
    });
  }

  getFallbackColor(key) {
    const colors = {
      'player': '#3498db',
      'background': '#2ecc71',
      'tile': '#e74c3c',
      'ui': '#f39c12',
      'arrow': '#9b59b6',
      'dialogue': '#1abc9c'
    };
    
    for (const [type, color] of Object.entries(colors)) {
      if (key.includes(type)) return color;
    }
    
    return '#95a5a6';
  }

  getImage(key) {
    return this.images.get(key) || null;
  }

  getProgress() {
    return this.loaded ? 100 : 0;
  }
}

// Export a single instance
export const imageLoader = new ImageLoader();