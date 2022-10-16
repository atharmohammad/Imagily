const fs = require('fs');

const dir = './.imagily';

const init = async()=>{  
    if(!fs.existsSync(dir)){
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }else{
        console.error("imagily repository is already initialised !");
    }
}

module.exports = init;