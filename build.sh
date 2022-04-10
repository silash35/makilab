#!/bin/bash

if [ -z PROCFILE ]; then
  echo "PROCFILE is not set. Running build in all packages."
  pnpm -r build
else
  postf="/Procfile"
  BUILD_DIR="${PROCFILE%$postf}"

  echo "PROCFILE is set. Running build in $BUILD_DIR."
  cd $BUILD_DIR
  pnpm build
fi