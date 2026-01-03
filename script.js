// Gallery version - increment this when allImages changes
const GALLERY_VERSION = 7;

// List of all images - will be loaded from images.json
let allImages = [];

// Load image list from JSON file
async function loadImageList() {
    try {
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error('Failed to load images.json');
        }
        allImages = await response.json();
        console.log(`Loaded ${allImages.length} images from images.json`);
        return allImages;
    } catch (error) {
        console.error('Error loading images.json:', error);
        alert('Error loading image list. Please make sure images.json exists.');
        return [];
    }
}

// Initialize gallery
async function initGallery() {
    // Load image list from JSON
    await loadImageList();
    
    if (allImages.length === 0) {
        console.error('No images loaded');
        return;
    }
    
    // Initialize images and deletedImages arrays
    initializeGalleryData();
    
    // Load the gallery
    loadGallery();
}

// Load images and deleted images from localStorage
function initializeGalleryData() {
    let storedVersion = parseInt(localStorage.getItem('galleryVersion')) || 1;
    let images, deletedImages;

    // If version changed, reset to default
    if (storedVersion !== GALLERY_VERSION) {
        console.log('Gallery updated, resetting to new image list...');
        images = [...allImages];
        deletedImages = [];
        localStorage.setItem('galleryVersion', GALLERY_VERSION);
        localStorage.setItem('galleryImages', JSON.stringify(images));
        localStorage.setItem('deletedImages', JSON.stringify(deletedImages));
    } else {
        images = JSON.parse(localStorage.getItem('galleryImages')) || [...allImages];
        deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];
    }

    // Filter out deleted images
    images = images.filter(img => !deletedImages.includes(img));
    
    // Set global variables
    window.images = images;
    window.deletedImages = deletedImages;
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('galleryVersion', GALLERY_VERSION);
    localStorage.setItem('galleryImages', JSON.stringify(images));
    localStorage.setItem('deletedImages', JSON.stringify(deletedImages));
}

// Format date from EXIF data
function formatExifDate(dateString) {
    if (!dateString) return null;
    
    // EXIF date format: "YYYY:MM:DD HH:MM:SS"
    const parts = dateString.split(' ');
    if (parts.length !== 2) return null;
    
    const dateParts = parts[0].split(':');
    const timeParts = parts[1].split(':');
    
    if (dateParts.length !== 3) return null;
    
    const date = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2]),
        parseInt(timeParts[0]),
        parseInt(timeParts[1]),
        parseInt(timeParts[2])
    );
    
    // Format as "MMM DD, YYYY"
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Extract EXIF data from image
function extractExifDate(img, dateOverlay) {
    if (typeof EXIF === 'undefined') {
        dateOverlay.textContent = 'No date';
        dateOverlay.classList.remove('loading');
        return;
    }
    
    EXIF.getData(img, function() {
        const dateTime = EXIF.getTag(this, 'DateTimeOriginal') || 
                        EXIF.getTag(this, 'DateTime') || 
                        EXIF.getTag(this, 'DateTimeDigitized');
        
        const formattedDate = formatExifDate(dateTime);
        
        if (formattedDate) {
            dateOverlay.textContent = formattedDate;
            // Store date for lightbox
            dateOverlay.dataset.fullDate = formattedDate;
        } else {
            dateOverlay.textContent = 'No date';
        }
        dateOverlay.classList.remove('loading');
    });
}

// Lightbox functionality
function openLightbox(imageSrc, dateText) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxDate = document.getElementById('lightboxDate');
    
    lightboxImage.src = imageSrc;
    lightboxDate.textContent = dateText || 'No date';
    lightbox.classList.add('active');
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // Re-enable scrolling
    document.body.style.overflow = '';
}

// Close lightbox when clicking outside image or on close button
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImage = document.getElementById('lightboxImage');
    
    // Close button
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Prevent closing when clicking the image itself
    lightboxImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// Move image to top
function moveImageToTop(imageName) {
    const index = images.indexOf(imageName);
    if (index > 0) {
        images.splice(index, 1);
        images.unshift(imageName);
        saveToLocalStorage();
        loadGallery();
    }
}

// Move image to bottom
function moveImageToBottom(imageName) {
    const index = images.indexOf(imageName);
    if (index !== -1 && index < images.length - 1) {
        images.splice(index, 1);
        images.push(imageName);
        saveToLocalStorage();
        loadGallery();
    }
}

// Create a gallery item
function createGalleryItem(imageName) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.draggable = true;
    item.dataset.image = imageName;
    
    const img = document.createElement('img');
    img.src = `img/${imageName}`;
    img.alt = imageName.replace(/\.(jpg|JPG|png)$/, '');
    img.loading = 'lazy';
    
    // Date overlay
    const dateOverlay = document.createElement('div');
    dateOverlay.className = 'date-overlay loading';
    dateOverlay.textContent = 'Loading...';
    
    // Extract EXIF data when image loads
    img.addEventListener('load', function() {
        extractExifDate(this, dateOverlay);
    });
    
    // If image is already cached and loaded
    if (img.complete) {
        extractExifDate(img, dateOverlay);
    }
    
    // Action buttons container
    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';
    
    // Move to top button
    const moveTopBtn = document.createElement('button');
    moveTopBtn.className = 'action-btn move-top-btn';
    moveTopBtn.innerHTML = '&#8593;'; // Up arrow
    moveTopBtn.title = 'Move to top';
    moveTopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveImageToTop(imageName);
    });
    
    // Move to bottom button
    const moveBottomBtn = document.createElement('button');
    moveBottomBtn.className = 'action-btn move-bottom-btn';
    moveBottomBtn.innerHTML = '&#8595;'; // Down arrow
    moveBottomBtn.title = 'Move to bottom';
    moveBottomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveImageToBottom(imageName);
    });
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.innerHTML = '&#215;'; // Multiplication sign (×)
    deleteBtn.title = 'Delete image';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this image?')) {
            deleteImage(imageName, item);
        }
    });
    
    // Add buttons to container
    actionButtons.appendChild(moveTopBtn);
    actionButtons.appendChild(moveBottomBtn);
    actionButtons.appendChild(deleteBtn);
    
    // Drag and drop events
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    
    // Click to open lightbox (but not when dragging or clicking action buttons)
    let isDragging = false;
    item.addEventListener('mousedown', () => {
        isDragging = false;
    });
    item.addEventListener('mousemove', () => {
        isDragging = true;
    });
    item.addEventListener('mouseup', (e) => {
        if (!isDragging && !e.target.closest('.action-btn')) {
            openLightbox(img.src, dateOverlay.textContent);
        }
        isDragging = false;
    });
    
    item.appendChild(img);
    item.appendChild(dateOverlay);
    item.appendChild(actionButtons);
    
    return item;
}

// Delete image
function deleteImage(imageName, itemElement) {
    deletedImages.push(imageName);
    images = images.filter(img => img !== imageName);
    itemElement.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        itemElement.remove();
        saveToLocalStorage();
    }, 300);
}

// Drag and drop handlers
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over class from all items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedItem) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedItem !== this) {
        // Get the image names
        const draggedImage = draggedItem.dataset.image;
        const targetImage = this.dataset.image;
        
        // Swap in the array
        const draggedIndex = images.indexOf(draggedImage);
        const targetIndex = images.indexOf(targetImage);
        
        images.splice(draggedIndex, 1);
        images.splice(targetIndex, 0, draggedImage);
        
        // Save and reload gallery
        saveToLocalStorage();
        loadGallery();
    }
    
    return false;
}

// Update photo count display
function updatePhotoCount() {
    const countElement = document.getElementById('photoCount');
    if (countElement) {
        const count = images.length;
        countElement.textContent = `${count} photo${count !== 1 ? 's' : ''}`;
    }
}

// Load images into the gallery
function loadGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    images.forEach(imageName => {
        const item = createGalleryItem(imageName);
        gallery.appendChild(item);
    });
    
    updatePhotoCount();
}

// Reset gallery to original state
function resetGallery() {
    if (confirm('Reset gallery to original state? This will restore all deleted images and reset the order.')) {
        localStorage.removeItem('galleryImages');
        localStorage.removeItem('deletedImages');
        images = [...allImages];
        deletedImages = [];
        loadGallery();
    }
}

// Export gallery settings to JSON
function exportGallerySettings() {
    const settings = {
        version: GALLERY_VERSION,
        exportDate: new Date().toISOString(),
        galleryImages: images,
        deletedImages: deletedImages,
        totalImages: allImages.length,
        visibleImages: images.length
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `gallery-settings-${dateStr}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Settings exported successfully!\n\nVisible photos: ${images.length}\nDeleted photos: ${deletedImages.length}`);
}

// Import gallery settings from JSON
function importGallerySettings(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            
            // Validate the settings
            if (!settings.galleryImages || !Array.isArray(settings.galleryImages)) {
                throw new Error('Invalid settings file format');
            }
            
            // Confirm import
            const message = `Import settings from ${new Date(settings.exportDate).toLocaleDateString()}?\n\n` +
                          `This will set:\n` +
                          `- ${settings.visibleImages} visible photos\n` +
                          `- ${settings.deletedImages?.length || 0} deleted photos\n\n` +
                          `Current settings will be overwritten.`;
            
            if (!confirm(message)) {
                return;
            }
            
            // Apply settings
            images = settings.galleryImages;
            deletedImages = settings.deletedImages || [];
            
            // Save to localStorage
            saveToLocalStorage();
            
            // Reload gallery
            loadGallery();
            
            alert('Settings imported successfully!');
            
        } catch (error) {
            alert(`Error importing settings: ${error.message}\n\nPlease make sure you're using a valid gallery settings file.`);
            console.error('Import error:', error);
        }
    };
    
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

// Load gallery when DOM is ready
document.addEventListener('DOMContentLoaded', initGallery);

// Optional: Add keyboard shortcut for reset (Ctrl+Shift+R)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        resetGallery();
    }
});


