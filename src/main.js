const express = require('express')
const app = express()
const cors = require('cors')
const pixelsManipulation = require('./modules/pixelsManipulation')

app.use(
  cors({
      "origin": '*',
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 200
  })
);

const getImageData = async (req, res) => {
  try {
    const diffArray = await pixelsManipulation()
    return res.status(200).json({
      changedValues: diffArray.changedValues,
      image1: [...diffArray.image1],
      image2: [...diffArray.image2],
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

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})



