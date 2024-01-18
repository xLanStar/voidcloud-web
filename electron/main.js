import { app, BrowserWindow, Menu } from 'electron';

const createWindow = () => {
    const window = new BrowserWindow({
        title: 'VoidCloud',
    })

    window.setMenu(Menu.buildFromTemplate([
        {
            label: '工具',
            submenu: [
                {
                    label: "開發工具",
                    accelerator: 'F12',
                    click: () => window.webContents.toggleDevTools()
                }
            ]
        }
    ]))

    if (process.env.VITE_DEV_SERVER_URL) {
        window.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        window.loadFile('dist/index.html');
    }
};

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q

    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (mainWindow === null) {
        createWindow();
    }
})