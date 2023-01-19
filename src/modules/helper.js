// const { diff } = require('./pixelsManipulation.js')

var effectButton
var paintButton
var canvas
var context
var data
// var originalCanvas
// var context2

const api_url = 'http://localhost:5000/'

async function getapi(url) {
  // Storing response
  const response = await fetch(api_url)

  // Storing data in form of JSON
  data = await response.json()
  console.log(data)
  // show(data.changedValues)
  compareVectors(
    [
      {
        imageData: data.image1,
        imageWidth: data.width,
        imageHeight: data.height,
      },
    ],
    [
      {
        imageData: data.image2,
        imageWidth: data.width,
        imageHeight: data.height,
      },
    ]
  )
}

// function show(changedPixels) {
//   var image = document.getElementById('changedImage')
//   effectButton = document.getElementById('EffectButton')
//   paintButton = document.getElementById('PaintButton')
//   canvas = document.getElementById('Canvas')

//   context = canvas.getContext('2d')

//   canvas.width = image.width
//   canvas.height = image.height

//   paintButton.addEventListener('click', async () => {
//     await drawImage(image)
//   })
//   effectButton.addEventListener('click', () => addEffect(changedPixels))
// }

const drawImage = async (image) => {
  context.drawImage(image, 0, 0)
}

const addEffect = async (changedPixels) => {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

  changeToWhite(imageData.data, changedPixels)
  context.putImageData(imageData, 0, 0)
}

const changeToBlack = async (data, changedPixels) => {
  for (var i = 0; i < changedPixels.length; i++) {
    data[changedPixels[i]] = 0
  }
}

const linearCompare = (pixels1, pixels2) => {
  const changedIndexes = []
  for (let i = 0; i < pixels1.length; i++) {
    if (Math.abs(pixels1[i] - pixels2[i]) > 5) {
      changedIndexes.push(i)
    }
  }
  return changedIndexes
}

const compareVectors = (vec1, vec2) => {
  var container = document.createElement('div')
  container.classList.add('container')

  for (var i = 0; i < vec1.length; i++) {
    var sourceImage = document.createElement('div')
    sourceImage.classList.add('source-image')

    var canvasOriginal = document.createElement('canvas')
    var contextOriginal = canvasOriginal.getContext('2d')
    canvasOriginal.width = vec1[i].imageWidth
    canvasOriginal.height = vec1[i].imageHeight
    var img1Pixels = new Uint8ClampedArray(vec1[i].imageData)
    const img1 = new ImageData(
      img1Pixels,
      vec1[i].imageWidth,
      vec1[i].imageHeight
    )
    createImageBitmap(img1)
      .then((imageBitmap) => {
        contextOriginal.drawImage(imageBitmap, 0, 0)
        sourceImage.appendChild(canvasOriginal)
        container.appendChild(sourceImage)
        document.body.appendChild(container)
      })
      .catch(console.error)

    const changedIndexes = linearCompare(vec1[i].imageData, vec2[i].imageData)

    var changedImage = document.createElement('div')
    changedImage.classList.add('changed-image')

    var canvasChanged = document.createElement('canvas')
    var contextChanged = canvasChanged.getContext('2d')
    canvasChanged.width = vec2[i].imageWidth
    canvasChanged.height = vec2[i].imageHeight

    changeToBlack(vec2[i].imageData, changedIndexes)
    var img2Pixels = new Uint8ClampedArray(vec2[i].imageData)
    const img2 = new ImageData(
      img2Pixels,
      vec2[i].imageWidth,
      vec2[i].imageHeight
    )
    createImageBitmap(img2)
      .then((imageBitmap) => {
        contextChanged.drawImage(imageBitmap, 0, 0)
        changedImage.appendChild(canvasChanged)
        container.appendChild(changedImage)
        document.body.appendChild(container)
      })
      .catch(console.error)

    container.appendChild(sourceImage)
    container.appendChild(changedImage)

    document.body.appendChild(container)
  }
  return container
}

window.addEventListener('load', getapi)
