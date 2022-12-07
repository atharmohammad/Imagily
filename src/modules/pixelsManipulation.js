import { HexAToRGBA, RGBAToHexA } from './pixelColorTypeConverter.js'
import LinearCompare from './LinearCompare.js'
// const path = require('path')
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
  const image = await ImageToUri('D:/projects/Imagily/Images/car1.jpg')
  // path.resolve(__dirname, '../../Images/'),
  // 'car1.jpg'

  let MerkelTreeArray = []
  const arr = image.imgPixels
  for (let i = 0; i < arr.length; i += 4) {
    const hexVal = RGBAToHexA(arr[i], arr[i + 1], arr[i + 2], arr[i + 3])
    MerkelTreeArray.push(hexVal)
  }
  // console.log(MerkelTreeArray)
  return MerkelTreeArray
}

const ConvertMerkelTreeArrayToPixelArray = async () => {
  let pixelsArray = []
  let hexArr = await ConvertArrayToMerkelTreeFormat()
  for (let i = 0; i < hexArr.length; i++) {
    const tempArr = HexAToRGBA(hexArr[i])
    pixelsArray.push(...tempArr)
  }
  // console.log(pixelsArray)
}

// ConvertMerkelTreeArrayToPixelArray()

const diff = async () => {
  const image1 = await ImageToUri('D:/projects/Imagily/Images/car1.jpg')
  const image2 = await ImageToUri('D:/projects/Imagily/Images/car3.png')
  const changedValues = await LinearCompare(image1.imgPixels, image2.imgPixels)

  return changedValues
}
diff()

const draw = async () => {
  const canvas = createCanvas()
  const ctx = canvas.getContext('2d')
  const img = new Image()

  img.onload = () => ctx.drawImage(img, 0, 0)
  img.onerror = (err) => {
    throw err
  }
}

draw()

export { draw, ImageToUri, diff }
