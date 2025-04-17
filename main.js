const { app, BrowserWindow, ipcMain } = require('electron/main');
require('@electron/remote/main').initialize();

const VERSION = "1.0.0";

app.setAboutPanelOptions({
    version: VERSION
});

global.baseWindowOptions = {
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    backgroundColor: "#222",
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
}

function createWindow() {
    global.win = new BrowserWindow({
        ...baseWindowOptions,
        width: 400,
        height: 600,
        show: false,
        title: "Kaviot"
    });

    win.loadFile('home/index.html');

    win.on('ready-to-show', () => {
        win.show();
    });
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('about', () => {
    if (!global.win) return;
    let w = global.win;
    w.hide();

    global.win = new BrowserWindow({
        ...baseWindowOptions,
        width: 400,
        height: 500,
        show: false,
        title: "About Kaviot"
    });

    win.loadFile('about/index.html');

    win.on('close', () => {
        let w = win;
        w.hide();
        createWindow();
        w.close();
    });

    w.close();
});

ipcMain.on('encoder', () => {
    if (!global.win) return;
    let w = global.win;
    w.hide();

    global.win = new BrowserWindow({
        ...baseWindowOptions,
        width: 400,
        height: 500,
        show: false,
        title: "Kaviot Encoder"
    });

    win.loadFile('encoder/index.html');
    require("@electron/remote/main").enable(win.webContents);

    win.on('close', () => {
        let w = win;
        w.hide();
        createWindow();
        w.close();
    });

    w.close();
});

ipcMain.handle('system', () => {
    return {
        version: VERSION ?? app.getVersion()
    }
});

ipcMain.on('show', () => {
    win.show();
});