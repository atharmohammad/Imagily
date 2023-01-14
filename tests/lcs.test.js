const lcs = require("../src/modules/lcs");
const {ImageToUri} = require("../src/modules/pixelsManipulation");
const path = require("path");


describe("LCS for the files",()=>{
    it("longest common pixel array",async()=>{
        const path1 = path.resolve(__dirname, '../src/modules/Images/car1.png')
        const path2 = path.resolve(__dirname, '../src/modules/Images/car3.png')
        const image1 = await ImageToUri(path1)
        const image2 = await ImageToUri(path2)
        // const pixels = lcs(image1.imgPixels,image2.imgPixels)
        // console.log(pixels)
    })
})