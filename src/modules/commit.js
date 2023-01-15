const {v4}  =  require('uuid');
const {walk} = require('./saveImage');
const path = require('path');
const fspromises = require('fs').promises;
const fs = require('fs');

const addDir = './.imagily/add/';
const commitDir  = './.imagily/commits/'

const findAddedFiles = async() => {
    let files = await fspromises.readdir(addDir);
    const res = files.map(fileName => ({
        name: fileName,
        time: fs.statSync(`${addDir}/${fileName}`).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time)
      .map(file => file.name);
    const lastAdd = res[0];
    // console.log(lastAdd)
    const images = await fspromises.readFile(path.join(addDir,lastAdd),'utf8');
    const imageArray = images.split(/\r?\n/);
    // console.log(imageArray)
    return imageArray;
}

const commit = async() => {
    const id = v4();
    const files = await findAddedFiles();
    fspromises.mkdir(path.join(commitDir,id),{ recursive: true }, (err) => {
        if (err) throw err;
    })
    /* iterate on files to create array for them to save */

    files.map(async(file)=>{
        const name = file.split('/').join('_');
        var file = fs.createWriteStream(path.join(`${commitDir}/${id}`,name));
        file.on('error', function(err) { /* error handling */ });
        files.forEach(function(v) { file.write(v + '\n'); });
        file.end();
    })
    
}

const getLastCommit = async() => {
    let commits = await fspromises.readdir(commitDir);
    const res = commits.map(fileName => ({
      name: fileName,
      time: fs.statSync(`${commitDir}/${fileName}`).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)
    .map(file => file.name);
    // console.log(res)
    let lastCommits = await fspromises.readdir(path.join(commitDir,res[0]));
    return lastCommits
}

module.exports = {commit,getLastCommit,findAddedFiles};