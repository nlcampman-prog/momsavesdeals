#!/bin/bash
set -e
echo "🌸 Mom Saves Deals — Build & Deploy"
echo "===================================="
cd "$(dirname "$0")"
npm install --silent
npm run build
echo "✅ Build complete! Site output: $(pwd)/dist/"
echo "   Preview: npx http-server dist/ --port 3000 --host 0.0.0.0"