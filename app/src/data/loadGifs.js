const { axios, colors } = require('../services')
const megadb = require('megadb')

module.exports = async () => {

    const obj = {}
    const data = (await axios.get({ url: 'gif' })).data

    for (let i = 0; i < data.length; i++) {
        const { url, category } = data[i]

        if (!obj[category]) obj[category] = []

        obj[category].push(url)
    }

    const categories = Object.keys(obj)

    for (let i = 0; i < categories.length; i++) {
        const ctg = categories[i]
        const db = new megadb.crearDB(ctg, 'gifs')
        
        db.establecer('data', obj[ctg])

        colors.logMsg(`Se han cargado ${obj[ctg].length} gifs de ${ctg}.`)
    }

}