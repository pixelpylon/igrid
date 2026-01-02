// List of all images in the img folder
const allImages = [
    'andruha.jpg', 'aschool.jpg', 'ata1.jpg', 'ata2.JPG', 'baku1.JPG', 'baku2.JPG',
    'balcony.JPG', 'bk.jpg', 'bkapt2.jpg', 'bkapt3.jpg', 'blocks.JPG', 'blocks2.JPG',
    'bob.jpg', 'bob1.jpg', 'bob2.jpg', 'bob3.jpg', 'bob5.jpg', 'bob6.jpg',
    'booklynapartment.JPG', 'brighton1.JPG', 'brighton2.JPG', 'brkapt1.jpg',
    'bro-ibo.jpg', 'bro-lesha.JPG', 'broadway.JPG', 'bubba.JPG', 'bubba2.JPG',
    'build2.JPG', 'build3.JPG', 'build5.JPG', 'buildings1.JPG', 'burger.JPG',
    'canada1.jpg', 'carplate1.jpg', 'centr1.JPG', 'chris.JPG', 'crew.jpg', 'crew.png',
    'dada.jpg', 'daniela.jpg', 'dashuta.jpg', 'dedaena2015.jpg', 'dimon.JPG',
    'dimon2.JPG', 'doc1.jpg', 'edik2.jpg', 'egorik.jpg', 'emilka.jpg',
    'empirestate.jpg', 'estunina.jpg', 'fallout.jpg', 'fallout4.jpg',
    'family-niagara.jpg', 'family.jpg', 'food.jpg', 'gatsko.jpg', 'girls.JPG',
    'graduated.JPG', 'graduation2.JPG', 'grandparents.JPG', 'gransk2006.jpg',
    'gudauri.jpg', 'gudauri2015.jpg', 'gudauri22.jpg', 'hamster.JPG', 'horse1.JPG',
    'jenek1.JPG', 'kikodze1.jpg', 'kostya1.jpg', 'land.jpg', 'land2.JPG',
    'laundry1.JPG', 'leila.JPG', 'lelka2.JPG', 'lift.jpg', 'liza.JPG', 'liza1.JPG',
    'liza2.JPG', 'liza3.JPG', 'london2014.jpg', 'mama.JPG', 'marneuli.jpg',
    'minsk.JPG', 'minsk11.jpg', 'minsk111.jpg', 'minsk16-2.jpg', 'minsk16.jpg',
    'naughton1.jpg', 'naughton2.jpg', 'niagara.jpg', 'niagara2.jpg', 'nyc.JPG',
    'nyc12.JPG', 'nyc2006.JPG', 'nyc2022.jpg', 'nyccy.JPG', 'nycha.JPG', 'nyu.JPG',
    'nyu1.JPG', 'nyu2.JPG', 'nyu2012.jpg', 'nyu6.jpg', 'nyurker.jpg', 'ocean2.JPG',
    'oceanave.JPG', 'paris2022.jpg', 'pimpmyride.jpg', 'plate2.jpg', 'plate3.jpg',
    'plates10.jpg', 'plates4.jpg', 'plates7.jpg', 'plates8.jpg', 'porter.jpg',
    'prague2012.jpg', 'profile.JPG', 'pudge.JPG', 'raion.jpg', 'ratka4.jpg',
    'rocknroll.JPG', 'rodeo.png', 'saettl.jpg', 'sandy.JPG', 'sandy1.JPG',
    'sandy2.JPG', 'sandy2012.JPG', 'sea1.JPG', 'shitter.jpg', 'si1.jpg', 'snacks.JPG',
    'soho1.JPG', 'soho2.JPG', 'soho3.JPG', 'soho4.JPG', 'soho5.JPG', 'sohoap1.JPG',
    'staten.JPG', 'staten1.JPG', 'staten2.jpg', 'staten3.JPG', 'statenzo.jpg',
    'statenzoo1.jpg', 'sundara1.JPG', 'svetka.jpg', 'svetka2.jpg', 'svetka3.JPG',
    'svetka5.JPG', 'timesq.JPG', 'timesquare2006.jpg', 'toronto.jpg', 'toronto1.jpg',
    'toronto2.jpg', 'toronto3.jpg', 'toronto4.jpg', 'toronto6.jpg', 'toronto7.jpg',
    'toronto9.jpg', 'torontoapt.jpg', 'tubik.jpg', 'tubik2.JPG', 'tubik3.JPG',
    'zavorina.jpg', 'zhorik.jpg', 'zhorik2.jpg'
];

// Load images and deleted images from localStorage
let images = JSON.parse(localStorage.getItem('galleryImages')) || [...allImages];
let deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];

// Filter out deleted images
images = images.filter(img => !deletedImages.includes(img));

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('galleryImages', JSON.stringify(images));
    localStorage.setItem('deletedImages', JSON.stringify(deletedImages));
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
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.title = 'Delete image';
    
    // Delete functionality
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this image?')) {
            deleteImage(imageName, item);
        }
    });
    
    // Drag and drop events
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    
    item.appendChild(img);
    item.appendChild(deleteBtn);
    
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

// Load images into the gallery
function loadGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    images.forEach(imageName => {
        const item = createGalleryItem(imageName);
        gallery.appendChild(item);
    });
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

