const {v4}  =  require('uuid');
const {walk} = require('./saveImage');
const path = require('path');
const fspromises = require('fs').promises;
const fs = require('fs');

const addDir = './.imagily/add/';
const commitDir  = './.imagily/commits/'

const findAddedFiles = async() => {
    let files = await walk(addDir);
    const lastAdd = files[0];
    const images = await fspromises.readFile(path.join('./',lastAdd),'utf8');
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

module.exports = commit;