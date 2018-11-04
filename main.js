/**
 * Created by PhpStorm.
 * User: danielpfeffer
 * Date: 03.11.18
 * Time: 15:50
 */

const {app, BrowserWindow} = require('electron');

let win;

function createWindow() {

    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#fff'
    });


    win.loadURL(`file://${__dirname}/dist/angular/index.html`);

    // devTolls
    // win.webContents.openDevTools()

    // Window close event
    win.on('closed', function () {
        win = null
    })
}

app.on('ready', createWindow);


app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (win === null) {
        createWindow()
    }
});