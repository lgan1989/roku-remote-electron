'use strict';
const electron = require('electron');
const {ipcMain} = require('electron');
const {Client} = require('node-ssdp');


const client = new Client();
const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 1000,
		height: 600,
    resizable: false
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
  const keys = ['Up', 'Down', 'Left', 'Right', 'Backspace', 'Esc', 'Enter'];
  keys.map( key => {
    electron.globalShortcut.register(key, () => {
      mainWindow.webContents.send('key-pressed', key);
    })
  } );
});

ipcMain.on('scan-device', (event, arg) => {
  const deviceList = client.search('ssdp:all');
  client.on('response', (headers, statusCode, rinfo) => {
    let ipAddress = /(\d+.*:8060)(?=\/)/.exec(headers.LOCATION)
    if (!!~headers.SERVER.search(/Roku/) && ipAddress) {
      event.sender.send('device-found', ipAddress[0]);
    }
  });
});
