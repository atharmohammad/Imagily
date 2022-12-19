const express = require('express')
const app = express()
const cors = require('cors')
const pixelsManipulation = require('./modules/pixelsManipulation')

app.use(cors())

const getImageData = async (req, res) => {
  try {
    const diffArray = await pixelsManipulation()
    const data = res.status(200).json({
      changedValues: diffArray.changedValues,
      image1: [...diffArray.image1],
      image2: [...diffArray.image2],
    })
    console.log(data.dataOutput)
  } catch (error) {
    console.log('error')
  }
}

app.get('/', getImageData)

const port = 5000

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
