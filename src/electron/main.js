const {app, BrowserWindow} = require('electron');
const {join} = require('path');
require('./exif-events');

let win;

function createWindow() {
    const isDev = !app.isPackaged;
    win = new BrowserWindow(
        {
            width: 450,
            height: 450,
            minHeight: 450,
            minWidth: 450,
            maxHeight: 650,
            maxWidth: 650,
            frame: false,
            webPreferences: {
                nodeIntegration: false,
                preload: __dirname + '/preload.js'
            }
        });

    win.loadURL(isDev ? 'http://localhost:3000' : join(__dirname, '../../build/index.html'));

    win.setMenuBarVisibility(false);

    if (isDev) {
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});