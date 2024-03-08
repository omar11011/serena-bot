const { checkBoolean } = require('../utils')

module.exports = class Movement {

    constructor(props) {

        this.id = props.id
        this.name = props.name
        this.type = props.type || "Normal"
        this.class = props.class || "Físico"
        this.power = props.power || null
        this.precision = props.precision || 100
        this.priority = props.priority || 0
        this.hits = props.hits || 1
        this.isZMove = checkBoolean(props.isZMove, false)
        this.isGigaMove = checkBoolean(props.isGigaMove, false)
        this.isDynaMove = checkBoolean(props.isDynaMove, false)
        this.statChanges = this.checkStatChanges(props.statChanges)
        this.stateChanges = this.checkStateChanges(props.stateChanges)
        this.z_move = this.checkZMoves(props.z_move, props.type)

    }

    checkStatChanges(data) {
        if (data && Array.isArray(data) && data.length > 0) {
            data = data.map(e => {
                return {
                    stat: e.stat || "attack",
                    prob: e.prob || 100,
                    points: e.points || -1,
                    toUser: checkBoolean(e.toUser, false),
                }
            })
        }
        else data = null

        return data
    }

    checkStateChanges(data) {
        if (data && Array.isArray(data) && data.length > 0) {
            data = data.filter(e => e.state).map(e => {
                return {
                    state: e.state,
                    prob: e.prob || 100,
                    toUser: checkBoolean(e.toUser, false),
                }
            })
        }
        else data = null

        return data
    }

    checkZMoves(data, type) {
        if (data && Array.isArray(data) && data.length > 0) {
            data = data.map(e => {
                return {
                    type: e.type ? e.type : type,
                    item: e.item || this.setCrystal(type),
                    power: e.power || 80,
                    pokemon: e.pokemon || null,
                }
            })
        }
        else data = null

        return data
    }

    setCrystal(data) {
        let crystal = null

        if (data === "Acero") crystal = "Metalostal Z"
        else if (data === "Agua") crystal = "Hidrostal Z"
        else if (data === "Bicho") crystal = "Insectostal Z"
        else if (data === "Dragón") crystal = "Dracostal Z"
        else if (data === "Eléctrico") crystal = "Electrostal Z"
        else if (data === "Fantasma") crystal = "Espectrostal Z"
        else if (data === "Fuego") crystal = "Pirostal Z"
        else if (data === "Hada") crystal = "Feeristal Z"
        else if (data === "Hielo") crystal = "Criostal Z"
        else if (data === "Lucha") crystal = "Lizstal Z"
        else if (data === "Normal") crystal = "Normastal Z"
        else if (data === "Planta") crystal = "Fitostal Z"
        else if (data === "Psíquico") crystal = "Psicostal Z"
        else if (data === "Roca") crystal = "Litostal Z"
        else if (data === "Siniestro") crystal = "Nictostal Z"
        else if (data === "Tierra") crystal = "Geostal Z"
        else if (data === "Veneno") crystal = "Toxistal Z"
        else if (data === "Volador") crystal = "Aerostal Z"

        return crystal
    }

}