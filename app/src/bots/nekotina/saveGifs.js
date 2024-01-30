const { axios, colors } = require('../../services')
const { imgURL } = require('./config.json')

const setGifCategory = require('./setGifCategory')
const megadb = require('megadb')

module.exports = async embeds => {
    
    const embed = embeds[0].data

    if (!embed.image.url.includes(imgURL)) return

    const data = {
        url: embed.image.url.replace(imgURL, ''),
        category: setGifCategory(embed.description),
        anime: embed.footer ? embed.footer.text : null,
    }
    
    if (data.category && data.anime && data.anime.includes('Anime')) {
        const db = new megadb.crearDB(data.category, 'gifs')
        const DATA = await db.obtener('data') || []

        if (!DATA.includes(data.url)) {
            DATA.push(data.url)
            
            await db.establecer('data', DATA)
            await axios.create({ url: 'gif', props: data })
            
            colors.logMsg(`Se ha añadido un nuevo gif de la categoría ${data.category} a la BBDD.`, 'g')
        }
    }

}