const fs = require('fs');
const path = require('path');
const { v4 }  =  require('uuid');

async function add(files) {
    const id = v4();
    console.log(id)
    let str = "";
    files.map((val,_)=>{
        str += val;
        str += '\n';
    })
    const s = str.slice(0,-1);
    await fs.promises.writeFile(path.join(`./.imagily/add/`,id),s);
}

module.exports = add;