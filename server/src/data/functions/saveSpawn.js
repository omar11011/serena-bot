const megadb = require('megadb')
const db = new megadb.crearDB('spawn')

const findElement = require('./findElement')
const Specie = require('../../class/PokemonSpecie')

module.exports = async () => {

    db.purgeall()
    
    findElement('PokemonSpecie').forEach(async e => {
        let opt = 'common'
        let data = new Specie(e)
        
        if (data.isMythical) opt = 'mythical'
        if (data.isLegendary) opt = 'legendary'
        if (data.isUltraBeast) opt = 'ub'

        try {
            await db.push(opt, data.name)
        }
        catch {
            await db.establecer(opt, [])
        }
        finally {
            await db.push(opt, data.name)
        }
    })

}