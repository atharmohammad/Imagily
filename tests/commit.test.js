const init = require('../src/modules/version')
const { commit, getLastCommit } = require('../src/modules/commit')

describe('Commit the image', () => {
  it('add commit in the .commit folder', async () => {
    await init()
    await commit()
  })
  // it("get Last Commit",async()=>{
  //     const lc = await getLastCommit();
  //     console.log(lc)
  // })
})
