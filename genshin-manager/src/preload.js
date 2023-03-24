/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
import { contextBridge, ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer

contextBridge.exposeInMainWorld('api', {
  findCharacterByName: (name) => {
    return ipcRenderer.invoke('findCharacterByName', name)
  },
  findCharTalentByName: (name) => {
    return ipcRenderer.invoke('findCharTalentByName', name)
  },
  findMatByName: (name) => {
    return ipcRenderer.invoke('findMatByName', name)
  },
  databasePutNewCharacter: (obj) => {
    return ipcRenderer.invoke('databasePutNewCharacter', obj)
  },
  databaseUpdateCharacter: (obj) => {
    return ipcRenderer.invoke('databaseUpdateCharacter', obj)
  },
  databaseGetAllCharacter: () => {
    return ipcRenderer.invoke('databaseGetAllCharacter')
  },
  databaseFindCharacter: (name) => {
    return ipcRenderer.invoke('databaseFindCharacter', name)
  }
})