const { HexAToRGBA, RGBAToHexA } = require('./pixelColorTypeConverter.js')
const LinearCompare = require('./linearCompare.js')
const path = require('path')
const { createCanvas, loadImage, Image } = require('canvas')

async function ImageToUri(url) {
  const canvas = createCanvas()
  const ctx = canvas.getContext('2d')

  const base_image = await loadImage(url)
  canvas.width = base_image.width
  canvas.height = base_image.height
  ctx.drawImage(base_image, 0, 0)
  var imgData = ctx.getImageData(0, 0, base_image.width, base_image.height)
  var imgPixels = imgData.data
  // console.log(imgPixels)
  return {
    imgPixels,
    imageHeight: base_image.height,
    imageWidth: base_image.width,
  }
}

const ConvertArrayToMerkelTreeFormat = async () => {
  const image = await ImageToUri(path.resolve(__dirname, './Images/car1.png'))

  let MerkelTreeArray = []
  const arr = image.imgPixels
  for (let i = 0; i < arr.length; i += 4) {
    const hexVal = RGBAToHexA(arr[i], arr[i + 1], arr[i + 2], arr[i + 3])
    MerkelTreeArray.push(hexVal)
  }
  return MerkelTreeArray
}

const ConvertMerkelTreeArrayToPixelArray = async () => {
  let pixelsArray = []
  let hexArr = await ConvertArrayToMerkelTreeFormat()
  for (let i = 0; i < hexArr.length; i++) {
    const tempArr = HexAToRGBA(hexArr[i])
    pixelsArray.push(...tempArr)
  }
}

// ConvertMerkelTreeArrayToPixelArray()

const diff = async () => {
  try {
    const path1 = path.resolve(__dirname, './Images/car1.png')
    const path2 = path.resolve(__dirname, './Images/car3.png')
    const image1 = await ImageToUri(path1)
    const image2 = await ImageToUri(path2)
    const changedValues = await LinearCompare(
      image1.imgPixels,
      image2.imgPixels
    )
    // console.log(changedValues)
    return {
      changedValues,
      image1: image1.imgPixels,
      image2: image2.imgPixels,
      height: image1.imageHeight,
      width: image1.imageWidth,
    }
  } catch (error) {
    console.log(error)
  }
}

// const draw = async () => {
//   const canvas = createCanvas()
//   const ctx = canvas.getContext('2d')
//   const img = new Image()

//   img.onload = () => ctx.drawImage(img, 0, 0)
//   img.onerror = (err) => {
//     throw err
//   }
// }

// draw()

module.exports = {
  diff,
  ImageToUri,
  ConvertArrayToMerkelTreeFormat,
  ConvertMerkelTreeArrayToPixelArray,
}
// module.exports = diff
