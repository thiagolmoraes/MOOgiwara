#!/bin/sh
set -e

# Ensure node_modules exists and dependencies are installed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/tsx" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Execute the command passed to the entrypoint
exec "$@"

