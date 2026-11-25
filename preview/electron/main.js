// Sky Browser - UI PROTOTYPE (Electron). This is NOT the Firefox-based build.
// It exists to try the interface while the real fork matures - see preview/README.md.
const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWin = null

function createWindow () {
  mainWin = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 560,
    backgroundColor: '#0b2d5c',
    title: 'Sky Browser',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  mainWin.removeMenu()
  mainWin.loadFile('index.html')
  mainWin.webContents.on('did-finish-load', () => console.log('SKY_READY'))
  mainWin.on('closed', () => { mainWin = null })
}

// Links with target="_blank" open as new TABS in the Sky UI instead of popups.
app.on('web-contents-created', (_event, contents) => {
  if (contents.getType() === 'webview' && mainWin && !mainWin.isDestroyed()) {
    contents.setWindowOpenHandler(({ url }) => {
      mainWin.webContents.send('sky:new-tab', url)
      return { action: 'deny' }
    })
  }
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
