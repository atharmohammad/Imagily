const {getDirectories} = require("../src/modules/saveImage.js");
const init = require('../src/modules/version.js');

describe("Commit the image",()=>{
    it("creates a .imagily folder if don't exists",async()=>{
        let files = await getDirectories('./'); 
        let check = files.find(x => x == '.imagily');
        console.log(files);
        console.log(check);
        if(!check){
            await init()
        }
        files = await getDirectories('./.imagily'); 
        console.log(files);
    })
})