const { v4 } = require('uuid')
const { walk } = require('./saveImage')
const path = require('path')
const fspromises = require('fs').promises
const fs = require('fs')
const { ImageToUri } = require('./pixelsManipulation')

let addDir = './.imagily/add/'
let commitDir = './.imagily/commits/'

const findAddedFiles = async () => {
  let files = await fspromises.readdir(addDir)
  const res = files
    .map((fileName) => ({
      name: fileName,
      time: fs.statSync(`${addDir}/${fileName}`).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)
    .map((file) => file.name)
  const lastAdd = res[0]
  // console.log(lastAdd)
  const images = await fspromises.readFile(path.join(addDir, lastAdd), 'utf8')
  const imageArray = images.split(/\r?\n/)
  // console.log(imageArray)
  return imageArray
}

const commit = async (Dir) => {
  if(Dir){
    commitDir = '../.imagily/commits/';
    addDir = '../.imagily/add/';
  }
  const id = v4()
  const files = await findAddedFiles()
  await fspromises.mkdir(
    path.join(commitDir, id),
    { recursive: true },
    (err) => {
      if (err) throw err
    }
  )
  /* iterate on files to create array for them to save */

  files.map(async (file) => {
    console.log('file', file)
    const name = file.split('/').join('_')  // name for Linux
    // let name = file.split('\\').join('_') // name for windows
    let newName = name.split('.').join('_')
    newName += '.json'
    const newPath = file.split('\\').join('/')
    // console.log('new patj', newPath)
    // const xt = await fspromises.readFile(`./${newPath}`, 'utf8')
    const xt = await ImageToUri(`./${newPath}`)
    const xtjson = JSON.stringify(xt.imgPixels)
    await fspromises.writeFile(path.join(`${commitDir}/${id}`, newName), xtjson)
  })
}

const getLastCommit = async () => {
  let commits = await fspromises.readdir(commitDir)
  const res = commits
    .map((fileName) => ({
      name: fileName,
      time: fs.statSync(`${commitDir}/${fileName}`).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)
    .map((file) => file.name)
  // console.log(res)
  let lastCommits = await fspromises.readdir(path.join(commitDir, res[0]))
  console.log(lastCommits)
  return { lastCommits, dir: path.join(commitDir, res[0]) }
}

module.exports = { commit, getLastCommit, findAddedFiles }
