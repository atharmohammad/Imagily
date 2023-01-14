const fs = require('fs');
const path = require('path');

const dir = './.imagily';

const init = async()=>{  
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