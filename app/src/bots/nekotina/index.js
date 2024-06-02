const fs = require('fs')
const https = require('https')
const path = require('path')
const setCategory = require('./setCategory.js')

const dir = path.join(__dirname, '../../../../server/public/gif/')

module.exports = async message => {
    let embeds = message.embeds
    if (embeds.length < 1) return

    let embed = embeds[0].data
    if (embed.type !== 'rich' || !embed.image || !embed.image.url.endsWith('.gif')) return
    
    let ctg = setCategory(embed.description)
    if (!ctg) return
    if (!fs.existsSync(dir + ctg)) fs.mkdirSync(dir + ctg)

    let gifs = fs.readdirSync(dir + ctg).filter(e => e.endsWith('.gif'))
    if (gifs.length >= 30) return

    let name = embed.image.url.split('/').pop()
    if (gifs.includes(name)) return

    https.get(embed.image.url, (respuesta) => {
        const archivo = fs.createWriteStream(path.join(dir + ctg, name))
        respuesta.pipe(archivo)
        archivo.on('finish', () => {
            archivo.close()
        })
    }).on('error', (error) => {
        console.error('Error al descargar la imagen:', error)
    })
}