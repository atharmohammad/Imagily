const fs = require('fs');
const path = require('path');
const { v4 }  =  require('uuid');

let dir = `./.imagily/add/`;
async function add(files,Dir) {
    if(Dir)dir = Dir;
    const id = v4();
    console.log(id)
    let str = "";
    files.map((val,_)=>{
        str += val;
        str += '\n';
    })
    const s = str.slice(0,-1);
    await fs.promises.writeFile(path.join(dir,id),s);
}

module.exports = add; 