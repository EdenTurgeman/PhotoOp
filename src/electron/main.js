const {app, BrowserWindow} = require('electron');
require('./exif-events');

let win;

function createWindow() {
    win = new BrowserWindow({width: 450, height: 450, frame: false});
    win.setMenuBarVisibility(false);

    win.loadURL('http://localhost:3000');

    win.webContents.openDevTools()

    win.on('closed', () => {win = null})
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

