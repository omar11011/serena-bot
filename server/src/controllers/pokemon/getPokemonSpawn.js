const { response } = require('../../utils')
const Form = require('../../class/PokemonForm')
const findKey = require('../../data/functions/findKey')
const findElement = require('../../data/functions/findElement')

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
        let Specie = species[Math.floor(Math.random() * species.length)]
        let forms = findKey('PokemonForm', 'name', Specie).map(e => new Form(e)).filter(e => !e.isMega && !e.isGiga)
        
        if (forms.length > 0) {
            let prob = Math.ceil(Math.random() * 100)
            let { gender } = findElement('PokemonSpecie', Specie)
            let { name, specie, types, stats, images } = forms[Math.floor(Math.random() * forms.length)]

            pokemon = { name, specie, types, stats, images }
            pokemon.gender = gender.male === 0 && gender.female === 0 ? 'none' : prob < gender.male ? 'male' : 'female'
        }
    }

    return response(res, 200, pokemon)
}