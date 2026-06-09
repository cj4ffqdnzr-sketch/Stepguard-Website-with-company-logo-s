/**
 * Gallery Image Linking System
 * Allows dynamic image binding to gallery items in the system gallery
 */

class GalleryManager {
  constructor(galleryGridSelector = '.gallery-grid') {
    this.galleryGrid = document.querySelector(galleryGridSelector);
    this.galleryItems = [];
    this.imageData = {};
    this.init();
  }

  /**
   * Initialize gallery items and set up event listeners
   */
  init() {
    if (!this.galleryGrid) {
      console.warn('Gallery grid not found');
      return;
    }

    this.galleryItems = Array.from(
      this.galleryGrid.querySelectorAll('.gallery-item')
    );
    console.log(`Gallery initialized with ${this.galleryItems.length} items`);
  }

  /**
   * Set image data for gallery items
   * @param {Array} imageArray - Array of image data objects
   * 
   * Example structure:
   * [
   *   {
   *     itemIndex: 0,
   *     src: 'images/gallery/sensor-unit-front.jpg',
   *     alt: 'Stepguard sensor unit front view'
   *   },
   *   ...
   * ]
   */
  setImages(imageArray) {
    imageArray.forEach((imgData) => {
      this.imageData[imgData.itemIndex] = imgData;
      this.applyImage(imgData.itemIndex, imgData);
    });
  }

  /**
   * Apply image to a specific gallery item
   * @param {number} itemIndex - Index of the gallery item
   * @param {Object} imageData - Image data object with src and alt
   */
  applyImage(itemIndex, imageData) {
    const item = this.galleryItems[itemIndex];
    if (!item) {
      console.warn(`Gallery item at index ${itemIndex} not found`);
      return;
    }

    const placeholder = item.querySelector('.placeholder');
    
    // Remove placeholder if it exists
    if (placeholder) {
      placeholder.remove();
    }

    // Check if image already exists
    let img = item.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.style.position = 'absolute';
      img.style.inset = '0';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center';
      img.style.display = 'block';
      img.style.zIndex = '0';
      item.appendChild(img);
    }

    img.src = imageData.src;
    img.alt = imageData.alt || '';
    img.loading = 'lazy';

    // Ensure caption stays on top
    const caption = item.querySelector('.caption');
    if (caption) {
      caption.style.position = 'relative';
      caption.style.zIndex = '1';
    }

    console.log(`Image applied to gallery item ${itemIndex}`);
  }

  /**
   * Load images from a JSON file
   * @param {string} jsonPath - Path to the JSON file containing image data
   */
  async loadImagesFromJSON(jsonPath) {
    try {
      const response = await fetch(jsonPath);
      const data = await response.json();
      this.setImages(data.images);
    } catch (error) {
      console.error('Failed to load gallery images:', error);
    }
  }

  /**
   * Get image data for a specific item
   * @param {number} itemIndex - Index of the gallery item
   * @returns {Object} Image data object
   */
  getImage(itemIndex) {
    return this.imageData[itemIndex];
  }

  /**
   * Update a specific gallery item with new image
   * @param {number} itemIndex - Index of the gallery item
   * @param {string} src - New image source
   * @param {string} alt - New alt text (optional)
   */
  updateImage(itemIndex, src, alt = '') {
    const imgData = { itemIndex, src, alt };
    this.imageData[itemIndex] = imgData;
    this.applyImage(itemIndex, imgData);
  }

  /**
   * Remove image from a gallery item
   * @param {number} itemIndex - Index of the gallery item
   */
  removeImage(itemIndex) {
    const item = this.galleryItems[itemIndex];
    if (!item) return;

    const img = item.querySelector('img');
    if (img) {
      img.remove();
    }

    delete this.imageData[itemIndex];
  }

  /**
   * Export current image configuration as JSON
   * @returns {Object} Configuration object
   */
  exportConfig() {
    return {
      images: Object.values(this.imageData),
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  window.galleryManager = new GalleryManager('.gallery-grid');
});
