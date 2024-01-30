const { axios, colors } = require('../../services')
const { imgURL } = require('./config.json')

const megadb = require('megadb')

const male = '<:male:1068670718306422904>'
const female = '<:female:1068670705794830407>'

module.exports = async message => {

    const embed = message.embeds[0].data

    if (!embed.image.url.includes(imgURL)) return

    const reference = message.reference
    const canal = message.client.channels.cache.get(reference.channelId)
    const mensaje = await canal.messages.fetch(reference.messageId)

    if ((mensaje.content.includes('waifu') || mensaje.content.includes('husbando')) && embed.footer && embed.footer.text.includes('Número')) {
        const obj = {
            name: embed.title.replace(male, '').replace(female, '').trim(),
            description: embed.description.split('\n')[0].trim(),
            isMale: embed.title.includes(male),
            isFemale: embed.title.includes(female),
            isWaifu: mensaje.content.includes('waifu'),
            isHusbando: mensaje.content.includes('husbando'),
            image: embed.image.url.replace(imgURL, ''),
        }

        const db = new megadb.crearDB(obj.isWaifu ? 'waifu' : 'husbando', 'anime')
        const DATA = await db.obtener('data') || []

        if (!DATA.includes(obj.image)) {
            DATA.push(obj.image)
            
            await db.establecer('data', DATA)
            await axios.create({  url: 'anime', props: obj })

            colors.logMsg(`Se ha añadido un nuevo personaje ${obj.isWaifu ? 'waifu' : 'husbando'} a la BBDD.`, 'g')
        }
    }

}