#!/bin/bash

# This script is used to generate the background images for the app.
# It takes a directory as an argument and generates a grayscale image from the images in the directory.
# It then turns the grayscale image into a black (or white) transparent PNG.
# The output is saved as output-dark.png and output.png.
# Requirements: ImageMagick with WebP support (`sudo apt install imagemagick webp`)

IMAGE_DIR="${1:-.}"
TMP_DIR=$(mktemp -d)
trap "rm -rf $TMP_DIR" EXIT

echo "🔍 Searching for images in: $IMAGE_DIR"
IMAGES=($(find "$IMAGE_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \)))

if [ ${#IMAGES[@]} -eq 0 ]; then
  echo "❌ No image files found in $IMAGE_DIR"
  exit 1
fi

echo "📸 Found ${#IMAGES[@]} images:"
for img in "${IMAGES[@]}"; do
  echo "  - $(basename "$img")"
done

MAX_WIDTH=1920

# Step 2: Resize images and normalize backgrounds
echo "🔄 Step 2: Resizing and processing all images..."
RESIZED_IMAGES=()
TOTAL_HEIGHT=0

for IMG in "${IMAGES[@]}"; do
  echo "  Processing $(basename "$IMG")..."
  
  # Resize and normalize to get consistent backgrounds
  OUT="$TMP_DIR/$(basename "$IMG")"
  # Resize, convert to grayscale, and normalize to handle background variations
  magick "$IMG" -resize "${MAX_WIDTH}" -colorspace Gray -normalize -contrast-stretch 3,50% "$OUT"
  
  # Get the height of the resized image
  HEIGHT=$(magick identify -format "%h" "$OUT")
  TOTAL_HEIGHT=$((TOTAL_HEIGHT + HEIGHT))
  
  # Add to our list
  RESIZED_IMAGES+=("$OUT")
  echo "    ✅ Added: height $HEIGHT, total height now: $TOTAL_HEIGHT"
done

echo "  📊 Processing all ${#IMAGES[@]} images"
echo "  📐 Final stacked dimensions: ${MAX_WIDTH}x${TOTAL_HEIGHT}"

# Step 3: Stack vertically
echo "📚 Step 3: Stacking all ${#IMAGES[@]} images vertically..."
magick "${RESIZED_IMAGES[@]}" -append "$TMP_DIR/stacked.png"
echo "  Created stacked image: ${MAX_WIDTH}x${TOTAL_HEIGHT}"

# Step 4: Final normalization and output
echo "🎨 Step 4: Final normalization, contrast enhancement, and generating output..."
magick "$TMP_DIR/stacked.png" "$TMP_DIR/grayscale.png"

echo "✅ Successfully generated grayscale image using all ${#IMAGES[@]} images (${MAX_WIDTH}x${TOTAL_HEIGHT})"

# Step 5: Invert the grayscale image
echo "🔄 Step 5: Inverting grayscale image..."
magick "$TMP_DIR/grayscale.png" -negate "$TMP_DIR/grayscale-inverted.png"
echo "  ✅ Created inverted grayscale (temporary file)"

# Step 6: Apply inverted grayscale as alpha channel to white background
echo "🎨 Step 6: Creating white background with alpha channel..."
DIMENSIONS=$(magick identify -format "%wx%h" "$TMP_DIR/grayscale-inverted.png")
magick "$TMP_DIR/grayscale-inverted.png" -alpha copy -fill white -colorize 100% "output-dark.png"
echo "  ✅ Created white image with alpha: output-dark.png (${DIMENSIONS})"

# Step 7: Apply inverted grayscale as alpha channel to black background
echo "🎨 Step 7: Creating black background with alpha channel..."
magick "$TMP_DIR/grayscale-inverted.png" -alpha copy -fill black -colorize 100% "output.png"
echo "  ✅ Created black image with alpha: output.png (${DIMENSIONS})"

echo "🎉 Final outputs:"
echo "  📄 output-dark.png - White background with alpha channel (${DIMENSIONS})"
echo "  📄 output.png - Black background with alpha channel (${DIMENSIONS})"
