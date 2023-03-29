'use strict'

const path = require('path')
const fs = require('fs')
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import genshinDb from 'genshin-db'
import { exit } from 'process'

const db = require('electron-db');
const isDevelopment = false //process.env.NODE_ENV !== 'production'

// This will save the database in the same directory as the application.
const databaselocation = path.join(__dirname, '')

if (
  !fs.existsSync(path.join(databaselocation, 'playerdata.json')) ||
  !fs.existsSync(path.join(databaselocation, 'URLdata.json')) ||
  !fs.existsSync(path.join(databaselocation, 'userdata.json'))
  ) {
  ///// Store character data:
  // Name: talent1: talent2: talent3: a1: a2: a3: a4: a5:
  // mainsands maingoblet maincirclet set1 set2
  db.createTable('playerdata', databaselocation, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if (succ) {
      console.log(msg)
    } else {
      console.log('An error has occured. ' + msg)
      exit
    }
  })

  // Create URL table if not exist
  db.createTable('URLdata', databaselocation, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if (succ) {
      console.log(msg)
    } else {
      console.log('An error has occured. ' + msg)
      exit
    }
  })

  ///// Store Boss material data: number of each part
  // Name: value:
  ///// Store material data: number of each part
  // Name: value:
  db.createTable('userdata', databaselocation, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if (succ) {
      console.log(msg)
      //User data update 
      let arr = genshinDb.materials("names", {"matchCategories":true})
      for (const key in arr) {
        if (Object.hasOwnProperty.call(arr, key)) {
          const element = arr[key];
          putNewMat(element,0)
        }
      }
    } else {
      console.log('An error has occured. ' + msg)
      exit
    }
  })
}

// playerdata functions
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
          console.log("Put New Playerdata for " + obj.name + ": "+ msg);
        }
        returnsucc = succ
      })
    }
  })
  return returnsucc
}

function updateCharacter(obj){
  let where = {
    "name": obj.name
  };

  let set = {
    "talent1": obj.talent1,
    "talent2": obj.talent2,
    "talent3": obj.talent3,
    "a1": obj.a1,
    "a2": obj.a2,
    "a3": obj.a3,
    "a4": obj.a4,
    "a5": obj.a5,
    "mainsands": obj.mainsands,
    "maingoblet": obj.maingoblet,
    "maincirclet": obj.maincirclet,
    "set1": obj.set1,
    "set2": obj.set2,
  }

  let returnsucc
  db.updateRow('playerdata', databaselocation, where, set, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if(succ) console.log("Update Playerdata for " + obj.name + ": "+ msg)
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

function delCharacter(name){
  db.deleteRow('playerdata', databaselocation, {'name': name}, (succ, msg) => {
    console.log("Delete Playerdata for " + name + ": "+ msg);
  });
}

// userdata functions
function putNewMat(name, value){
  let returnsucc = false
  // Check for existing mat
  db.getRows('userdata', databaselocation, {name: name}, (succ, result) => {
    if(succ && result.length > 0) {
      console.log("Already exist: "+JSON.stringify(result))
    }
    else {
      // Insert new
      db.insertTableContent('userdata', databaselocation, {name: name, value: value}, (succ, msg) => {
        if(succ) {
          console.log("Put New Userdata for " + name + ": "+ msg);
        }
        returnsucc = succ
      })
    }
  })
  return returnsucc
}

function updateMat(name, value){
  let where = {
    "name": name
  };

  let set = {
    "value": value
  }

  let returnsucc
  db.updateRow('userdata', databaselocation, where, set, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if(succ) console.log("Update Userdata for " + name + ": "+ msg)
    returnsucc = succ
  })
  return returnsucc
}

function getMat(name){
  let returndata = []
  db.getRows('userdata', databaselocation, {name: name}, (succ, result) => {
    // succ - boolean, tells if the call is successful
    if(succ) {
      returndata = result
    }
  })
  return returndata
}

function getAllMat(){
  let returndata = []
  db.getAll('userdata', databaselocation, (succ, data) => {
    // succ - boolean, tells if the call is successful
    if(succ) {
      returndata = data
    }
  })
  return returndata
}

// URLdata functions
function putNewURL(URL, newURL){
  let returnsucc = false
  // Check for existing URL
  db.getRows('URLdata', databaselocation, {name: URL}, (succ, result) => {
    if(succ && result.length > 0) {
      console.log("Already exist: "+JSON.stringify(result))
    }
    else {
      // Insert new
      db.insertTableContent('URLdata', databaselocation, {name: URL, value: newURL}, (succ, msg) => {
        if(succ) {
          console.log("Put New URLdata for " + URL + ": "+ msg);
        }
        returnsucc = succ
      })
    }
  })
  return returnsucc
}

function updateURL(URL, newURL){
  let where = {
    "name": URL
  };

  let set = {
    "value": newURL
  }

  let returnsucc
  db.updateRow('URLdata', databaselocation, where, set, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if(succ) console.log("Update URLdata for " + URL + ": "+ msg)
    returnsucc = succ
  })
  return returnsucc
}

function getURL(URL){
  let returndata = []
  db.getRows('URLdata', databaselocation, {name: URL}, (succ, result) => {
    // succ - boolean, tells if the call is successful
    if(succ) {
      returndata = result
    }
  })
  return returndata
}

/* // Player data update
function checkProperty(element, property, value) {
  if (Object.hasOwnProperty.call(element, property)) {
    return element
  }
  element[property] = value
  return element
}
let arr = getAllCharacter()
for (const key in arr) {
  if (Object.hasOwnProperty.call(arr, key)) {
    const element = arr[key];
    checkProperty(element,'a1',1)
    checkProperty(element,'a2',1)
    checkProperty(element,'a3',1)
    checkProperty(element,'a4',1)
    checkProperty(element,'a5',1)
    checkProperty(element,'mainsands',1)
    checkProperty(element,'maingoblet',1)
    checkProperty(element,'maincirclet',1)
    checkProperty(element,'set1',"Adventurer")
    checkProperty(element,'set2',"")
    updateCharacter(element)
  }
}
console.log(getAllCharacter())
*/

/** Genshin DB handler */
ipcMain.handle('findCharacterByName', (id, name) => {
  return JSON.stringify(genshinDb.characters(name, {"matchAltNames":false}))
})
ipcMain.handle('findCharTalentByName', (id, name) => {
  return JSON.stringify(genshinDb.talents(name, {"matchAltNames":false}))
})
ipcMain.handle('getAllCharacterNames', () => {
  return JSON.stringify(genshinDb.talents("names", {"matchCategories":true}))
})
ipcMain.handle('getAllMat', () => {
  return JSON.stringify(genshinDb.materials("names", {"matchCategories":true,"verboseCategories":true}))
})
ipcMain.handle('findMatByName', (id, name) => {
  return JSON.stringify(genshinDb.materials(name))
})
ipcMain.handle('findDomainEntrance', (id, name) => {
  return JSON.stringify(genshinDb.domains(name))
})
ipcMain.handle('getAllArtifacts', () => {
  return JSON.stringify(genshinDb.artifacts("names", {"matchCategories":true}))
})

/** Player Data handler */
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
ipcMain.handle('databaseDeleteCharacter', (id, name) => {
  return JSON.stringify(delCharacter(name))
})

/** User Data handler */
ipcMain.handle('databaseUpdateMat', (id, name, value) => {
  return JSON.stringify(updateMat(name, value))
})
ipcMain.handle('databaseGetMat', (id, name) => {
  return JSON.stringify(getMat(name))
})
ipcMain.handle('databasePutNewMat', (id, name, value) => {
  return JSON.stringify(putNewMat(name, value))
})
ipcMain.handle('databaseGetAllMat', () => {
  return JSON.stringify(getAllMat())
})

/** URL Data handler */
ipcMain.handle('databaseUpdateURL', (id, url, newurl) => {
  return JSON.stringify(updateURL(url, newurl))
})
ipcMain.handle('databaseGetURL', (id, url) => {
  return JSON.stringify(getURL(url))
})
ipcMain.handle('databasePutNewURL', (id, url, newurl) => {
  return JSON.stringify(putNewURL(url, newurl))
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
      webSecurity: false,
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
