const {walk} = require("../src/modules/saveImage.js");

describe("Save Image",()=>{
    it("find all file paths",async()=>{
        const files = await walk('./src/modules/Images/');
        console.log(files)
    })
})