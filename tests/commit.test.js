const init = require('../src/modules/version')
const commit = require('../src/modules/commit')

describe("Commit the image",()=>{
    it("creates a .imagily folder if don't exists",async()=>{
        await init();
        await commit();
        
    })
})