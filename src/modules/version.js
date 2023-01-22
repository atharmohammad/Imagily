const fs = require('fs');
const path = require('path');

let dir = './.imagily';

const init = async(Dir)=>{  
    if(Dir)dir = Dir;
    if(!fs.existsSync(dir)){
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
        });
        fs.mkdir(path.join(dir,'/add'),{ recursive: true }, (err) => {
            if (err) throw err;
        })
        fs.mkdir(path.join(dir,'/commits'),{ recursive: true }, (err) => {
            if (err) throw err;
        })
    }else{
        console.log("imagily repository is already initialised !");
        return;
    }
}

module.exports = init;