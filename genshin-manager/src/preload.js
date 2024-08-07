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
  /** Genshin DB handler */
  findCharacterByName: (name) => {
    console.log('invoked findCharacterByName for ' + name)
    return ipcRenderer.invoke('findCharacterByName', name)
  },
  findCharTalentByName: (name) => {
    console.log('invoked findCharTalentByName for ' + name)
    return ipcRenderer.invoke('findCharTalentByName', name)
  },
  getAllMat: () => {
    console.log('invoked getAllMat')
    return ipcRenderer.invoke('getAllMat')
  },
  findMatByName: (name) => {
    console.log('invoked findMatByName for ' + name)
    return ipcRenderer.invoke('findMatByName', name)
  },
  findDomainEntrance: (name) => {
    console.log('invoked findDomainEntrance for ' + name)
    return ipcRenderer.invoke('findDomainEntrance', name)
  },
  getAllCharacterNames: () => {
    console.log('invoked getAllCharacterNames')
    return ipcRenderer.invoke('getAllCharacterNames')
  },
  getAllArtifacts: () => {
    console.log('invoked getAllArtifacts')
    return ipcRenderer.invoke('getAllArtifacts')
  },
  /** Player Data handler */
  databasePutNewCharacter: (obj) => {
    console.log('invoked databasePutNewCharacter for ' + obj.name)
    return ipcRenderer.invoke('databasePutNewCharacter', obj)
  },
  databaseUpdateCharacter: (obj) => {
    console.log('invoked databaseUpdateCharacter for ' + obj.name)
    return ipcRenderer.invoke('databaseUpdateCharacter', obj)
  },
  databaseGetAllCharacter: () => {
    console.log('invoked databaseGetAllCharacter')
    return ipcRenderer.invoke('databaseGetAllCharacter')
  },
  databaseFindCharacter: (name) => {
    console.log('invoked databaseFindCharacter for ' + name)
    return ipcRenderer.invoke('databaseFindCharacter', name)
  },
  databaseDeleteCharacter: (name) => {
    console.log('invoked databaseDeleteCharacter for ' + name)
    return ipcRenderer.invoke('databaseDeleteCharacter', name)
  },
  /** URL Data handler */
  databaseUpdateURL: (url, newurl) => {
    console.log('invoked databaseUpdateURL for ' + url)
    return ipcRenderer.invoke('databaseUpdateURL', url, newurl)
  },
  databaseGetURL: (url) => {
    console.log('invoked databaseGetURL for ' + url)
    return ipcRenderer.invoke('databaseGetURL', url)
  },
  databasePutNewURL: (url, newurl) => {
    console.log('invoked databasePutNewURL for ' + url)
    return ipcRenderer.invoke('databasePutNewURL', url, newurl)
  },
  /** User Data handler */
  databaseUpdateMat: (name, value) => {
    console.log('invoked databaseUpdateMat for ' + name)
    return ipcRenderer.invoke('databaseUpdateMat', name, value)
  },
  databaseGetMat: (name) => {
    console.log('invoked databaseGetMat for ' + name)
    return ipcRenderer.invoke('databaseGetMat', name)
  },
  databasePutNewMat: (name, value) => {
    console.log('invoked databasePutNewMat for ' + name)
    return ipcRenderer.invoke('databasePutNewMat', name, value)
  },
  databaseGetAllMat: () => {
    console.log('invoked databaseGetAllMat')
    return ipcRenderer.invoke('databaseGetAllMat')
  },
})