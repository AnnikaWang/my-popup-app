const { app, BrowserWindow, screen, ipcMain, shell } = require('electron'); // Restored and combined your top imports
const path = require('path');

let popupWindow;

function createPopup() {
    // 1. Get the primary display size to accurately position the popup
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const popupWidth = 380;
    const popupHeight = 480;

    // 2. Configure true desktop popup behaviors
    popupWindow = new BrowserWindow({
        width: popupWidth,
        height: popupHeight,
        frame: false,             // Removes OS window borders
        transparent: true,        // Allows the CSS custom borders to stand out
        resizable: false,         // Locks size for a pixel-perfect popup layout
        alwaysOnTop: true,        // Floating behavior: stays pinned above other apps
        skipTaskbar: true,        // Hides it from the Windows Taskbar / macOS Dock
        type: 'toolbar',          // Tells the OS to treat it as a utility popup panel
        show: false,              // Starts hidden to prevent flash of white screen
        webPreferences: {
            nodeIntegration: true,    // FIXED: Enabled so script.js can use require('electron')
            contextIsolation: false   // FIXED: Disabled because you do not have a preload.js file
        }
    });

    popupWindow.loadFile('index.html');

    // 3. Position the popup in the bottom right corner (classic overlay style)
    popupWindow.setPosition(
        width - popupWidth - 20,  // 20px padding from the right edge
        height - popupHeight - 20 // 20px padding from the taskbar/bottom edge
    );

    // Fade or show gracefully once content maps perfectly
    popupWindow.once('ready-to-show', () => {
        popupWindow.show();
    });

    // 4. Autohide Behavior (Optional): Hides the popup when clicking anywhere else
    //popupWindow.on('blur', () => {
        popupWindow.hide(); 
    //});
}

// ==========================================================================
// IPC HANDLERS: INTERCEPT SIGNALS FROM SCRIPT.JS
// ==========================================================================

/* Event handlers for mac dots */
ipcMain.on('window-control-close', () => {
    if (popupWindow) popupWindow.close();
});

ipcMain.on('window-control-minimize', () => {
    if (popupWindow) popupWindow.minimize();
});

/* FIXED: Background external web browser redirect controller channel */
ipcMain.on('open-external-url', (event, url) => {
    if (url) {
        shell.openExternal(url); // Launches default system web browser tab cleanly in the background
    }
});

// Run application loops
app.whenReady().then(() => {
    createPopup();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createPopup();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
