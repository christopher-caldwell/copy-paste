#!/bin/sh

npm run build --prefix src/

# Clear the old build
rm -rf build/
mkdir build/

cp manifest.json ./build/
cp -r src/dist/ ./build/
cp -r images/ ./build/