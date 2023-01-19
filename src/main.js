const express = require('express')
const app = express()
const cors = require('cors')
const pixelsManipulation = require('./modules/pixelsManipulation')
const { getLastCommit } = require('./modules/commit')
const fspromises = require('fs').promises
const fs = require('fs')
const path = require('path')

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
)

const getImageData = async (req, res) => {
  try {
    const diffArray = await pixelsManipulation.diff()
    const lt = await getLastCommit()
    const lastCommits = lt.lastCommits
    const imagePath1 = lastCommits[0]
    // console.log('image path 1', imagePath1)
    const imagePath2 = lastCommits[0].split('_').join('/')
    console.log('imagepath 2', imagePath2)

    const images1 = await fspromises.readFile(path.join(lt.dir, imagePath1))

    console.log('path 1', path.join(lt.dir, imagePath1))
    console.log('images', images1.toString())
    // const imageArray1 = images1.split(/\r?\n/)

    // const images2 = await fspromises.readFile(imagePath2, 'utf8')
    // const imageArray2 = images2.split(/\r?\n/)

    const imageInfo = await pixelsManipulation.ImageToUri(`./${imagePath2}`)
    console.log('image info', imageInfo)

    return res.status(200).json({
      image1: imageArray1,
      image2: [...imageInfo.imgPixels],
      height: imageInfo.imageHeight,
      width: imageInfo.imageWidth,
    })
  } catch (error) {
    console.log(error)
  }
}

// app.get('/', (req,res)=>{
//   return res.status(200).send("Hello");
// })

app.get('/', getImageData)

const port = 5000

// app.listen(port, () => {
//   console.log(`app is listening on port ${port}`)
// })

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
