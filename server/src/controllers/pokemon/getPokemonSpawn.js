const { response } = require('../../utils')
const Form = require('../../class/PokemonForm')
const findKey = require('../../data/functions/findKey')

const megadb = require('megadb')
const db = new megadb.crearDB('spawn')

module.exports = async (req, res) => {
    let opt = ['common', 'mythical', 'legendary', 'ub']
    let random = Math.ceil(Math.random() * 1000)

    if (random > 990) {
        opt = opt.slice(1)
        opt = opt[Math.floor(Math.random() * opt.length)]
    }
    else opt = opt[0]

    let pokemon = null
    let species = await db.obtener(opt)

    if (species) {
        let specie = species[Math.floor(Math.random() * species.length)]
        let forms = findKey('PokemonForm', 'name', specie).map(e => new Form(e)).filter(e => !e.isMega && !e.isGiga)
        
        if (forms.length > 0) {
            let { id, name, region, types, images } = forms[Math.floor(Math.random() * forms.length)]
            pokemon = { id, name, region, types, images, specie }
        }
    }

    return response(res, 200, pokemon)
}