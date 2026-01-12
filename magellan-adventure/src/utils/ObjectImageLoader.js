import { imageLoader } from './ImageLoader';

export class ObjectImageLoader {
  constructor() {
    this.objectImages = new Map();
    this.loaded = false;
  }

  /**
   * Load all object images
   * @returns {Promise<void>}
   */
  loadAllObjectImages() {
    const objectAssets = [
      // NPCs and Objects
      { key: 'object_manuel', url: 'assets/objects/manuel.png' },
      { key: 'object_charles', url: 'assets/objects/charles.png' },
      { key: 'object_kawal', url: 'assets/objects/kawal.png' },
      { key: 'object_sailor1', url: 'assets/objects/sailor1.png' },
      { key: 'object_sailor2', url: 'assets/objects/sailor2.png' },
      { key: 'object_rajah', url: 'assets/objects/rajah.png' },
    ];

    const promises = objectAssets.map(({ key, url }) => 
      imageLoader.loadImage(key, url).catch(err => {
        console.warn(`Failed to load ${key}:`, err);
        return null;
      })
    );

    return Promise.all(promises).then(() => {
      // Store references to object images
      objectAssets.forEach(({ key }) => {
        const img = imageLoader.getImage(key);
        if (img) {
          this.objectImages.set(key, img);
        }
      });
      
      this.loaded = true;
      console.log('✅ All object images loaded successfully');
    }).catch(error => {
      console.error('Failed to load object images:', error);
    });
  }

  /**
   * Get object image by key
   * @param {string} key - Object key
   * @returns {HTMLImageElement|null}
   */
  getObjectImage(key) {
    return this.objectImages.get(key) || null;
  }

  /**
   * Map ObjectType to image key - FIXED VERSION
   * @param {Object} objectType - ObjectType from types/ObjectType.js
   * @returns {string|null} Image key
   */
  getImageKeyForObjectType(objectType) {
    // Map by the symbol property which is unique for each object type
    const symbolMapping = {
      'K': 'object_manuel',      // NPC_KING
      'C': 'object_charles',     // CHARLES
      'G': 'object_kawal',       // KAWAL
      'S1': 'object_sailor1',    // SAILOR1
      'S2': 'object_sailor2',    // SAILOR2
      'H': 'object_rajah'        // HUMABON
    };

    const imageKey = symbolMapping[objectType.symbol];
    
    if (!imageKey) {
      console.warn(`No image mapping found for object with symbol: ${objectType.symbol}`);
      return null;
    }
    
    return imageKey;
  }

  /**
   * Get image for a specific object type
   * @param {Object} objectType - ObjectType from types/ObjectType.js
   * @returns {HTMLImageElement|null}
   */
  getImageForObjectType(objectType) {
    const imageKey = this.getImageKeyForObjectType(objectType);
    if (!imageKey) return null;
    
    const image = this.getObjectImage(imageKey);
    
    if (!image) {
      console.warn(`Image not loaded for key: ${imageKey}`);
    }
    
    return image;
  }

  /**
   * Preload all game object images
   * @returns {Promise<void>}
   */
  preload() {
    return this.loadAllObjectImages();
  }

  /**
   * Check if all object images are loaded
   * @returns {boolean}
   */
  isLoaded() {
    return this.loaded;
  }

  /**
   * Clear all object images
   */
  clear() {
    this.objectImages.clear();
    this.loaded = false;
  }
}

// Singleton instance
export const objectImageLoader = new ObjectImageLoader();