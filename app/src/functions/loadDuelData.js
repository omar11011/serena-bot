const { axios } = require('../services')

const calculatePower = require('./calculatePower')

module.exports = async props => {
    let { trainers, typeOfBattle } = props
    let DATA = []

    for (let i = 0; i < trainers.length; i++) {
        let obj = {
            pokemon: null,
            battle: {},
        }
        let data = (await axios.get({
            url: `serena/capture?owner=${trainers[i]}&select=yes&limit=1`,
        })).data.data[0]
        
        if (data) {
            let form = (await axios.get({
                url: `pokemon/form/${data.name}`,
            })).data

            data.originalForm = data.name

            obj.battle.user = trainers[i]
            obj.battle.rival = trainers[i > 0 ? 0 : 1]
            obj.battle.typeOfBattle = typeOfBattle

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

            obj.pokemon = data

            DATA.push(obj)
        }
    }

    if (DATA.length < 2) return false
    
    for (let i = 0; i < DATA.length; i++) {
        await axios.create({
            url: 'serena/duel',
            props: DATA[i],
        })
    }

    return true
}