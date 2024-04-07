const { checkBoolean, setDataZMove } = require('../../utils')

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
                    state: e.state.toLowerCase(),
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
                type = e.type ? e.type : type
                let dataZMove = setDataZMove(e.item, type)
                return {
                    ...dataZMove,
                    type: type,
                    power: e.power || 80,
                }
            })
        }
        else data = null

        return data
    }

}