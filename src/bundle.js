(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* globals document, ImageData */

const parseFont = require('./lib/parse-font')

exports.parseFont = parseFont

exports.createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
}

exports.createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

exports.loadImage = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options)

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = function () { cleanup(); resolve(image) }
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')) }

    image.src = src
  })
}

},{"./lib/parse-font":2}],2:[function(require,module,exports){
'use strict'

/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
const styles = 'italic|oblique'
const variants = 'small-caps'
const stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
const units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
const string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <ΓÇÿfont-styleΓÇÖ> || <font-variant-css21> || <ΓÇÿfont-weightΓÇÖ> || <ΓÇÿfont-stretchΓÇÖ> ]?
//    <ΓÇÿfont-sizeΓÇÖ> [ / <ΓÇÿline-heightΓÇÖ> ]? <ΓÇÿfont-familyΓÇÖ> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i')
const styleRe = new RegExp(`(${styles}) +`, 'i')
const variantRe = new RegExp(`(${variants}) +`, 'i')
const stretchRe = new RegExp(`(${stretches}) +`, 'i')
const sizeFamilyRe = new RegExp(
  `([\\d\\.]+)(${units}) *((?:${string})( *, *(?:${string}))*)`)

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = str => {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  const substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}

},{}],3:[function(require,module,exports){
const linearCompare = async(pixels1,pixels2) =>{
    const changedIndexes = [];
    for(let i = 0; i<pixels1.length; i++){
        if(pixels1[i] != pixels2[i]){
            changedIndexes.push(i);
        }
    }
    return changedIndexes;
}

module.exports = linearCompare;
},{}],4:[function(require,module,exports){
const RGBAToHexA = (r, g, b, a) => {
  r = r.toString(16)
  g = g.toString(16)
  b = b.toString(16)
  a = a.toString(16)

  if (r.length == 1) r = '0' + r
  if (g.length == 1) g = '0' + g
  if (b.length == 1) b = '0' + b
  if (a.length == 1) a = '0' + a

  return '#' + r + g + b + a
}

const HexAToRGBA = (h) => {
  let r = 0,
    g = 0,
    b = 0,
    a = 1

  if (h.length == 5) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]
    a = '0x' + h[4] + h[4]
  } else if (h.length == 9) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
    a = '0x' + h[7] + h[8]
  }
  //   a = +(a / 255).toFixed(3)

  let pixelValue = [parseInt(r), parseInt(g), parseInt(b), parseInt(a)]

  return pixelValue
}

module.exports = { RGBAToHexA, HexAToRGBA }

},{}],5:[function(require,module,exports){
(function (global){(function (){
const { HexAToRGBA, RGBAToHexA } = require('./pixelColorTypeConverter.js')
const LinearCompare = require('./LinearCompare.js')
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
  global.window.changedIndexes = changedValues

  return changedValues
}

diff()

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

module.exports = { draw, ImageToUri, diff }

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./LinearCompare.js":3,"./pixelColorTypeConverter.js":4,"canvas":1}]},{},[5]);
