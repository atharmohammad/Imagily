const { v4}  =  require('uuid');
const {walk} = require('./saveImage');
const path = require('path');
const fs = require('fs').promises;
const addDir = './.imagily/add/';

const findAddedFiles = async() => {
    let files = await walk(addDir);
    const lastAdd = files[0];
    const images = await fs.readFile(path.join('./',lastAdd),'utf8');
    const imageArray = images.split(/\r?\n/);
    // console.log(imageArray)
    return imageArray;
}

const commit = async() => {
    const id = v4();
    const files = await findAddedFiles();
    /* iterate on files to create array for them to save */
}

module.exports = commit;