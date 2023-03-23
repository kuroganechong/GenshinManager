'use strict'

const path = require('path')
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import genshinDb from 'genshin-db'
import { exit } from 'process'

const db = require('electron-db');
const isDevelopment = process.env.NODE_ENV !== 'production'

// This will save the database in the same directory as the application.
const databaselocation = path.join(__dirname, '')

// Create table if not exist
if (!db.valid('playerdata', databaselocation)){
  db.createTable('playerdata', databaselocation, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if (succ) {
      console.log(msg)
    } else {
      console.log('An error has occured. ' + msg)
      exit
    }
  })
}

/**
 * @param {Character} obj The Character
 */
function putNewCharacter(obj){
  let returnsucc = false
  // Check for existing character
  db.getRows('playerdata', databaselocation, {name: obj.name}, (succ, result) => {
    if(succ && result.length > 0) {
      console.log("Already exist: "+JSON.stringify(result))
    }
    else {
      // Insert new
      db.insertTableContent('playerdata', databaselocation, obj, (succ, msg) => {
        if(succ) {
          console.log("Message: " + msg);
        }
        returnsucc = succ
      })
    }
  })
  return returnsucc
}

/**
 * @param {Character} obj The Character
 */
function updateCharacter(obj){
  let where = {
    "name": obj.name
  };

  let set = {
    "talent1": obj.talent1,
    "talent2": obj.talent2,
    "talent3": obj.talent3
  }

  let returnsucc
  db.updateRow('playerdata', databaselocation, where, set, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if(succ) console.log("Message: " + msg)
    returnsucc = succ
  })
  return returnsucc
}

function getAllCharacter(){
  let returndata = []
  db.getAll('playerdata', databaselocation, (succ, data) => {
    // succ - boolean, tells if the call is successful
    if(succ) {
      returndata = data
    }
  })
  return returndata
}

/**
 * @param {String} name The Character's name
 */
function getCharacter(name){
  let returndata = []
  db.getRows('playerdata', databaselocation, {name: name}, (succ, result) => {
    // succ - boolean, tells if the call is successful
    if(succ) {
      returndata = result
    }
  })
  return returndata
}

ipcMain.handle('findCharacterByName', (id, name) => {
  return JSON.stringify(genshinDb.characters(name, {"matchAltNames":false}))
})
ipcMain.handle('findCharTalentByName', (id, name) => {
  return JSON.stringify(genshinDb.talents(name, {"matchAltNames":false}))
})

ipcMain.handle('databasePutNewCharacter', (id, obj) => {
  return JSON.stringify(putNewCharacter(obj))
})
ipcMain.handle('databaseUpdateCharacter', (id, obj) => {
  return JSON.stringify(updateCharacter(obj))
})
ipcMain.handle('databaseGetAllCharacter', () => {
  return JSON.stringify(getAllCharacter())
})
ipcMain.handle('databaseFindCharacter', (id, name) => {
  return JSON.stringify(getCharacter(name))
})


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
