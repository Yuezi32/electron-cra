const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

function createWindow() {
    // 创建浏览器窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
        icon: 'public/app.ico'
    })

    // 应用加载index.html
    // win.loadURL('http://localhost:3000')
    // 打开开发者工具
    // win.webContents.openDevTools()

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
    if (isDev) {
        // 只有开发环境才打开开发者工具
        win.webContents.openDevTools()
    }
    createMenu()
}

// 设置菜单栏
function createMenu() {
    // darwin表示macOS，针对macOS的设置
    if (process.platform === 'darwin') {
        const template = [
        {
            label: 'App Demo',
            submenu: [
                {
                    role: 'about'
                },
                {
                    role: 'quit'
                }]
        }]
        let menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    } else {
        // windows及linux系统
        Menu.setApplicationMenu(null)
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

require('./ipcMain/readDir')