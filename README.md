# Folder structure
background script is placed under /public/background.js folder

content script is placed under /public/content.js folder

manifest.json is placed under /public/manifest.json folder

# How to run?
npm run build generates dist folder

dist folder contains manisfest, background.js & content.js in same structure (index.html inside dist folder is from react app)

load the dist folder in the chrome extension
