const { axios, colors } = require('../services')
const megadb = require('megadb')

module.exports = async () => {

    const opts = ['waifu', 'husbando']

    for (let i = 0; i < opts.length; i++) {
        const db = new megadb.crearDB(opts[i], 'anime')
        const data = (await axios.get({ url: `anime/${opts[i]}` })).data.map(e => e.image)
        
        await db.establecer('data', data)

        colors.logMsg(`Se han cargado ${data.length} ${opts[i]}s.`)
    }

}