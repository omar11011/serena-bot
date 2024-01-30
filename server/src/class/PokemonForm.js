const checkBoolean = require('../utils/checkBoolean')

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
        this.images = this.checkImages(props.images)

    }

    checkTypes(types) {
        if (types === undefined || !Array.isArray(types)) types = []
        if (types.length < 1) types.push("Normal")

        return types
    }

    checkStats(stats) {
        if (stats === undefined || typeof stats !== "object") stats = {}

        const opts = ["hp", "attack", "defense", "spattack", "spdefense", "speed"]

        opts.forEach(e => {
            if (!stats[e]) stats[e] = 30
        })

        return stats
    }

    checkEvolutions(data) {
        if (data || Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].form) break
    
                data[i] = {
                    form: data[i].form.trim(),
                    type: data[i].type || "level",
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
                category: data[i].category || "level",
                parents: data[i].parents || [],
            }
        }
        
        return data
    }

    checkImages(data) {
        if (data === undefined || typeof data !== "object") data = {}

        return {
            front_default: data.front_default || null,
            front_shiny: data.front_shiny || null,
        }
    }

}