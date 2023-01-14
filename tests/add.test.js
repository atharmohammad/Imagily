const add = require('../src/modules/add')
const {walk} = require('../src/modules/saveImage');
const init = require('../src/modules/version.js');


describe("add images",()=>{
    it("add images for commit",async()=>{
        await init();
        const files = await walk('./src/modules/Images/');
        await add(files);
    })
})