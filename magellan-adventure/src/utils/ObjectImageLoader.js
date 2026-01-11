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
      
      // Additional objects if they exist
      { key: 'object_ship', url: 'assets/objects/ship.png' },
      { key: 'object_barrel', url: 'assets/objects/barrel.png' },
      { key: 'object_chest', url: 'assets/objects/chest.png' },
    ];

    const promises = objectAssets.map(({ key, url }) => 
      imageLoader.loadImage(key, url)
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
      console.log('All object images loaded successfully');
    }).catch(error => {
      console.error('Failed to load object images:', error);
      throw error;
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
   * Map ObjectType to image key
   * @param {Object} objectType - ObjectType from types/ObjectType.js
   * @returns {string} Image key
   */
  getImageKeyForObjectType(objectType) {
    const mapping = {
      'NPC_KING': 'object_manuel',
      'CHARLES': 'object_charles',
      'KAWAL': 'object_kawal',
      'SAILOR1': 'object_sailor1',
      'SAILOR2': 'object_sailor2',
      'HUMABON': 'object_rajah'
    };

    // Find the object type by comparing properties
    for (const [key, value] of Object.entries(mapping)) {
      if (objectType.name === key || objectType.symbol === mapping[key]) {
        return value;
      }
    }

    return null;
  }

  /**
   * Get image for a specific object type
   * @param {Object} objectType - ObjectType from types/ObjectType.js
   * @returns {HTMLImageElement|null}
   */
  getImageForObjectType(objectType) {
    const imageKey = this.getImageKeyForObjectType(objectType);
    return imageKey ? this.getObjectImage(imageKey) : null;
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