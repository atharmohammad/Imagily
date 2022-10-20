import { HexAToRGBA, RGBAToHexA } from './pixelColorTypeConverter.js'
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
  console.log(imgPixels)
  return {
    imgPixels,
    imageHeight: base_image.height,
    imageWidth: base_image.width,
  }
}

const ConvertArrayToMerkelTreeFormat = async () => {
  const image = await ImageToUri('D:/Imagily/Images/car1.jpg')
  // path.resolve(__dirname, '../../Images/'),
  // 'car1.jpg'
  // 'C:/Users/91782/Desktop/Imagily/Images/car1.jpg'
  let MerkelTreeArray = []
  const arr = image.imgPixels
  for (let i = 0; i < arr.length; i += 4) {
    const hexVal = RGBAToHexA(arr[i], arr[i + 1], arr[i + 2], arr[i + 3])
    MerkelTreeArray.push(hexVal)
  }
  console.log(MerkelTreeArray)
  return MerkelTreeArray
}

const ConvertMerkelTreeArrayToPixelArray = async () => {
  let pixelsArray = []
  let hexArr = await ConvertArrayToMerkelTreeFormat()
  for (let i = 0; i < hexArr.length; i++) {
    const tempArr = HexAToRGBA(hexArr[i])
    pixelsArray.push(...tempArr)
  }
  console.log(pixelsArray)
}

// await ConvertArrayToMerkelTreeFormat(arr)
ConvertMerkelTreeArrayToPixelArray()

const draw = async () => {
  const canvas = createCanvas()
  const ctx = canvas.getContext('2d')
  // const height = image.imgHeight
  // const width = image.imgWidth
  // const arr = image.imgPixels
  const img = new Image()

  img.onload = () => ctx.drawImage(img, 0, 0)
  img.onerror = (err) => {
    throw err
  }
  // img.src = 'C:/Users/91782/Desktop/Imagily/Images/car1.jpg'

  // var imgData = ctx.createImageData(width, height) // width x height
  // var data = imgData.data
  // for (var i = 0, len = width * height * 4; i < len; i++) {
  //   data[i] = arr[i]
  // }
  // //   console.log(imgData)
  // ctx.putImageData(imgData, 0, 0)
}

draw()

// draw({
//   imgPixels: [
//     123, 123, 230, 231, 231, 12, 23, 231, 43, 231, 123, 124, 156, 34, 89, 34,
//   ],
//   imgHeight: 4,
//   imgWidth: 4,
// })

export { draw, ImageToUri }
