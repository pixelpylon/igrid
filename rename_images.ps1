# PowerShell script to rename images based on EXIF date
# Requires: Windows PowerShell 5.1 or later

$imgFolder = "img"
$backupFolder = "img_backup"

function Get-ExifDate {
    param([string]$imagePath)
    
    try {
        # Load System.Drawing assembly
        Add-Type -AssemblyName System.Drawing
        
        $image = [System.Drawing.Image]::FromFile($imagePath)
        
        # Property ID for DateTimeOriginal (36867) or DateTime (306)
        $dateIds = @(36867, 306, 36868)
        
        foreach ($id in $dateIds) {
            try {
                $propertyItem = $image.GetPropertyItem($id)
                $dateString = [System.Text.Encoding]::ASCII.GetString($propertyItem.Value).TrimEnd([char]0)
                
                # Parse EXIF date format: "YYYY:MM:DD HH:MM:SS"
                if ($dateString -match '(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})') {
                    $date = Get-Date -Year $matches[1] -Month $matches[2] -Day $matches[3] `
                                     -Hour $matches[4] -Minute $matches[5] -Second $matches[6]
                    $image.Dispose()
                    return $date
                }
            }
            catch {
                continue
            }
        }
        
        $image.Dispose()
        return $null
    }
    catch {
        Write-Host "Error reading EXIF from $imagePath : $_" -ForegroundColor Yellow
        return $null
    }
}

function Get-NewFilename {
    param(
        [AllowNull()]
        [DateTime]$date,
        [string]$extension,
        [System.Collections.Generic.HashSet[string]]$existingNames,
        [int]$counter = 0
    )
    
    if ($date) {
        $baseName = $date.ToString("yyyy-MM-dd_HHmmss")
        if ($counter -gt 0) {
            $newName = "${baseName}_${counter}${extension}"
        } else {
            $newName = "${baseName}${extension}"
        }
    }
    else {
        if ($counter -gt 0) {
            $newName = "no-date_${counter}${extension}"
        } else {
            $newName = "no-date${extension}"
        }
    }
    
    if ($existingNames.Contains($newName)) {
        return Get-NewFilename -date $date -extension $extension -existingNames $existingNames -counter ($counter + 1)
    }
    
    return $newName
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Image Renamer - Rename by EXIF Date" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check if img folder exists
if (-not (Test-Path $imgFolder)) {
    Write-Host "Error: '$imgFolder' folder not found!" -ForegroundColor Red
    exit 1
}

# Get all image files
$imageFiles = Get-ChildItem -Path $imgFolder -File | Where-Object { 
    $_.Extension -match '\.(jpg|jpeg|png)$' 
}

if ($imageFiles.Count -eq 0) {
    Write-Host "No images found in '$imgFolder' folder!" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($imageFiles.Count) images" -ForegroundColor Green
Write-Host "------------------------------------------------------------"

# Ask for backup (skip if running non-interactively)
try {
    $response = Read-Host "Create backup before renaming? (recommended) (y/n)"
    if ($response -eq 'y') {
        if (Test-Path $backupFolder) {
            Write-Host "Backup folder '$backupFolder' already exists." -ForegroundColor Yellow
            $continue = Read-Host "Continue without new backup? (y/n)"
            if ($continue -ne 'y') {
                exit 0
            }
        }
        else {
            Write-Host "Creating backup in '$backupFolder'..." -ForegroundColor Yellow
            Copy-Item -Path $imgFolder -Destination $backupFolder -Recurse
            Write-Host "Backup created successfully!" -ForegroundColor Green
        }
    }
}
catch {
    Write-Host "Running in non-interactive mode. Skipping backup." -ForegroundColor Yellow
}

# Process each image
$renameMap = @{}
$existingNames = New-Object System.Collections.Generic.HashSet[string]
$noDateCount = 0

foreach ($file in ($imageFiles | Sort-Object Name)) {
    $oldPath = $file.FullName
    $extension = $file.Extension.ToLower()
    
    # Get EXIF date
    $date = Get-ExifDate -imagePath $oldPath
    
    if (-not $date) {
        $noDateCount++
    }
    
    # Create new filename
    $newFilename = Get-NewFilename -date $date -extension $extension -existingNames $existingNames
    [void]$existingNames.Add($newFilename)
    
    $renameMap[$file.Name] = $newFilename
    
    $dateStr = if ($date) { $date.ToString("yyyy-MM-dd HH:mm:ss") } else { "No EXIF date" }
    Write-Host ("{0,-30} -> {1,-30} ({2})" -f $file.Name, $newFilename, $dateStr)
}

Write-Host "------------------------------------------------------------"
Write-Host "Images with EXIF date: $($imageFiles.Count - $noDateCount)" -ForegroundColor Green
Write-Host "Images without date: $noDateCount" -ForegroundColor Yellow
Write-Host ""

# Confirm rename (skip if running non-interactively)
try {
    $response = Read-Host "Proceed with renaming? (y/n)"
    if ($response -ne 'y') {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit 0
    }
}
catch {
    Write-Host "Auto-confirming in non-interactive mode..." -ForegroundColor Yellow
}

# Perform rename
Write-Host "`nRenaming files..." -ForegroundColor Yellow
$successCount = 0

foreach ($oldName in $renameMap.Keys) {
    $newName = $renameMap[$oldName]
    
    if ($oldName -eq $newName) {
        continue
    }
    
    $oldPath = Join-Path $imgFolder $oldName
    $newPath = Join-Path $imgFolder $newName
    
    try {
        Rename-Item -Path $oldPath -NewName $newName -ErrorAction Stop
        $successCount++
    }
    catch {
        Write-Host "Error renaming $oldName : $_" -ForegroundColor Red
    }
}

Write-Host "`nSuccess! Renamed $successCount files." -ForegroundColor Green

# Update script.js
try {
    $updateScript = Read-Host "`nUpdate script.js with new filenames? (y/n)"
}
catch {
    $updateScript = 'y'  # Auto-update in non-interactive mode
}

if ($updateScript -eq 'y') {
    $scriptPath = "script.js"
    
    if (-not (Test-Path $scriptPath)) {
        Write-Host "Warning: $scriptPath not found. Skipping update." -ForegroundColor Yellow
    }
    else {
        $content = Get-Content $scriptPath -Raw
        
        # Sort filenames (newest first)
        $sortedNames = $renameMap.Values | Sort-Object -Descending
        
        # Create new array string
        $formattedNames = @()
        $i = 0
        foreach ($name in $sortedNames) {
            if (($i % 6 -eq 0) -and ($i -gt 0)) {
                $formattedNames += "`n    "
            }
            $formattedNames += "'$name'"
            $i++
        }
        
        $newArray = "const allImages = [`n    " + ($formattedNames -join ', ') + "`n];"
        
        # Replace the allImages array
        $content = $content -replace "const allImages = \[[^\]]*\];", $newArray
        
        Set-Content -Path $scriptPath -Value $content -Encoding UTF8
        Write-Host "Updated $scriptPath successfully!" -ForegroundColor Green
    }
}

Write-Host "`nDone!" -ForegroundColor Cyan

