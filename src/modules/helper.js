import { diff } from './pixelsManipulation.js'

var effectButton
var paintButton
var canvas
var context

function init() {
  var image = document.getElementById('SourceImage')
  effectButton = document.getElementById('EffectButton')
  paintButton = document.getElementById('PaintButton')
  canvas = document.getElementById('Canvas')
  context = canvas.getContext('2d')

  canvas.width = image.width
  canvas.height = image.height

  paintButton.addEventListener('click', async () => {
    await drawImage(image)
  })

  effectButton.addEventListener('click', addEffect)
}

const drawImage = async (image) => {
  context.drawImage(image, 0, 0)
}

const addEffect = async () => {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  changeToWhite(imageData.data)
  context.putImageData(imageData, 0, 0)
}

const changeToWhite = async (data) => {
  const changedValues = await diff()
  for (var i = 0; i < changedValues.length; i++) {
    data[changedValues[i]] = 255
  }
}

window.addEventListener('load', init)
