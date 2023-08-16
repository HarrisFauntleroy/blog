#!/bin/bash

# Get the image name from the first argument
img=$1
# Check if the size argument is provided
if [ $# -eq 2 ]; then
    size=$2
    # New filename with size
    newFilename="${img%.*}_${size}.png"
    # Convert the image to the new size
    convert "$img" -resize $size "$newFilename"
else
    # If no size provided then retain the same filename but convert to png
    newFilename="${img%.*}.png"
    convert "$img" "$newFilename"
fi

# Optimize the image
optipng "$newFilename"

# Usage example: ./resize-image.sh ../public/posts/old-image.png 1080x1920
# Output: old-image_1080x1920.png
