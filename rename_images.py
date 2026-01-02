#!/usr/bin/env python3
"""
Rename images based on EXIF creation date
Format: YYYY-MM-DD_HHMMSS.ext
Images without EXIF data will be prefixed with 'no-date_'
"""

import os
import sys
from PIL import Image
from PIL.ExifTags import TAGS
from datetime import datetime
import shutil

# Configuration
IMG_FOLDER = 'img'
BACKUP_FOLDER = 'img_backup'

def get_exif_date(image_path):
    """Extract creation date from EXIF data"""
    try:
        image = Image.open(image_path)
        exif_data = image._getexif()
        
        if not exif_data:
            return None
        
        # Look for DateTimeOriginal, DateTime, or DateTimeDigitized
        for tag_id, value in exif_data.items():
            tag = TAGS.get(tag_id, tag_id)
            if tag in ['DateTimeOriginal', 'DateTime', 'DateTimeDigitized']:
                # Parse EXIF date format: "YYYY:MM:DD HH:MM:SS"
                try:
                    date_obj = datetime.strptime(value, '%Y:%m:%d %H:%M:%S')
                    return date_obj
                except:
                    continue
        
        return None
    except Exception as e:
        print(f"Error reading EXIF from {image_path}: {e}")
        return None

def create_new_filename(date_obj, extension, existing_names, counter=0):
    """Create new filename from date, handle duplicates"""
    if date_obj:
        base_name = date_obj.strftime('%Y-%m-%d_%H%M%S')
        if counter > 0:
            new_name = f"{base_name}_{counter}{extension}"
        else:
            new_name = f"{base_name}{extension}"
    else:
        # No EXIF date found
        if counter > 0:
            new_name = f"no-date_{counter}{extension}"
        else:
            new_name = f"no-date{extension}"
    
    # Check for duplicates
    if new_name in existing_names:
        return create_new_filename(date_obj, extension, existing_names, counter + 1)
    
    return new_name

def backup_images():
    """Create backup of img folder"""
    if os.path.exists(BACKUP_FOLDER):
        print(f"Backup folder '{BACKUP_FOLDER}' already exists. Skipping backup.")
        response = input("Continue without new backup? (y/n): ")
        if response.lower() != 'y':
            sys.exit(0)
    else:
        print(f"Creating backup in '{BACKUP_FOLDER}'...")
        shutil.copytree(IMG_FOLDER, BACKUP_FOLDER)
        print("Backup created successfully!")

def rename_images():
    """Main function to rename all images"""
    if not os.path.exists(IMG_FOLDER):
        print(f"Error: '{IMG_FOLDER}' folder not found!")
        sys.exit(1)
    
    # Get all image files
    image_extensions = ('.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG')
    image_files = [f for f in os.listdir(IMG_FOLDER) 
                   if f.lower().endswith(image_extensions)]
    
    if not image_files:
        print(f"No images found in '{IMG_FOLDER}' folder!")
        sys.exit(1)
    
    print(f"Found {len(image_files)} images")
    print("-" * 60)
    
    # Ask for confirmation
    response = input("Create backup before renaming? (recommended) (y/n): ")
    if response.lower() == 'y':
        backup_images()
    
    # Process each image
    rename_map = {}
    existing_names = set()
    no_date_count = 0
    success_count = 0
    
    for filename in sorted(image_files):
        old_path = os.path.join(IMG_FOLDER, filename)
        extension = os.path.splitext(filename)[1].lower()
        
        # Get EXIF date
        date_obj = get_exif_date(old_path)
        
        if not date_obj:
            no_date_count += 1
        
        # Create new filename
        new_filename = create_new_filename(date_obj, extension, existing_names)
        existing_names.add(new_filename)
        
        # Store mapping
        rename_map[filename] = new_filename
        
        date_str = date_obj.strftime('%Y-%m-%d %H:%M:%S') if date_obj else 'No EXIF date'
        print(f"{filename:30} -> {new_filename:30} ({date_str})")
    
    print("-" * 60)
    print(f"Images with EXIF date: {len(image_files) - no_date_count}")
    print(f"Images without date: {no_date_count}")
    print()
    
    # Confirm rename
    response = input("Proceed with renaming? (y/n): ")
    if response.lower() != 'y':
        print("Cancelled.")
        sys.exit(0)
    
    # Perform rename
    print("\nRenaming files...")
    for old_name, new_name in rename_map.items():
        if old_name == new_name:
            continue
            
        old_path = os.path.join(IMG_FOLDER, old_name)
        new_path = os.path.join(IMG_FOLDER, new_name)
        
        try:
            os.rename(old_path, new_path)
            success_count += 1
        except Exception as e:
            print(f"Error renaming {old_name}: {e}")
    
    print(f"\nSuccess! Renamed {success_count} files.")
    
    # Update script.js
    update_script = input("\nUpdate script.js with new filenames? (y/n): ")
    if update_script.lower() == 'y':
        update_script_js(list(rename_map.values()))

def update_script_js(new_filenames):
    """Update script.js with new image filenames"""
    script_path = 'script.js'
    
    if not os.path.exists(script_path):
        print(f"Warning: {script_path} not found. Skipping update.")
        return
    
    # Read current script
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Sort filenames
    sorted_filenames = sorted(new_filenames, reverse=True)  # Newest first
    
    # Create new array string
    formatted_names = []
    for i, name in enumerate(sorted_filenames):
        if i % 6 == 0 and i > 0:
            formatted_names.append('\n    ')
        formatted_names.append(f"'{name}'")
    
    new_array = 'const allImages = [\n    ' + ', '.join(formatted_names) + '\n];'
    
    # Replace the allImages array
    import re
    pattern = r'const allImages = \[[\s\S]*?\];'
    new_content = re.sub(pattern, new_array, content)
    
    # Write back
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {script_path} successfully!")

if __name__ == '__main__':
    print("=" * 60)
    print("Image Renamer - Rename by EXIF Date")
    print("=" * 60)
    print()
    
    try:
        rename_images()
    except KeyboardInterrupt:
        print("\n\nCancelled by user.")
        sys.exit(0)

