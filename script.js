// List of all images in the img folder
const allImages = [
    '2025-12-06_162220.jpg', '2025-11.JPG', '2025-10.JPG', '2025-09-28_162430.jpg',
    '2025-09-28.JPG', '2025-09-20_141730.jpg', '2025-08-10_200125.jpg', '2025-08.JPG',
    '2025-05-24_185642.jpg', '2025-05-04_164210.jpg', '2025-05.JPG', '2025-04.JPG',
    '20250-05-09.JPG', '2025.JPG', '2024-12.JPG', '2024-10.JPG',
    '2024-06-09_095331.jpg', '2024.JPG', '2023-12.JPG', '2022-10-10_010818.jpg',
    '2022-09-16_140749.jpg', '2022-09-01.jpg', '2022-09.jpg', '2022-03-15_151759.jpg',
    '2022-01-01.jpg', '2022-01.jpg', '2020-03-29_130125.jpg', '2019-1.jpg',
    '2019-09-15_104124.jpg', '2019-09-09_132026.jpg', '2019-08-24_151245.jpg', '2019-03-24_011241.jpg',
    '2019.jpg', '2018-11-04_141341.jpg', '2018-10-24_095008.jpg', '2018-09-25_181335.jpg',
    '2018-09-16_144751.jpg', '2018-09-16_141614.jpg', '2018-09-08_151806.jpg', '2018-07-27_121120.jpg',
    '2018-03-03_114742.jpg', '2018-02-06_205335.jpg', '2018.jpg', '2017-07-29_172703.jpg',
    '2017-06-16_152329.jpg', '2017-05-04_152657.jpg', '2016-09-24_221638.jpg', '2016-09-24_221630.jpg',
    '2016-09-19_085805.jpg', '2016-09-09_233830.jpg', '2016-08-20_212804.jpg', '2016-08-20_183315.jpg',
    '2016-08-20_152935.jpg', '2016-08-17_193741.jpg', '2016-08-11_124500.jpg', '2016-07-25_194336.jpg',
    '2016-05.jpg', '2016-04-20_180859.jpg', '2016-04-07_112017.jpg', '2016-02-16_144729.jpg',
    '2016-01-05_141433.jpg', '2016-01-05_141426.jpg', '2015-12-29_085901.jpg', '2015-12-27_172408.jpg',
    '2015-12-27_161021.jpg', '2015-12-04_013130.jpg', '2015-11-16_133725.jpg', '2015-08-19_144609.jpg',
    '2015-08-19_144453.jpg', '2015-08-07_151951.jpg', '2015-06-12_181648.jpg', '2015-06-10_193819.jpg',
    '2015-06-05_091151.jpg', '2015-06-05_091036.jpg', '2015-05-18_220308.jpg', '2015-05-18_215024.jpg',
    '2015-05-18_214421.jpg', '2015-01-11_124034.jpg', '2015.jpg', '2014-10-12_022526.jpg',
    '2014-09-07_221304.jpg', '2014-08-15_000046.jpg', '2014-07.JPG', '2014.JPG',
    '2013-02-17_134142.jpg', '2013-02-17_134124.jpg', '2013-02-15_185052.jpg', '2013-02-15_185038.jpg',
    '2013-02-15_184643.jpg', '2013-02-15_181427.jpg', '2013-02-15_174650.jpg', '2013-02-15_174452.jpg',
    '2013-02-15_150129.jpg', '2013-02-08_165658.jpg', '2012-11-04_015557.jpg', '2012-10-31_035652.jpg',
    '2012-10-30_114904.jpg', '2012-10-30_112635.jpg', '2012-10-04_005419.jpg', '2012-10.JPG',
    '2012-08-12_201055.jpg', '2012-08-06_202330.jpg', '2012-07-27_154640.jpg', '2012-07.JPG',
    '2011-08.JPG', '2011-07-25_222113.jpg', '2011-07-12_005913.jpg', '2011-07-11_021613.jpg',
    '2011-06-11_235038.jpg', '2011-06-01.JPG', '2011-06.JPG', '2011-05-30_164517.jpg',
    '2011-05-28_165503.jpg', '2011-05-28_165434.jpg', '2011-05-11_221524.jpg', '2011-05-02_074923.jpg',
    '2011-05-02_074852.jpg', '2011-01.jpg', '2011.jpg', '2010-12-27_192720.jpg',
    '2010-12-06_210756.jpg', '2010-1.jpg', '2010-09-20_043247.jpg', '2010-09.JPG',
    '2010-02.jpg', '2009-01.jpg', '2008-03-28_110007.jpg', '2008-03-26_120244.jpg',
    '2008-03-02_103333.jpg', '2008-02-26_135015.jpg', '2008-02-26_134534.jpg', '2008.JPG',
    '2007-12-29_122051.jpg', '2007-10-04_004933.jpg', '2007-10-02_075612.jpg', '2007-10-02_005722.jpg',
    '2007-06-08_152458.jpg', '2007-01.jpg', '2007.jpg', '2006-09.jpg',
    '2006-08-24_150030.jpg', '2006-08-24_145014.jpg', '2006-08.jpg', '2006-07-25_213136.jpg',
    '2006-07-25_033302.jpg', '2006-06-30_172736.jpg', '2006-06-11_200757.jpg', '2006-05-19.JPG',
    '2006-05-17.JPG', '2006-05-16.JPG', '2006-05-15-6.JPG', '2006-05-15-4.JPG',
    '2006-05-15-3.jpg', '2006-05-15-2.JPG', '2006-05-15-1.JPG', '2006-05-15.JPG',
    '2006-05.JPG', '2006.JPG', '2005-12-03_122946.jpg', '2005-10-10_100413.jpg',
    '2005-08-17_043922.jpg', '2005-05-01.jpeg', '2005-01.png', '2004-10-30_112439.jpg',
    '2003-08.JPG', '2000-02-05_072009.jpg', '1992-07-21_163823.jpg'
];

// Gallery version - increment this when allImages changes
const GALLERY_VERSION = 6;

// Load images and deleted images from localStorage
let storedVersion = parseInt(localStorage.getItem('galleryVersion')) || 1;
let images, deletedImages;

// If version changed, reset to default (after rename)
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
    moveTopBtn.innerHTML = 'â†‘';
    moveTopBtn.title = 'Move to top';
    moveTopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveImageToTop(imageName);
    });
    
    // Move to bottom button
    const moveBottomBtn = document.createElement('button');
    moveBottomBtn.className = 'action-btn move-bottom-btn';
    moveBottomBtn.innerHTML = 'â†“';
    moveBottomBtn.title = 'Move to bottom';
    moveBottomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveImageToBottom(imageName);
    });
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.innerHTML = 'Ã—';
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

// Load gallery when DOM is ready
document.addEventListener('DOMContentLoaded', loadGallery);

// Optional: Add keyboard shortcut for reset (Ctrl+Shift+R)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        resetGallery();
    }
});


