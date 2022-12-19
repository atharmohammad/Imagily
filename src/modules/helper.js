// const { diff } = require('./pixelsManipulation.js')

var effectButton
var paintButton
var canvas
var context
// var originalCanvas
// var context2

const api_url = 'http://localhost:5000/'

async function getapi(url) {
  // Storing response
  const response = await fetch(api_url)

  // Storing data in form of JSON
  var data = await response.json()
  console.log(data)
  show(data.changedValues)
}

function show(changedPixels) {
  var image = document.getElementById('changedImage')
  effectButton = document.getElementById('EffectButton')
  paintButton = document.getElementById('PaintButton')
  canvas = document.getElementById('Canvas')
  // originalCanvas = document.getElementById('original-canvas')
  // context2 = originalCanvas.getContext('2d')
  context = canvas.getContext('2d')

  // originalCanvas.width = image.width
  // originalCanvas.height = image.height
  canvas.width = image.width
  canvas.height = image.height

  paintButton.addEventListener('click', async () => {
    await drawImage(image)
  })
  effectButton.addEventListener('click', () => addEffect(changedPixels))
}

const drawImage = async (image) => {
  context.drawImage(image, 0, 0)
}

const addEffect = async (changedPixels) => {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  changeToWhite(imageData.data, changedPixels)
  context.putImageData(imageData, 0, 0)
}

const changeToWhite = async (data, changedPixels) => {
  for (var i = 0; i < changedPixels.length; i++) {
    data[changedPixels[i]] = 0
  }
}

window.addEventListener('load', getapi)
