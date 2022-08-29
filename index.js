const Jimp = require('jimp');
const path = require('path')
const fs = require('fs');
const pngToIco = require('png-to-ico');
const { convert } = require('@fiahfy/icns-convert') 


const inputImage = '1024x1024.png'
const originSizes = [
  '128x128.png',
'128x128@2x.png',
'32x32.png',
'icon.png',
'Square107x107Logo.png',
'Square142x142Logo.png',
'Square150x150Logo.png',
'Square284x284Logo.png',
'Square30x30Logo.png',
'Square310x310Logo.png',
'Square44x44Logo.png',
'Square71x71Logo.png',
'Square89x89Logo.png',
'StoreLogo.png'
];


(async function() {

  const sizes = originSizes.map(size => {


    if (size.includes('StoreLogo.png')) {
      return {
        name: size,
        size: [50, 50]
      }
    }
  
    const splitted = size.match(/([0-9]+x[0-9]+)/);
  
    if (!splitted) {
      return {
        name: size,
        size: [32, 32]
      }
    }
    const extracted = splitted[0].split('x').map(Number)
    return {
      name: size,
      size: extracted
    }
  })


  // CONVERT IMAGE TO MULTIPLE SIZE
  sizes.forEach(async ({size, name}) => {
    const image = await Jimp.read(inputImage)

    image.resize(size[0], size[1])
    
    image.write(`outputs/${name}`)
  });
  

  // CONVERT PNG TO ICO - WINDOW
  const winImageBuff = await pngToIco(inputImage)

  fs.writeFileSync('outputs/icon.ico', winImageBuff);

  // CONVERT PNG TO ICNS - MACOS

  const buf = fs.readFileSync(inputImage) // image must be squre, 1024x1024 pixels or larger
  const macosImage = await convert(buf)
  fs.writeFileSync('outputs/icon.icns', macosImage)


})()



 
