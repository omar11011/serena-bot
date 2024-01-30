module.exports = class Type {

    constructor(props) {

        this.id = props.id
        this.name = props.name
        this.effectiveness = this.checkEffectiveness(props.effectiveness)
        this.image = props.image || null

    }

    checkEffectiveness(data) {
        if (data === undefined || typeof data !== "object") data = {}

        return {
            high: data.high || [],
            low: data.low || [],
            immune: data.immune || [],
        }
    }

}