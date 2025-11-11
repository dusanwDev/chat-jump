#!/bin/bash

echo "========================================"
echo "ChatGPT Quick Switch - Package for Distribution"
echo "========================================"
echo ""

VERSION="1.0.0"
OUTPUT="chatgpt-quick-switch-v${VERSION}.zip"

echo "Creating distribution package: ${OUTPUT}"
echo ""

echo "Checking for required files..."
echo ""

# Check required files
REQUIRED_FILES=("manifest.json" "content.js" "styles.css")
ICON_FILES=("icon16.png" "icon48.png" "icon128.png")
OPTIONAL_FILES=("README.md" "LICENSE")

MISSING_REQUIRED=0

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "[OK] $file"
    else
        echo "[ERROR] $file not found!"
        MISSING_REQUIRED=1
    fi
done

for file in "${ICON_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "[OK] $file"
    else
        echo "[WARNING] $file not found!"
    fi
done

if [ $MISSING_REQUIRED -eq 1 ]; then
    echo ""
    echo "ERROR: Missing required files!"
    echo "Cannot create package."
    exit 1
fi

echo ""
echo "Creating ZIP file..."
echo ""

# Remove old zip if exists
if [ -f "$OUTPUT" ]; then
    rm "$OUTPUT"
    echo "Removed old package"
fi

# Create new zip with required files
FILES_TO_ZIP="manifest.json content.js styles.css"

# Add icon files if they exist
for file in "${ICON_FILES[@]}"; do
    if [ -f "$file" ]; then
        FILES_TO_ZIP="$FILES_TO_ZIP $file"
    fi
done

# Add optional files if they exist
for file in "${OPTIONAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        FILES_TO_ZIP="$FILES_TO_ZIP $file"
    fi
done

zip -r "$OUTPUT" $FILES_TO_ZIP

echo ""
echo "========================================"
echo "Package created successfully!"
echo "========================================"
echo ""
echo "File: $OUTPUT"
echo ""
echo "Next steps:"
echo "1. Test the ZIP file by extracting and loading as unpacked extension"
echo "2. Go to https://chrome.google.com/webstore/devconsole"
echo "3. Click 'New Item'"
echo "4. Upload $OUTPUT"
echo "5. Fill out the store listing (see STORE_LISTING.md)"
echo "6. Submit for review"
echo ""
echo "Important:"
echo "- Make sure you have a privacy policy URL"
echo "- Take screenshots before submitting"
echo "- Test thoroughly before publishing"
echo ""
