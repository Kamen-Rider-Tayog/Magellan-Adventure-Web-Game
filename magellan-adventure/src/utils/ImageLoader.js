export class ImageLoader {
  constructor() {
    this.images = new Map();
    this.loaded = false;
    this.loadingPromises = [];
  }

  loadImage(key, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(key, img);
        resolve(img);
      };
      img.onerror = (error) => {
        console.error(`Failed to load image: ${url}`, error);
        // Fallback to color
        resolve(null);
      };
      img.src = process.env.PUBLIC_URL + url;
    });
  }

  loadTileImages() {
    const tileImages = {
      grass: '/assets/tiles/grass.png',
      water: '/assets/tiles/water.png',
      sand: '/assets/tiles/sand.png',
      tile1: '/assets/tiles/tile1.png',
      tile2: '/assets/tiles/tile2.png',
      carpetLeft: '/assets/tiles/carpetLeft.png',
      carpetMiddle: '/assets/tiles/carpetMiddle.png',
      carpetRight: '/assets/tiles/carpetRight.png',
      door: '/assets/tiles/door.png'
    };

    return Promise.all(
      Object.entries(tileImages).map(([key, url]) => this.loadImage(key, url))
    );
  }

  loadPlayerImages() {
    const playerImages = {
      playerDown: '/assets/player/magellanDown.png',
      playerUp: '/assets/player/magellanUp.png',
      playerLeft: '/assets/player/magellanLeft.png',
      playerRight: '/assets/player/magellanRight.png'
    };

    return Promise.all(
      Object.entries(playerImages).map(([key, url]) => this.loadImage(key, url))
    );
  }

  loadObjectImages() {
    const objectImages = {
      manuel: '/assets/objects/manuel.png',
      charles: '/assets/objects/charles.png',
      kawal: '/assets/objects/kawal.png',
      sailor1: '/assets/objects/sailor1.png',
      sailor2: '/assets/objects/sailor2.png',
      humabon: '/assets/objects/humabon.png'
    };

    return Promise.all(
      Object.entries(objectImages).map(([key, url]) => this.loadImage(key, url))
    );
  }

  loadUIImages() {
    const uiImages = {
      arrowUp: '/assets/ui/arrowUP.png',
      arrowDown: '/assets/ui/arrowDOWN.png',
      arrowLeft: '/assets/ui/arrowLEFT.png',
      arrowRight: '/assets/ui/arrowRIGHT.png',
      settingsBackground: '/assets/ui/settingsBackground.png',
      resumeButton: '/assets/ui/resumeButton.png',
      quitButton: '/assets/ui/quitButton.png'
    };

    return Promise.all(
      Object.entries(uiImages).map(([key, url]) => this.loadImage(key, url))
    );
  }

  loadBackgroundImages() {
    const backgroundImages = {
      dock: '/assets/backgrounds/dock.png',
      ship: '/assets/backgrounds/ship.png',
      island: '/assets/backgrounds/island.png',
      cebu: '/assets/backgrounds/cebu.png'
    };

    return Promise.all(
      Object.entries(backgroundImages).map(([key, url]) => this.loadImage(key, url))
    );
  }

  async loadAll() {
    try {
      await Promise.all([
        this.loadTileImages(),
        this.loadPlayerImages(),
        this.loadObjectImages(),
        this.loadUIImages(),
        this.loadBackgroundImages()
      ]);
      
      this.loaded = true;
      console.log('All game assets loaded successfully');
    } catch (error) {
      console.error('Error loading game assets:', error);
      this.loaded = true; // Still mark as loaded to proceed with color fallbacks
    }
  }

  get(key) {
    return this.images.get(key);
  }

  has(key) {
    return this.images.has(key);
  }

  isLoaded() {
    return this.loaded;
  }
}