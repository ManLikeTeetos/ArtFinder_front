#!/bin/bash

# Define the source and destination directories
SOURCE_DIR="./build/"
DESTINATION_DIR="/home2/artfinde/public_html/"

# Create the destination directory if it doesn't exist
mkdir -p $DESTINATION_DIR

# Copy the build files (excluding source code) to the destination directory
rsync -av --exclude='src/' --exclude='node_modules/' $SOURCE_DIR $DESTINATION_DIR
