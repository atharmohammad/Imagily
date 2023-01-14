const fs = require('fs');
const path = require('path');
const { v4 }  =  require('uuid');

async function add(files) {
    const id = v4();
    var file = fs.createWriteStream(path.join(`./.imagily/add/`,id));
    file.on('error', function(err) { /* error handling */ });
    files.forEach(function(v) { file.write(v + '\n'); });
    file.end();
}

module.exports = add;