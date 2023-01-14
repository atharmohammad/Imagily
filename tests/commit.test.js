const init = require('../src/modules/version')
const commit = require('../src/modules/commit')

describe("Commit the image",()=>{
    it("add commit in the .commit folder",async()=>{
        await init();
        await commit();
        
    })
})