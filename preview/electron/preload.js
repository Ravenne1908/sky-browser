// Sandboxed preload: the only bridge between the Sky UI page and Electron.
// NOTE: no __dirname here — sandboxed preloads don't provide it; the start
// page URL is derived in the renderer from window.location instead.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('sky', {
  // main.js forwards links that must open as a new tab in the UI.
  onOpenTab (callback) {
    ipcRenderer.on('sky:new-tab', (_event, url) => callback(url))
  }
})
