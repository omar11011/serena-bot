const { checkBoolean, getImgURL } = require('../../utils')

module.exports = class PokemonForm {

    constructor(props) {

        this.id = props.id
        this.name = props.name
        this.specie = props.specie || props.name
        this.region = props.region || "Kanto"
        this.types = this.checkTypes(props.types)
        this.isInitial = checkBoolean(props.isInitial, false)
        this.isMega = checkBoolean(props.isMega, false)
        this.isGiga = checkBoolean(props.isGiga, false)
        this.isParadox = checkBoolean(props.isParadox, false)
        this.stats = this.checkStats(props.stats)
        this.evolutions = this.checkEvolutions(props.evolutions)
        this.movements = this.checkMovements(props.movements)
        this.images = this.checkImages(props.name, props.isGiga)
        this.spawn = checkBoolean(props.spawn, this.isMega || this.isGiga || this.isParadox ? false : true)

    }

    checkTypes(types) {
        if (types === undefined || !Array.isArray(types)) types = []
        if (types.length < 1) types.push("Normal")

        return types
    }

    checkStats(stats) {
        if (stats === undefined || typeof stats !== "object") stats = {}

        let opts = ["hp", "attack", "defense", "spattack", "spdefense", "speed"]
        let newOpts = Object.keys(stats).filter(e => opts.includes(e)).map(e => {
            let name = 'Salud'
            let stat = {
                key: e,
                points: stats[e],
            }

            if (e == 'attack') name = 'Ataque'
            else if (e == 'defense') name = 'Defense'
            else if (e == 'spattack') name = 'Ataque Esp.'
            else if (e == 'spdefense') name = 'Defensa Esp.'
            else if (e == 'speed') name = 'Velocidad'

            stat.name = name

            return stat
        })

        return newOpts
    }

    checkEvolutions(data) {
        if (data || Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].form) break
    
                data[i] = {
                    form: data[i].form.trim(),
                    type: data[i].type || "nivel",
                    level: data[i].level || 1,
                    friendship: data[i].friendship || 0,
                    item: data[i].item || null,
                }
            }
        }
        else data = null
        
        return data
    }

    checkMovements(data) {
        if (!data || !Array.isArray(data)) data = []

        for (let i = 0; i < data.length; i++) {
            if (!data[i].name) break

            data[i] = {
                name: data[i].name.trim(),
                level: data[i].level || 1,
                category: data[i].category || "nivel",
                parents: data[i].parents || [],
            }
        }
        
        return data
    }

    checkImages(name, isGiga) {
        return {
            front_default: getImgURL({ name, route: 'pokemon' }),
            front_shiny: getImgURL({ name, route: `pokemon${isGiga ? '' : '/shiny'}` }),
        }
    }

}