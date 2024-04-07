const { axios } = require('../services')

const calculatePower = require('./calculatePower')

module.exports = async trainers => {
    let pokemon = []

    for (let i = 0; i < trainers.length; i++) {
        let data = (await axios.get({
            url: `serena/capture?owner=${trainers[i]}&select=yes&limit=1`,
        })).data.data[0]
        
        if (data) {
            let form = (await axios.get({
                url: `pokemon/form/${data.name}`,
            })).data

            data.form = data.name
            data.rival = trainers[i > 0 ? 0 : 1]
            data.stats = data.stats.map(e => {
                let power = calculatePower(e, data.progress.level, form.stats.find(f => f.key === e.key).points)
                return {
                    key: e.key,
                    points: e.points,
                    power: power,
                    initialPower: power,
                }
            })
            data.movements = data.movements.map(e => e.name)
            data.image = form.images[data.shiny ? 'front_shiny' : 'front_default']

            delete data._id
            delete data.code
            delete data.gender
            delete data.options
            delete data.position
            delete data.createdAt
            delete data.updatedAt

            pokemon.push(data)
        }
    }

    if (pokemon.length < 2) return false
    
    for (let i = 0; i < pokemon.length; i++) {
        await axios.create({
            url: 'serena/duel',
            props: pokemon[i],
        })
    }

    return true
}