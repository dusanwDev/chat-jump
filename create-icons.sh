#!/bin/bash

# Script to create simple placeholder icons for the Chrome extension
# Requires ImageMagick to be installed

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed."
    echo "Please install it with: sudo apt-get install imagemagick"
    echo ""
    echo "Alternatively, you can:"
    echo "1. Create icons manually (16x16, 48x48, 128x128 PNG files)"
    echo "2. Use an online icon generator"
    echo "3. Temporarily remove the 'icons' section from manifest.json"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p icons

# Create a simple blue icon with arrows
for size in 16 48 128; do
    convert -size ${size}x${size} xc:'#007AFF' \
            -gravity center \
            -fill white \
            -font Arial-Bold \
            -pointsize $((size / 2)) \
            -annotate +0+0 "⇅" \
            icon${size}.png
    echo "Created icon${size}.png"
done

echo ""
echo "Icons created successfully!"
echo "You can now load the extension in Chrome."
