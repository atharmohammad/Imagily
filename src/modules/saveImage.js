const fs = require('fs');
const path = require("path");

const save = async() => {
    const promise = fs.promises.readFile(path.join('../Imagily/Images/car1.jpg'));

    Promise.resolve(promise).then(function(buffer){
        fs.writeFile(path.join("../Imagily/.imagily/car1.jpg"),buffer, (err) => {
            console.error(err)
        })
    });
    
}

module.exports = save;
